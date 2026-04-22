/* Primitives: cursor, magnetic, reveal, scroll, split text, marquee */

const { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback, createContext, useContext } = React;

/* ----------------------------- MOTION CONTEXT ----------------------------- */
const MotionCtx = createContext({ intensity: 1 });
const useMotion = () => useContext(MotionCtx);

/* --------------------------------- UTILS --------------------------------- */
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
const easeInOutCubic = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;

/* ----------------------------- SCROLL PROVIDER ---------------------------- */
/* single rAF loop shared by all scroll-reactive components */
const ScrollCtx = createContext({ y: 0, vh: 0, vw: 0 });
function ScrollProvider({ children }) {
  const [state, setState] = useState({ y: 0, vh: window.innerHeight, vw: window.innerWidth });
  const raf = useRef(0);
  const pending = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      if (pending.current) return;
      pending.current = true;
      raf.current = requestAnimationFrame(() => {
        pending.current = false;
        setState({ y: window.scrollY, vh: window.innerHeight, vw: window.innerWidth });
      });
    };
    const onResize = () => setState(s => ({ ...s, vh: window.innerHeight, vw: window.innerWidth }));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf.current);
    };
  }, []);
  return <ScrollCtx.Provider value={state}>{children}</ScrollCtx.Provider>;
}
const useScroll = () => useContext(ScrollCtx);

/* returns isMobile (<640) and isTablet (<1024) based on live viewport width */
const useBreakpoint = () => {
  const { vw } = useScroll();
  return { isMobile: vw < 640, isTablet: vw < 1024 };
};

/* returns 0..1 based on element visibility (0 when below fold, 1 when scrolled past) */
function useScrollProgress(ref, { start = 0, end = 1 } = {}) {
  const { y, vh } = useScroll();
  const [prog, setProg] = useState(0);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const top = rect.top + y;
    const h = rect.height;
    // 0 when element's top is at bottom of viewport; 1 when element's bottom is at top of viewport
    const total = h + vh;
    const scrolled = y + vh - top;
    const raw = scrolled / total;
    setProg(clamp((raw - start) / (end - start), 0, 1));
  }, [y, vh, ref, start, end]);
  return prog;
}

