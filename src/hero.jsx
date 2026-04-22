/* Hero — 3 variants toggled by heroVariant prop */

function Hero({ variant = 1, onVariantChange }) {
  return (
    <section id="top" style={{ position: 'relative', background: 'var(--ink)', color: 'var(--paper)' }}>
      {variant === 1 && <HeroEditorial />}
      {variant === 2 && <HeroOversized />}
      {variant === 3 && <HeroPortrait />}
      {window.__SHOW_TWEAKS && <HeroVariantSwitcher variant={variant} onChange={onVariantChange} />}
    </section>
  );
}

function HeroVariantSwitcher({ variant, onChange }) {
  return (
    <div style={{
      position: 'absolute', bottom: 24, left: 40, zIndex: 20,
      display: 'flex', gap: 6, padding: 6,
      border: '1px solid #ffffff20', borderRadius: 999,
      background: '#00000040', backdropFilter: 'blur(8px)',
    }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff70', padding: '6px 10px 6px 12px', alignSelf: 'center' }}>
        Hero
      </span>
      {[1, 2, 3].map(i => (
        <button key={i} onClick={() => onChange(i)} data-cursor="hover"
          style={{
            width: 28, height: 28, borderRadius: '50%',
            fontFamily: 'var(--mono)', fontSize: 11,
            background: variant === i ? 'var(--paper)' : 'transparent',
            color: variant === i ? 'var(--ink)' : '#ffffff90',
            transition: 'all 0.3s var(--ease-out)',
          }}>{i}</button>
      ))}
    </div>
  );
}

/* ----------------------------- VARIANT 1: EDITORIAL -------------------------
   Big centered display type, tagline rails, portrait slot to the right.
   Mobile: single column, portrait hidden.
------------------------------------------------------------------------------ */
function HeroEditorial() {
  const { y } = useScroll();
  const { isMobile, isTablet } = useBreakpoint();
  const scrollIndicator = clamp(1 - y / 300, 0, 1);

  const px = isMobile ? 20 : 40;
  const pt = isMobile ? 100 : 140;

  return (
    <div style={{ minHeight: '100svh', padding: `${pt}px ${px}px 48px`, position: 'relative', overflow: 'hidden' }}>
      {/* Top meta row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
        gap: isMobile ? 8 : 24,
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#ffffff90', marginBottom: isMobile ? 40 : 64,
      }}>
        <Reveal delay={0.1}>
          <div style={{ color: '#ffffff60', marginBottom: 4 }}>§ 01</div>
          <div>Portfolio / 2026 Vol. 01</div>
        </Reveal>
        {!isMobile && (
          <Reveal delay={0.15} style={{ textAlign: isTablet ? 'left' : 'center' }}>
            <div style={{ color: '#ffffff60', marginBottom: 4 }}>Discipline</div>
            <div>Data Science · ML · AI Agents</div>
          </Reveal>
        )}
        {!isTablet && (
          <Reveal delay={0.2} style={{ textAlign: 'right' }}>
            <div style={{ color: '#ffffff60', marginBottom: 4 }}>Currently</div>
            <div>Data Science @ Calibreon</div>
          </Reveal>
        )}
      </div>

      {/* Main grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isTablet ? '1fr' : '1fr auto',
        gap: 48, alignItems: 'end',
      }}>
        {/* Display type */}
        <div>
          <h1 style={{
            margin: 0, fontFamily: 'var(--display)', fontWeight: 300,
            fontSize: isMobile ? 'clamp(52px, 13vw, 80px)' : 'clamp(80px, 13vw, 220px)',
            lineHeight: 0.88, letterSpacing: '-0.04em',
            fontVariationSettings: '"opsz" 144, "SOFT" 50',
          }}>
            <div><SplitText stagger={0.04} delay={0.2}>Turning data</SplitText></div>
            <div style={{ paddingLeft: isMobile ? '8vw' : '14vw', fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
              <SplitText stagger={0.04} delay={0.45}>into decisions</SplitText>
            </div>
            <div>
              <SplitText stagger={0.04} delay={0.7}>worth</SplitText>
              <span style={{
                display: 'inline-block',
                width: '0.9em', height: '0.72em', borderRadius: '50%',
                background: 'var(--accent)', verticalAlign: '-0.06em',
                margin: '0 0.14em',
                animation: 'heroPulse 3s ease-in-out infinite',
              }} />
              <SplitText stagger={0.04} delay={0.85}>acting on.</SplitText>
            </div>
          </h1>

          {/* Tagline shown below headline on mobile instead of right column */}
          {isTablet && (
            <Reveal delay={0.9} style={{ marginTop: 32 }}>
              <p style={{
                fontFamily: 'var(--serif)', fontSize: isMobile ? 17 : 20,
                lineHeight: 1.4, color: '#ffffffC0', margin: 0, fontStyle: 'italic',
                maxWidth: 480,
              }}>
                Data Science Specialist and AI Developer building ML models, multi-agent systems, and analytics for SME businesses in finance.
              </p>
              <div style={{ marginTop: 24 }}>
                <a href="#work"
                   onClick={e => { e.preventDefault(); document.querySelector('#work').scrollIntoView({ behavior: 'smooth' }); }}
                   style={{
                     display: 'inline-flex', alignItems: 'center', gap: 10,
                     fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
                     padding: '14px 22px', border: '1px solid #fff', borderRadius: 999,
                   }}>
                  View work
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                </a>
              </div>
            </Reveal>
          )}
        </div>

        {/* Right column: portrait + blurb — desktop only */}
        {!isTablet && (
          <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Reveal delay={0.7} y={40}>
              <div style={{ position: 'relative', width: 220, height: 280, marginLeft: 'auto', background: 'var(--paper-3)', overflow: 'hidden' }}>
                <PortraitPlaceholder />
                <div style={{ position: 'absolute', bottom: 10, left: 10, fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                  Fig. 1 — A.K.
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.9}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.35, color: '#ffffffC0', margin: 0, fontStyle: 'italic', maxWidth: 320 }}>
                Data Science Specialist and AI Developer building ML models, multi-agent systems, and analytics for SME businesses in finance.
              </p>
            </Reveal>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, right: px,
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ffffff70',
        opacity: scrollIndicator,
      }}>
        Scroll
        <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
          <path d="M0 5H38M38 5L34 1M38 5L34 9" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <style>{`
        @keyframes heroPulse {
          0%, 100% { transform: scale(1); background: var(--accent); }
          50% { transform: scale(0.75); background: #E8894F; }
        }
      `}</style>
    </div>
  );
}

/* ----------------------------- VARIANT 2: OVERSIZED -------------------------
   Brutalist: giant wordmark filling the width, heavy monospace meta.
   Mobile: reduced wordmark size, stacked bottom grid.
------------------------------------------------------------------------------ */
function HeroOversized() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : 40;

  return (
    <div style={{
      minHeight: '100svh', padding: `${isMobile ? 100 : 140}px ${px}px ${isMobile ? 40 : 40}px`,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative',
    }}>
      {/* Top tag */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#ffffff90',
        flexWrap: 'wrap', gap: 16,
      }}>
        <Reveal>
          <div style={{ maxWidth: 280, lineHeight: 1.5 }}>
            Data Scientist &amp; AI Developer building ML models and AI agents for finance. Based in Gilgit-Baltistan, Pakistan.
          </div>
        </Reveal>
        {!isMobile && (
          <Reveal delay={0.1} style={{ textAlign: 'right' }}>
            <div>Index</div>
            <div style={{ color: '#ffffff50', marginTop: 4 }}>Python · Pandas · NumPy</div>
            <div style={{ color: '#ffffff50' }}>CrewAI · LangChain · RAG</div>
            <div style={{ color: '#ffffff50' }}>PowerBI · Matplotlib</div>
          </Reveal>
        )}
      </div>

      {/* Wordmark */}
      <div style={{ lineHeight: 0.82, fontFamily: 'var(--display)', fontWeight: 300, letterSpacing: '-0.055em', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.12em' }}>
          <span style={{ fontSize: isMobile ? 'clamp(64px, 19vw, 180px)' : 'clamp(120px, 22vw, 380px)' }}>
            <SplitText stagger={0.05}>Awais</SplitText>
          </span>
          {!isMobile && (
            <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color: '#ffffff70', letterSpacing: '0.1em', paddingBottom: '1.5em' }}>
              /əˈweɪs/
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2em', fontSize: isMobile ? 'clamp(64px, 19vw, 180px)' : 'clamp(120px, 22vw, 380px)' }}>
          <span style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
            <SplitText stagger={0.05} delay={0.15}>Khan</SplitText>
          </span>
          <span style={{
            fontSize: '0.25em', fontFamily: 'var(--mono)', color: 'var(--accent)', letterSpacing: 0,
            alignSelf: 'center', paddingBottom: '0.4em',
          }}>®</span>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr',
        gap: isMobile ? 16 : 24,
        alignItems: 'end', paddingTop: 32,
      }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff60', marginBottom: 4 }}>Role</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 18 : 22, fontStyle: 'italic' }}>Data Science &amp; AI</div>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff60', marginBottom: 4 }}>Focus</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 18 : 22, fontStyle: 'italic' }}>Finance, ML, Agents</div>
        </Reveal>
        {!isMobile && (
          <Reveal delay={0.2}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff60', marginBottom: 4 }}>Study</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontStyle: 'italic' }}>Econ · Data Sci @ KIU</div>
          </Reveal>
        )}
        <Reveal delay={0.3} style={{ textAlign: 'right', gridColumn: isMobile ? '2' : 'auto' }}>
          <Magnetic strength={0.4}>
            <a href="#work" data-cursor="view" data-cursor-label="See work"
               onClick={e => { e.preventDefault(); document.querySelector('#work').scrollIntoView({ behavior: 'smooth' }); }}
               style={{
                 display: 'inline-flex', alignItems: 'center', gap: 10,
                 fontFamily: 'var(--mono)', fontSize: isMobile ? 11 : 12,
                 letterSpacing: '0.1em', textTransform: 'uppercase',
                 padding: isMobile ? '12px 16px' : '14px 22px',
                 border: '1px solid #fff', borderRadius: 999,
               }}>
              View work
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </div>
  );
}

