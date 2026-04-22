/* Top navigation — responsive: pill nav on desktop, hamburger overlay on tablet/mobile */

function Nav({ theme }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [time, setTime] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  React.useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onS, { passive: true });
    return () => window.removeEventListener('scroll', onS);
  }, []);

  React.useEffect(() => {
    const update = () => {
      const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Karachi' };
      setTime(new Intl.DateTimeFormat('en-GB', opts).format(new Date()));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  /* close menu when user scrolls */
  React.useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true, once: true });
    return () => window.removeEventListener('scroll', close);
  }, [menuOpen]);

  /* lock body scroll when menu is open */
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { label: 'Work',       href: '#work' },
    { label: 'About',      href: '#about' },
    { label: 'Experience', href: '#process' },
    { label: 'Contact',    href: '#contact' },
  ];

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
  };

  const px = isMobile ? 20 : 40;
  const py = scrolled ? 14 : (isMobile ? 18 : 28);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: `${py}px ${px}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'padding 0.5s var(--ease-out)',
        mixBlendMode: 'difference',
        color: '#fff',
      }}>
        {/* top rule */}
        <div style={{
          position: 'absolute', top: 0, left: px, right: px, height: 1,
          background: '#ffffff24',
          transform: scrolled ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.8s var(--ease-out)',
        }} />

        {/* Left: name */}
        <a href="#top" onClick={e => handleAnchor(e, '#top')} data-cursor="hover"
           style={{
             fontFamily: 'var(--display)', fontSize: isMobile ? 18 : 22,
             fontWeight: 500, letterSpacing: '-0.02em',
             display: 'flex', alignItems: 'baseline', gap: 8, flex: 1,
           }}>
          <span style={{
            display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
            background: '#E17548', flexShrink: 0,
            animation: 'navPulse 2.4s ease-in-out infinite',
          }} />
          Awais Khan
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 10, color: '#ffffff80',
            letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'center',
          }}>
            ©26
          </span>
        </a>

        {/* Center: pill nav — desktop only */}
        {!isTablet && (
          <nav style={{
            display: 'flex', gap: 4, padding: '6px',
            border: '1px solid #ffffff24', borderRadius: 999,
            background: '#00000014', backdropFilter: 'blur(8px)',
          }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={e => handleAnchor(e, l.href)} data-cursor="hover"
                 style={{
                   fontFamily: 'var(--sans)', fontSize: 13, letterSpacing: '-0.01em',
                   padding: '8px 14px', borderRadius: 999,
                   transition: 'background 0.3s var(--ease-out)',
                 }}
                 onMouseEnter={e => e.currentTarget.style.background = '#ffffff18'}
                 onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >{l.label}</a>
            ))}
          </nav>
        )}

        {/* Right: status + CTA on desktop / hamburger on tablet+mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end', flex: isTablet ? 'none' : 1 }}>
          {!isTablet && (
            <>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em',
                textTransform: 'uppercase', color: '#ffffff90',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6BD28A' }} />
                Gilgit · {time}
              </div>
              <Magnetic strength={0.3}>
                <a href="#contact" onClick={e => handleAnchor(e, '#contact')} data-cursor="hover"
                   style={{
                     fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                     padding: '10px 16px', border: '1px solid #fff', borderRadius: 999,
                     display: 'inline-flex', alignItems: 'center', gap: 8,
                   }}>
                  Available Q3
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/></svg>
                </a>
              </Magnetic>
            </>
          )}

          {/* Hamburger button */}
          {isTablet && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '8px', background: 'none', border: 'none' }}>
              <span style={{
                display: 'block', width: 24, height: 1.5, background: '#fff',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                transition: 'transform 0.35s var(--ease-out)',
              }} />
              <span style={{
                display: 'block', width: 24, height: 1.5, background: '#fff',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.25s',
              }} />
              <span style={{
                display: 'block', width: 24, height: 1.5, background: '#fff',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                transition: 'transform 0.35s var(--ease-out)',
              }} />
            </button>
          )}
        </div>

        <style>{`
          @keyframes navPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(0.85); }
          }
        `}</style>
      </header>

      {/* Full-screen overlay menu for tablet & mobile */}
      {isTablet && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 49,
          background: 'var(--ink)', color: 'var(--paper)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: isMobile ? 20 : 28,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s var(--ease-out)',
        }}>
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={e => handleAnchor(e, l.href)}
              style={{
                fontFamily: 'var(--display)', fontWeight: 300,
                fontSize: isMobile ? 'clamp(40px, 11vw, 64px)' : 72,
                letterSpacing: '-0.04em', lineHeight: 1,
                transform: menuOpen ? 'translateY(0)' : 'translateY(24px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.55s var(--ease-out) ${i * 0.07}s, opacity 0.55s var(--ease-out) ${i * 0.07}s`,
              }}
            >{l.label}</a>
          ))}

          <a href="#contact" onClick={e => handleAnchor(e, '#contact')}
            style={{
              marginTop: 8,
              fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '12px 28px', border: '1px solid var(--paper)', borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transform: menuOpen ? 'translateY(0)' : 'translateY(24px)',
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.55s var(--ease-out) ${links.length * 0.07}s, opacity 0.55s var(--ease-out) ${links.length * 0.07}s`,
            }}>
            Available Q3
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2"/></svg>
          </a>

          {/* location + time at bottom */}
          <div style={{
            position: 'absolute', bottom: 32,
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6BD28A' }} />
            Gilgit · {time}
          </div>
        </div>
      )}
    </>
  );
}

window.Nav = Nav;