/* --------------------------------- CURSOR -------------------------------- */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);
  const pos = useRef({ x: -100, y: -100, tx: -100, ty: -100 });
  const ring_pos = useRef({ x: -100, y: -100 });
  const state = useRef({ hover: false, label: '', variant: 'default' });

  useEffect(() => {
    const onMove = e => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };
    const onOver = e => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        state.current.hover = true;
        state.current.label = t.dataset.cursorLabel || '';
        state.current.variant = t.dataset.cursor || 'hover';
      } else {
        state.current.hover = false;
        state.current.label = '';
        state.current.variant = 'default';
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    let raf = 0;
    const tick = () => {
      pos.current.x = lerp(pos.current.x, pos.current.tx, 0.35);
      pos.current.y = lerp(pos.current.y, pos.current.ty, 0.35);
      ring_pos.current.x = lerp(ring_pos.current.x, pos.current.tx, 0.15);
      ring_pos.current.y = lerp(ring_pos.current.y, pos.current.ty, 0.15);
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        const scale = state.current.hover ? (state.current.variant === 'view' ? 3.2 : 2.2) : 1;
        ring.current.style.transform = `translate3d(${ring_pos.current.x}px, ${ring_pos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ring.current.style.background = state.current.variant === 'view' ? 'var(--accent)' : 'transparent';
        ring.current.style.borderColor = state.current.variant === 'view' ? 'var(--accent)' : 'var(--ink)';
        ring.current.style.mixBlendMode = state.current.variant === 'view' ? 'normal' : 'difference';
      }
      if (label.current) {
        label.current.style.transform = `translate3d(${ring_pos.current.x}px, ${ring_pos.current.y}px, 0) translate(-50%, -50%)`;
        label.current.textContent = state.current.label;
        label.current.style.opacity = state.current.label ? 1 : 0;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  const baseStyle = { position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, willChange: 'transform' };

  return (
    <>
      <div ref={ring} style={{
        ...baseStyle,
        width: 36, height: 36, borderRadius: '50%',
        border: '1.5px solid var(--ink)',
        mixBlendMode: 'difference',
        transition: 'transform 0.2s var(--ease-out), background 0.2s, border-color 0.2s',
      }} />
      <div ref={dot} style={{
        ...baseStyle,
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--ink)',
        mixBlendMode: 'difference',
      }} />
      <div ref={label} style={{
        ...baseStyle, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: 'var(--paper)', opacity: 0, transition: 'opacity 0.2s',
        padding: '4px 8px', background: 'var(--ink)', borderRadius: 3, whiteSpace: 'nowrap',
      }} />
    </>
  );
}

/* ------------------------------- MAGNETIC -------------------------------- */
function Magnetic({ children, strength = 0.35, radius = 120, as = 'div', ...rest }) {
  const { intensity } = useMotion();
  const ref = useRef(null);
  const inner = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const f = 1 - dist / radius;
        tx = dx * strength * f * intensity;
        ty = dy * strength * f * intensity;
      } else {
        tx = 0; ty = 0;
      }
    };
    const onLeave = () => { tx = 0; ty = 0; };
    const tick = () => {
      x = lerp(x, tx, 0.18);
      y = lerp(y, ty, 0.18);
      if (inner.current) inner.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [strength, radius, intensity]);
  const Tag = as;
  return <Tag ref={ref} {...rest}><span ref={inner} style={{ display: 'inline-block', willChange: 'transform' }}>{children}</span></Tag>;
}

/* --------------------------------- REVEAL -------------------------------- */
/* fades + slides children up when in view */
function Reveal({ children, delay = 0, y = 24, once = true, as = 'div', style, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const { intensity } = useMotion();
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { setShown(true); if (once) io.disconnect(); }
        else if (!once) setShown(false);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [once]);
  const Tag = as;
  const dist = y * intensity;
  return (
    <Tag ref={ref} {...rest} style={{
      ...style,
      transform: shown ? 'translate3d(0,0,0)' : `translate3d(0, ${dist}px, 0)`,
      opacity: shown ? 1 : 0,
      transition: `transform ${0.9 / Math.max(0.4, intensity)}s var(--ease-out) ${delay}s, opacity ${0.9 / Math.max(0.4, intensity)}s var(--ease-out) ${delay}s`,
      willChange: 'transform, opacity',
    }}>{children}</Tag>
  );
}

/* -------------------------------- SPLIT TEXT ----------------------------- */
/* splits text into words and chars; animates each with a stagger when in view */
function SplitText({ children, as = 'span', stagger = 0.03, delay = 0, y = '0.6em', style, className }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const { intensity } = useMotion();
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  const text = typeof children === 'string' ? children : String(children);
  const words = text.split(' ');
  const dur = 0.9 / Math.max(0.4, intensity);
  return (
    <Tag ref={ref} className={className} style={{ display: 'inline-block', ...style }}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span style={{
            display: 'inline-block',
            // generous vertical padding so tall display glyphs aren't clipped;
            // negative margin compensates so layout line-height is preserved.
            overflow: 'hidden',
            paddingTop: '0.2em',
            paddingBottom: '0.15em',
            marginTop: '-0.2em',
            marginBottom: '-0.15em',
            verticalAlign: 'top',
          }}>
            <span style={{
              display: 'inline-block',
              transform: shown ? 'translateY(0)' : `translateY(${y})`,
              transition: `transform ${dur}s var(--ease-out) ${delay + i * stagger}s`,
              willChange: 'transform',
            }}>{w}</span>
          </span>
          {i < words.length - 1 && '\u00A0'}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/* -------------------------------- MARQUEE -------------------------------- */
function Marquee({ children, speed = 40, direction = 1, style }) {
  const ref = useRef(null);
  const inner = useRef(null);
  useEffect(() => {
    let raf; let offset = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000; last = now;
      offset += speed * dt * direction;
      if (inner.current) {
        const w = inner.current.firstChild?.offsetWidth || 1;
        const wrapped = ((offset % w) + w) % w;
        inner.current.style.transform = `translate3d(${-wrapped}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, direction]);
  return (
    <div ref={ref} style={{ overflow: 'hidden', whiteSpace: 'nowrap', ...style }}>
      <div ref={inner} style={{ display: 'inline-flex', willChange: 'transform' }}>
        <div style={{ display: 'inline-flex' }}>{children}</div>
        <div style={{ display: 'inline-flex' }} aria-hidden="true">{children}</div>
        <div style={{ display: 'inline-flex' }} aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------- PARALLAX -------------------------------- */
function Parallax({ children, speed = 0.2, style, ...rest }) {
  const ref = useRef(null);
  const prog = useScrollProgress(ref);
  const { intensity } = useMotion();
  const y = (prog - 0.5) * -100 * speed * intensity;
  return (
    <div ref={ref} {...rest} style={{ ...style, transform: `translate3d(0, ${y}px, 0)`, willChange: 'transform' }}>
      {children}
    </div>
  );
}

/* ------------------------------- COUNT UP -------------------------------- */
function CountUp({ to = 100, suffix = '', duration = 1400, style }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now) => {
            const t = clamp((now - start) / duration, 0, 1);
            setVal(Math.round(easeOutQuart(t) * to));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      }
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref} style={style}>{val}{suffix}</span>;
}

/* --------------------------------- RULE ---------------------------------- */
function Rule({ vertical = false, color = 'var(--rule-strong)', style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (setShown(true), io.disconnect())), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      [vertical ? 'height' : 'width']: '100%',
      [vertical ? 'width' : 'height']: 1,
      background: color,
      transformOrigin: vertical ? 'top' : 'left',
      transform: shown ? 'scale(1)' : (vertical ? 'scaleY(0)' : 'scaleX(0)'),
      transition: 'transform 1s var(--ease-out)',
      ...style,
    }} />
  );
}

Object.assign(window, {
  clamp, lerp, easeOutCubic, easeOutQuart, easeInOutCubic,
  MotionCtx, useMotion,
  ScrollCtx, ScrollProvider, useScroll, useScrollProgress, useBreakpoint,
  Cursor, Magnetic, Reveal, SplitText, Marquee, Parallax, CountUp, Rule,
});