/* ----------------------------- VARIANT 3: PORTRAIT --------------------------
   Split: full-bleed portrait left, editorial type block right.
   Mobile: stacked — portrait hidden, content full width.
------------------------------------------------------------------------------ */
function HeroPortrait() {
  const { y } = useScroll();
  const { isMobile, isTablet } = useBreakpoint();
  const parallax = y * -0.15;
  const px = isMobile ? 20 : 56;

  return (
    <div style={{
      minHeight: '100svh',
      display: isTablet ? 'block' : 'grid',
      gridTemplateColumns: '42% 1fr',
      position: 'relative',
    }}>
      {/* Left: portrait — desktop only */}
      {!isTablet && (
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--paper-3)', padding: '140px 0 0' }}>
          <div style={{ position: 'absolute', inset: '140px 40px 40px 40px', transform: `translate3d(0, ${parallax}px, 0)` }}>
            <PortraitPlaceholder tall />
          </div>
          <div style={{ position: 'absolute', bottom: 40, left: 40, right: 40, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', zIndex: 2 }}>
            <span>Fig. 1 — Awais Khan</span>
            <span>2026 · Gilgit</span>
          </div>
        </div>
      )}

      {/* Right / full: content */}
      <div style={{
        padding: isTablet ? `${isMobile ? 100 : 120}px ${px}px 40px` : '140px 56px 40px 56px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: isTablet ? '100svh' : 'auto',
      }}>
        <Reveal>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#ffffff70',
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32,
          }}>
            <span style={{ width: 20, height: 1, background: 'currentColor' }} />
            Data Scientist &amp; AI Developer from Gilgit-Baltistan.
          </div>
        </Reveal>

        <h1 style={{
          margin: 0, fontFamily: 'var(--display)', fontWeight: 300,
          fontSize: isMobile ? 'clamp(52px, 13vw, 80px)' : isTablet ? 'clamp(72px, 9vw, 120px)' : 'clamp(68px, 7.5vw, 140px)',
          lineHeight: 0.92, letterSpacing: '-0.04em',
        }}>
          <div><SplitText stagger={0.04} delay={0.1}>Models that</SplitText></div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
            <SplitText stagger={0.04} delay={0.3}>earn their keep</SplitText>
          </div>
          <div><SplitText stagger={0.04} delay={0.5}>in production.</SplitText></div>
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 24 : 40,
          alignItems: 'end', marginTop: 40,
        }}>
          <Reveal delay={0.6}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 17 : 22, lineHeight: 1.35, margin: 0, color: '#ffffffCC', fontStyle: 'italic' }}>
              I build ML systems and AI agents for SME finance teams — leveraging Python, RAG, and multi-agent workflows to turn raw data into real decisions.
            </p>
          </Reveal>
          <Reveal delay={0.75} style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', gap: 12 }}>
            <Magnetic>
              <a href="#work" data-cursor="view" data-cursor-label="See work"
                 onClick={e => { e.preventDefault(); document.querySelector('#work').scrollIntoView({ behavior: 'smooth' }); }}
                 style={{
                   fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
                   padding: isMobile ? '12px 18px' : '14px 22px',
                   background: 'var(--accent)', color: 'var(--ink)', borderRadius: 999,
                   display: 'inline-flex', alignItems: 'center', gap: 10,
                 }}>
                See selected work
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4"/></svg>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ---- Portrait placeholder — abstract SVG avatar ---- */
function PortraitPlaceholder({ tall = false }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(180deg, #D9C9A8 0%, #B49774 100%)', overflow: 'hidden' }}>
      <svg viewBox="0 0 220 280" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="akSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8A5E3A" />
            <stop offset="1" stopColor="#5A3A22" />
          </linearGradient>
          <linearGradient id="akBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#D9C9A8" />
            <stop offset="1" stopColor="#9B7A53" />
          </linearGradient>
        </defs>
        <rect width="220" height="280" fill="url(#akBg)" />
        <path d="M30 280 Q40 200 82 186 L138 186 Q180 200 190 280 Z" fill="#1A1713" />
        <path d="M92 186 L110 206 L128 186 Z" fill="#2C2620" />
        <rect x="96" y="162" width="28" height="30" fill="url(#akSkin)" />
        <ellipse cx="110" cy="120" rx="42" ry="52" fill="url(#akSkin)" />
        <path d="M68 118 Q70 72 110 70 Q150 72 152 118 Q150 98 140 90 Q130 84 110 84 Q90 84 82 90 Q72 98 68 118 Z" fill="#0F0B07" />
        <path d="M80 142 Q85 170 110 172 Q135 170 140 142 Q135 160 110 162 Q85 160 80 142 Z" fill="#0F0B07" opacity="0.7" />
        <ellipse cx="96" cy="108" rx="8" ry="14" fill="#ffffff18" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, #ffffff20, transparent 60%)', mixBlendMode: 'overlay' }} />
    </div>
  );
}

window.Hero = Hero;
window.PortraitPlaceholder = PortraitPlaceholder;
