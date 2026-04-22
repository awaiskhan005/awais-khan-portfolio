/* Sections: Work, About, Experience, Skills, Testimonials, Contact, Footer */

function SectionLabel({ index, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 32 }}>
      <span style={{ color: 'var(--accent)' }}>§ {String(index).padStart(2, '0')}</span>
      <span style={{ flex: 1, height: 1, background: 'var(--rule-strong)', maxWidth: 60 }} />
      <span>{children}</span>
    </div>
  );
}

/* ================================== WORK ================================= */
const PROJECTS = [
  {
    id: 'ledgerly',
    num: '01',
    client: 'Calibreon · CalibreAI',
    title: 'Multi-agent systems for SME finance',
    role: 'AI Developer',
    year: '2025',
    tags: ['CrewAI', 'LLM', 'RAG'],
    color: '#D8E2C4',
    fg: '#1F2A14',
    accent: '#3F5E1F',
  },
  {
    id: 'cadence',
    num: '02',
    client: 'Capstone Research',
    title: 'Heart attack & advertising ML prediction',
    role: 'Data Scientist',
    year: '2024',
    tags: ['Scikit-learn', 'EDA', 'Classification'],
    color: '#EADDC4',
    fg: '#2B2110',
    accent: '#C25A2B',
  },
  {
    id: 'fieldnotes',
    num: '03',
    client: 'Independent',
    title: 'Amazon purchase dataset analysis',
    role: 'Data Analyst',
    year: '2023',
    tags: ['Pandas', 'NumPy', 'Matplotlib'],
    color: '#D7D4CB',
    fg: '#1A1A18',
    accent: '#3A3A36',
  },
  {
    id: 'marin',
    num: '04',
    client: 'Calibreon · Lead Gen',
    title: 'AI automation for outreach & leads',
    role: 'AI Developer',
    year: '2025',
    tags: ['Agents', 'Automation', 'Python'],
    color: '#1E2A2E',
    fg: '#E6E0D4',
    accent: '#C8A66E',
  },
];

function WorkSection({ onOpenCaseStudy }) {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : 40;

  return (
    <section id="work" style={{ padding: `${isMobile ? 80 : 140}px ${px}px ${isMobile ? 60 : 120}px`, background: 'var(--paper)', position: 'relative' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
          gap: 40, marginBottom: isMobile ? 40 : 80,
        }}>
          <div>
            <SectionLabel index={1}>Selected work / 2023–2026</SectionLabel>
            <h2 style={{
              margin: 0, fontFamily: 'var(--display)', fontWeight: 300,
              fontSize: isMobile ? 'clamp(48px, 11vw, 80px)' : 'clamp(56px, 9vw, 144px)',
              lineHeight: 0.9, letterSpacing: '-0.035em',
            }}>
              <SplitText stagger={0.04}>Clean code,</SplitText><br />
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
                <SplitText stagger={0.04} delay={0.15}>sharper signals.</SplitText>
              </span>
            </h2>
          </div>
          {!isTablet && (
            <Reveal delay={0.2}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.45, margin: 0, color: 'var(--muted)', fontStyle: 'italic', maxWidth: 480, justifySelf: 'end' }}>
                Four projects selected from ongoing work at Calibreon and independent research — from exploratory analysis to production multi-agent systems.
              </p>
            </Reveal>
          )}
        </div>

        {isTablet && (
          <Reveal>
            <p style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 17 : 20, lineHeight: 1.45, margin: '0 0 40px', color: 'var(--muted)', fontStyle: 'italic' }}>
              Four projects — exploratory analysis to production multi-agent systems.
            </p>
          </Reveal>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} onOpen={() => onOpenCaseStudy(p)} />
          ))}
        </div>

        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--rule-strong)', paddingTop: 24, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            + more on GitHub — awaiskhan005
          </div>
          <Magnetic>
            <a href="#contact" data-cursor="hover" style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Request full archive
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.2"/></svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index, onOpen }) {
  const [hover, setHover] = React.useState(false);
  const ref = React.useRef(null);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const { isMobile } = useBreakpoint();

  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  if (isMobile) {
    /* Mobile: card layout */
    return (
      <Reveal y={16} delay={index * 0.05}>
        <button
          onClick={onOpen}
          style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '20px 0', borderTop: '1px solid var(--rule-strong)',
            position: 'relative', overflow: 'hidden', cursor: 'auto',
            color: 'var(--ink)',
          }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: project.color,
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.4s var(--ease-out)',
          }} />
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: hover ? project.fg : 'var(--muted)', transition: 'color 0.3s' }}>{project.num}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: hover ? project.fg : 'var(--muted)', transition: 'color 0.3s' }}>{project.year}</span>
            </div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(22px, 6vw, 32px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1, color: hover ? project.fg : 'var(--ink)', transition: 'color 0.3s' }}>
              {project.title}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: hover ? project.fg : 'var(--muted)', marginTop: 4, transition: 'color 0.3s' }}>
              {project.client}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
              {project.tags.map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '4px 10px', border: `1px solid ${hover ? project.fg + '40' : 'var(--rule-strong)'}`, borderRadius: 999,
                  color: hover ? project.fg : 'var(--muted)', transition: 'all 0.3s',
                }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12, color: hover ? project.fg : 'var(--ink)', transition: 'color 0.3s' }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M2 18L18 2M18 2H6M18 2V14" stroke="currentColor" strokeWidth="1.2"/></svg>
            </div>
          </div>
        </button>
      </Reveal>
    );
  }

  /* Desktop / tablet: table row layout */
  return (
    <Reveal y={20} delay={index * 0.05}>
      <button
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={onMove}
        onClick={onOpen}
        data-cursor="view"
        data-cursor-label="Open case"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '60px 140px 1fr auto 100px 40px',
          alignItems: 'center', gap: 24,
          padding: '28px 12px',
          borderTop: '1px solid var(--rule-strong)',
          textAlign: 'left', width: '100%',
          cursor: 'none', color: 'var(--ink)',
        }}>
        {/* animated fill */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 1, bottom: 0,
          background: project.color,
          transform: hover ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'bottom',
          transition: 'transform 0.6s var(--ease-out)',
          zIndex: 0,
        }} />

        {/* cursor-follow preview image */}
        <div style={{
          position: 'absolute',
          left: mouse.x - 180, top: mouse.y - 120,
          width: 360, height: 240, pointerEvents: 'none',
          opacity: hover ? 1 : 0,
          transform: hover ? 'scale(1) rotate(2deg)' : 'scale(0.85) rotate(-6deg)',
          transition: 'opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out)',
          zIndex: 3,
        }}>
          <ProjectThumbnail project={project} />
        </div>

        <div style={{ position: 'relative', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: hover ? project.fg : 'var(--muted)', transition: 'color 0.4s' }}>
          {project.num}
        </div>
        <div style={{ position: 'relative', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: hover ? project.fg : 'var(--ink)', transition: 'color 0.4s' }}>
          {project.client}
        </div>
        <div style={{ position: 'relative', fontFamily: 'var(--display)', fontSize: 'clamp(24px, 3.2vw, 56px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1, color: hover ? project.fg : 'var(--ink)', transition: 'color 0.4s' }}>
          <span style={{ fontFamily: hover ? 'var(--serif)' : 'var(--display)', fontStyle: hover ? 'italic' : 'normal', transition: 'all 0.4s var(--ease-out)' }}>
            {project.title}
          </span>
        </div>
        <div style={{ position: 'relative', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '4px 10px', border: `1px solid ${hover ? project.fg + '40' : 'var(--rule-strong)'}`, borderRadius: 999,
              color: hover ? project.fg : 'var(--muted)', transition: 'all 0.4s',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ position: 'relative', fontFamily: 'var(--mono)', fontSize: 12, color: hover ? project.fg : 'var(--muted)', textAlign: 'right', transition: 'color 0.4s' }}>
          {project.year}
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', color: hover ? project.fg : 'var(--ink)', transition: 'transform 0.4s', transform: hover ? 'translateX(4px)' : 'none' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 18L18 2M18 2H6M18 2V14" stroke="currentColor" strokeWidth="1.2"/></svg>
        </div>
      </button>
    </Reveal>
  );
}

function ProjectThumbnail({ project }) {
  if (project.id === 'ledgerly') return <LedgerlyThumb color={project.color} fg={project.fg} accent={project.accent} />;
  if (project.id === 'cadence') return <CadenceThumb color={project.color} fg={project.fg} accent={project.accent} />;
  if (project.id === 'fieldnotes') return <FieldnotesThumb color={project.color} fg={project.fg} accent={project.accent} />;
  if (project.id === 'marin') return <MarinThumb color={project.color} fg={project.fg} accent={project.accent} />;
  return null;
}

function LedgerlyThumb({ color, fg, accent }) {
  return (
    <div style={{ width: '100%', height: '100%', background: color, color: fg, padding: 18, borderRadius: 6, boxShadow: '0 30px 60px -20px #14131140', fontFamily: 'var(--mono)', fontSize: 9, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        <span>CrewAI · Multi-agent</span><span style={{ opacity: 0.6 }}>Finance</span>
      </div>
      <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 300, lineHeight: 1 }}>6 agents · 1 task</div>
      <div style={{ opacity: 0.6, marginBottom: 14, marginTop: 2 }}>Researcher · Analyst · Writer · Auditor</div>
      <svg viewBox="0 0 320 100" style={{ width: '100%', height: 80 }}>
        {[0,1,2,3,4,5].map(i => (
          <g key={i}>
            <circle cx={40 + i*48} cy={50} r={10} fill={accent} opacity={0.8}/>
            {i < 5 && <line x1={50 + i*48} y1={50} x2={78 + i*48} y2={50} stroke={accent} strokeWidth="1.5"/>}
          </g>
        ))}
      </svg>
    </div>
  );
}

function CadenceThumb({ color, fg, accent }) {
  return (
    <div style={{ width: '100%', height: '100%', background: color, color: fg, padding: 18, borderRadius: 6, boxShadow: '0 30px 60px -20px #14131140', fontFamily: 'var(--mono)', fontSize: 9, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>ML · Classification</span>
        <span style={{ opacity: 0.5 }}>acc. 0.89</span>
      </div>
      <div style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 300, lineHeight: 1, marginBottom: 8 }}>Heart attack risk</div>
      <svg viewBox="0 0 280 110" style={{ width: '100%', height: 90 }}>
        {[...Array(40)].map((_, i) => {
          const cx = 10 + (i % 10) * 28;
          const cy = 10 + Math.floor(i / 10) * 25;
          const hit = (i * 7) % 3 === 0;
          return <circle key={i} cx={cx} cy={cy} r={hit ? 6 : 3} fill={hit ? accent : fg} opacity={hit ? 1 : 0.3}/>;
        })}
      </svg>
    </div>
  );
}

function FieldnotesThumb({ color, fg, accent }) {
  return (
    <div style={{ width: '100%', height: '100%', background: color, color: fg, padding: 18, borderRadius: 6, boxShadow: '0 30px 60px -20px #14131140', fontFamily: 'var(--mono)', fontSize: 9, position: 'relative' }}>
      <div style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Amazon · 1.4M rows</div>
      <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.3, marginBottom: 12 }}>
        Top categories, hourly patterns, churn cohorts — surfaced through pandas &amp; numpy.
      </div>
      <svg viewBox="0 0 280 60" style={{ width: '100%', height: 50 }}>
        {[40, 60, 35, 80, 50, 70, 30, 55, 75, 45].map((h, i) => (
          <rect key={i} x={i*28 + 4} y={60-h} width={20} height={h} fill={accent} opacity={0.7 + i*0.03}/>
        ))}
      </svg>
    </div>
  );
}

function MarinThumb({ color, fg, accent }) {
  return (
    <div style={{ width: '100%', height: '100%', background: color, color: fg, borderRadius: 6, boxShadow: '0 30px 60px -20px #14131140', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Lead Gen · Outreach</span>
        <div style={{ fontFamily: 'var(--display)', fontSize: 32, fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.9 }}>
          AI<br/><span style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>agents.</span>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent }}>24/7 automation</span>
      </div>
      <div style={{ background: accent, position: 'relative' }}>
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {[...Array(8)].map((_, i) => (
            <circle key={i} cx={50} cy={50} r={10 + i*6} fill="none" stroke={color} strokeWidth="0.5" opacity={1 - i*0.1}/>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ================================== ABOUT ================================= */
function AboutSection() {
  const ref = React.useRef(null);
  const prog = useScrollProgress(ref);
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : 40;

  return (
    <section id="about" ref={ref} style={{ padding: `${isMobile ? 80 : 140}px ${px}px`, background: 'var(--paper-2)', position: 'relative' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <SectionLabel index={2}>About · Practice</SectionLabel>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '1fr' : '2fr 1fr',
          gap: isTablet ? 48 : 80, alignItems: 'start',
        }}>
          <div>
            <h2 style={{
              margin: 0, fontFamily: 'var(--display)', fontWeight: 300,
              fontSize: isMobile ? 'clamp(28px, 7vw, 48px)' : 'clamp(40px, 5vw, 84px)',
              lineHeight: 1.1, letterSpacing: '-0.025em',
            }}>
              <p style={{ margin: 0 }}>
                I'm Awais — a <em style={{ fontFamily: 'var(--serif)', color: 'var(--accent)' }}>data scientist</em> and AI developer leveraging <em style={{ fontFamily: 'var(--serif)' }}>ML, RAG and multi-agent systems</em> for finance. Currently at Calibreon, studying Economics with Data Science at KIU.
              </p>
            </h2>

            <div style={{ marginTop: isMobile ? 40 : 72, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 48 }}>
              <Reveal>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>Principles</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--serif)', fontSize: isMobile ? 17 : 20, lineHeight: 1.55, fontStyle: 'italic' }}>
                  <li style={{ marginBottom: 8 }}>— Start with the question, not the model.</li>
                  <li style={{ marginBottom: 8 }}>— Clean data beats clever code.</li>
                  <li style={{ marginBottom: 8 }}>— Ship a notebook. Then an API. Then a product.</li>
                  <li>— Agents are colleagues, not magic.</li>
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>Off the keyboard</div>
                <p style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 17 : 20, lineHeight: 1.55, fontStyle: 'italic', margin: 0 }}>
                  I read econometrics papers at breakfast and finetune models at night. Gilgit-Baltistan keeps me grounded — mountains remind you that signal takes time to emerge.
                </p>
              </Reveal>
            </div>
          </div>

          <div>
            <Parallax speed={0.3}>
              <div style={{ width: '100%', aspectRatio: '3/4', background: 'var(--paper-3)', overflow: 'hidden', position: 'relative' }}>
                <PortraitPlaceholder />
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                  <span>Fig. 2</span>
                  <span>At the KIU campus</span>
                </div>
              </div>
            </Parallax>

            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Reveal>
                <div style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 48 : 56, fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <CountUp to={3} /><span style={{ fontSize: 24, color: 'var(--muted)' }}>yr</span>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>
                  In data &amp; AI
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 48 : 56, fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <CountUp to={12} />
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>
                  Shipped projects
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== EXPERIENCE =============================== */
const EXPERIENCE = [
  { year: '2025 → now', role: 'Data Science Specialist · AI Developer', company: 'Calibreon International · CalibreAI', detail: 'Leveraging data science, ML and AI for finance. Building multi-agent systems, RAG pipelines, and automation for lead generation and outreach.', loc: 'Gilgit-Baltistan' },
  { year: '2023 → 23', role: 'Data Science & AI Trainee', company: 'Karakoram International University (KIU)', detail: 'Diploma in Data Science & AI. Python, Pandas, NumPy, Matplotlib, Seaborn, PowerBI — data analysis, visualization and ML fundamentals. Grade: A.', loc: 'Gilgit' },
  { year: '2022 → 23', role: 'SEO Specialist', company: 'Ladyfinger Software House', detail: 'SEO strategy, non-fiction and long-form copywriting across technical and business topics. 11 months part-time.', loc: 'Gilgit' },
  { year: '2022 → 26', role: 'BSc — Economics with Data Science', company: 'Karakoram International University (KIU)', detail: 'Applied Economics with Data Science. Econometrics, statistics, and machine learning for economic modelling. Grade: A.', loc: 'Gilgit' },
];

function ExperienceSection() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : 40;

  return (
    <section id="process" style={{ padding: `${isMobile ? 80 : 140}px ${px}px`, background: 'var(--paper)', position: 'relative' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <SectionLabel index={3}>Experience · Shape</SectionLabel>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
          gap: 64, alignItems: 'end', marginBottom: isMobile ? 40 : 72,
        }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--display)', fontWeight: 300, fontSize: isMobile ? 'clamp(48px, 11vw, 80px)' : 'clamp(56px, 9vw, 144px)', lineHeight: 0.9, letterSpacing: '-0.035em' }}>
            <SplitText stagger={0.04}>Three years,</SplitText><br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}><SplitText stagger={0.04} delay={0.15}>one direction.</SplitText></span>
          </h2>
          {!isTablet && (
            <Reveal delay={0.2}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.45, margin: 0, color: 'var(--muted)', fontStyle: 'italic', maxWidth: 480, justifySelf: 'end' }}>
                From SEO copywriting to ML training to AI agents — a steady arc from words, to data, to decisions.
              </p>
            </Reveal>
          )}
        </div>

        <div>
          {EXPERIENCE.map((e, i) => (
            <ExperienceRow key={i} entry={e} index={i} isLast={i === EXPERIENCE.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceRow({ entry, index, isLast }) {
  const [hover, setHover] = React.useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  if (isMobile) {
    return (
      <Reveal y={16} delay={index * 0.04}>
        <div style={{
          padding: '24px 0',
          borderTop: '1px solid var(--rule-strong)',
          borderBottom: isLast ? '1px solid var(--rule-strong)' : 'none',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--muted)' }}>{entry.year}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{entry.loc}</span>
          </div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{entry.role}</div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--accent)', marginTop: 4, marginBottom: 8 }}>{entry.company}</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-2)', fontStyle: 'italic' }}>{entry.detail}</div>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal y={16} delay={index * 0.04}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        data-cursor="hover"
        style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '140px 1fr 1fr' : '180px 1fr 2fr 120px',
          gap: isTablet ? 20 : 32, alignItems: 'start',
          padding: '32px 12px',
          borderTop: '1px solid var(--rule-strong)',
          borderBottom: isLast ? '1px solid var(--rule-strong)' : 'none',
          position: 'relative',
          transition: 'padding 0.5s var(--ease-out)',
          paddingLeft: hover ? 28 : 12,
        }}
      >
        <div style={{
          position: 'absolute', left: 0, top: '50%',
          width: hover ? 16 : 0, height: 1, background: 'var(--accent)',
          transition: 'width 0.5s var(--ease-out)',
        }} />
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--muted)' }}>{entry.year}</div>
        <div>
          <div style={{ fontFamily: 'var(--display)', fontSize: isTablet ? 22 : 28, fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{entry.role}</div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: isTablet ? 16 : 20, color: 'var(--accent)', marginTop: 4 }}>{entry.company}</div>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: isTablet ? 16 : 19, lineHeight: 1.45, color: 'var(--ink-2)', fontStyle: 'italic' }}>{entry.detail}</div>
        {!isTablet && (
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'right' }}>{entry.loc}</div>
        )}
      </div>
    </Reveal>
  );
}

/* =============================== SKILLS ================================== */
const SKILLS = {
  'Data & ML': ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'EDA', 'Feature engineering', 'Fine-tuning', 'AutoML'],
  'AI & Agents': ['CrewAI', 'LangChain', 'RAG', 'LLMs', 'Multi-agent systems', 'Prompt engineering', 'Automation'],
  'Analysis': ['Econometrics', 'Statistical analysis', 'Data modeling', 'Stock market analysis', 'Data storytelling'],
  'Tooling': ['Matplotlib', 'Seaborn', 'Plotly', 'PowerBI', 'Jupyter', 'Git · GitHub'],
};

function SkillsSection() {
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : 40;

  return (
    <section style={{ padding: `${isMobile ? 80 : 120}px ${px}px`, background: 'var(--ink)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: isMobile ? 40 : 64 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ffffff70', marginBottom: 24 }}>
              <span style={{ color: 'var(--accent)' }}>§ 04</span>
              <span style={{ width: 60, height: 1, background: '#ffffff40' }} />
              <span>Toolkit · Discipline</span>
            </div>
            <h2 style={{ margin: 0, fontFamily: 'var(--display)', fontWeight: 300, fontSize: isMobile ? 'clamp(40px, 11vw, 72px)' : 'clamp(48px, 7vw, 112px)', lineHeight: 0.9, letterSpacing: '-0.035em' }}>
              <SplitText stagger={0.04}>Stack I reach</SplitText>{' '}
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}><SplitText stagger={0.04} delay={0.15}>for every day.</SplitText></span>
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? 28 : 48,
          borderTop: '1px solid #ffffff24', paddingTop: 32,
        }}>
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <Reveal key={cat} delay={i * 0.08}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
                0{i + 1} · {cat}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--serif)', fontSize: isMobile ? 16 : 20, lineHeight: 1.6 }}>
                {items.map(s => (
                  <li key={s} style={{ fontStyle: 'italic', borderBottom: '1px solid #ffffff18', padding: '6px 0' }}>{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Marquee ticker */}
        <div style={{ marginTop: isMobile ? 60 : 96, borderTop: '1px solid #ffffff24', borderBottom: '1px solid #ffffff24', padding: '16px 0' }}>
          <Marquee speed={35}>
            {['Python', 'Pandas', 'NumPy', 'CrewAI', 'LangChain', 'RAG', 'PowerBI', 'Matplotlib', 'Scikit-learn'].map(t => (
              <span key={t} style={{ fontFamily: 'var(--display)', fontWeight: 300, fontSize: isMobile ? 48 : 80, letterSpacing: '-0.03em', paddingRight: isMobile ? 32 : 56, display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>{t}</span>
                <span style={{ color: 'var(--accent)', fontSize: isMobile ? 36 : 56, marginLeft: isMobile ? 24 : 48 }}>✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/* ============================= TESTIMONIALS ============================== */
const TESTIMONIALS = [
  { quote: 'Awais turns messy CSVs into dashboards the team actually reads on Monday morning. Rare skill, reliably delivered.', author: 'CalibreAI', role: 'Project lead' },
  { quote: 'He approaches models the way an econometrician approaches a regression: with respect for the data, and zero tolerance for magic.', author: 'KIU · Data Science faculty', role: 'Program mentor' },
  { quote: 'Shipped a multi-agent pipeline in three weeks that our old stack couldn\'t touch in three months.', author: 'SME client', role: 'Operations lead' },
];

function TestimonialsSection() {
  const [idx, setIdx] = React.useState(0);
  const { isMobile } = useBreakpoint();

  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section style={{ padding: `${isMobile ? 100 : 160}px ${isMobile ? 20 : 40}px`, background: 'var(--paper-2)', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <SectionLabel index={5}>Testimonials · Trust</SectionLabel>
        <div style={{ position: 'relative', minHeight: isMobile ? 240 : 320 }}>
          {TESTIMONIALS.map((tx, i) => (
            <div key={i} style={{
              position: i === idx ? 'relative' : 'absolute',
              inset: 0,
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out)',
              pointerEvents: i === idx ? 'auto' : 'none',
            }}>
              <blockquote style={{
                margin: 0, fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: isMobile ? 'clamp(22px, 6vw, 32px)' : 'clamp(32px, 4vw, 56px)',
                lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--ink)',
              }}>
                <span style={{ fontSize: '2em', color: 'var(--accent)', lineHeight: 0, verticalAlign: '-0.2em', marginRight: 8 }}>"</span>
                {tx.quote}
                <span style={{ fontSize: '2em', color: 'var(--accent)', lineHeight: 0, verticalAlign: '-0.2em', marginLeft: 8 }}>"</span>
              </blockquote>
              <div style={{ marginTop: 40, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {tx.author} · <span style={{ color: 'var(--ink)' }}>{tx.role}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} data-cursor="hover"
              style={{
                width: i === idx ? 32 : 8, height: 8, borderRadius: 999,
                background: i === idx ? 'var(--ink)' : 'var(--rule-strong)',
                transition: 'all 0.5s var(--ease-out)',
              }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================== CONTACT ================================= */
function ContactSection() {
  const [time, setTime] = React.useState('');
  const { isMobile, isTablet } = useBreakpoint();
  const px = isMobile ? 20 : 40;

  React.useEffect(() => {
    const update = () => {
      setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Karachi' }).format(new Date()));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="contact" style={{ padding: `${isMobile ? 100 : 160}px ${px}px ${isMobile ? 60 : 80}px`, background: 'var(--ink)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ffffff70', marginBottom: 32 }}>
          <span style={{ color: 'var(--accent)' }}>§ 06</span>
          <span style={{ width: 60, height: 1, background: '#ffffff40' }} />
          <span>Contact · Closing</span>
        </div>

        <h2 style={{
          margin: 0, fontFamily: 'var(--display)', fontWeight: 300,
          fontSize: isMobile ? 'clamp(52px, 13vw, 96px)' : 'clamp(80px, 14vw, 240px)',
          lineHeight: 0.88, letterSpacing: '-0.045em',
        }}>
          <div><SplitText stagger={0.05}>Got data that</SplitText></div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', paddingLeft: isMobile ? '6vw' : '12vw' }}>
            <SplitText stagger={0.05} delay={0.2}>needs decisions</SplitText>
          </div>
          <div><SplitText stagger={0.05} delay={0.4}>made on it?</SplitText></div>
        </h2>

        <div style={{ marginTop: isMobile ? 40 : 64, display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: 48, alignItems: 'end' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 17 : 22, lineHeight: 1.5, fontStyle: 'italic', color: '#ffffffB0', margin: 0, maxWidth: 500 }}>
              Taking on data science, ML and AI-agent engagements through Calibreon and independently. Finance, SME analytics, and automation are my home turf.
            </p>
          </Reveal>
          <Reveal delay={0.15} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: isTablet ? 'flex-start' : 'flex-end' }}>
            <Magnetic strength={0.4}>
              <a href="https://www.linkedin.com/in/awais-khan-10808526b/" target="_blank" rel="noopener noreferrer" data-cursor="hover"
                 style={{
                   display: 'inline-flex', alignItems: 'center', gap: 14,
                   padding: isMobile ? '14px 22px' : '20px 32px',
                   background: 'var(--accent)', color: 'var(--ink)', borderRadius: 999,
                   fontFamily: 'var(--mono)', fontSize: isMobile ? 11 : 13, letterSpacing: '0.08em', textTransform: 'uppercase',
                 }}>
                Connect on LinkedIn
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.4"/></svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://github.com/awaiskhan005" target="_blank" rel="noopener noreferrer" data-cursor="hover"
                 style={{
                   padding: isMobile ? '14px 18px' : '20px 24px',
                   border: '1px solid #ffffff40', borderRadius: 999,
                   fontFamily: 'var(--mono)', fontSize: isMobile ? 11 : 13, letterSpacing: '0.08em', textTransform: 'uppercase',
                   display: 'inline-flex', alignItems: 'center', gap: 8,
                 }}>
                GitHub ↗
              </a>
            </Magnetic>
          </Reveal>
        </div>

        {/* Footer strip */}
        <div style={{
          marginTop: isMobile ? 80 : 160, paddingTop: 32,
          borderTop: '1px solid #ffffff24',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr',
          gap: isMobile ? 28 : 24,
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff70',
        }}>
          <div>
            <div style={{ color: '#ffffff40', marginBottom: 4 }}>Local time</div>
            <div style={{ color: '#fff' }}>{time} · Gilgit</div>
          </div>
          <div>
            <div style={{ color: '#ffffff40', marginBottom: 4 }}>Elsewhere</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <a href="https://www.linkedin.com/in/awais-khan-10808526b/" target="_blank" rel="noopener noreferrer" data-cursor="hover" style={{ color: '#fff' }}>LinkedIn ↗</a>
              <a href="https://github.com/awaiskhan005" target="_blank" rel="noopener noreferrer" data-cursor="hover" style={{ color: '#fff' }}>GitHub ↗</a>
              <a href="https://www.fiverr.com/ahilkarim521" target="_blank" rel="noopener noreferrer" data-cursor="hover" style={{ color: '#fff' }}>Fiverr ↗</a>
            </div>
          </div>
          {!isMobile && (
            <div>
              <div style={{ color: '#ffffff40', marginBottom: 4 }}>Study</div>
              <div>BSc Economics · Data Sci</div>
              <div>KIU · 2022–2026</div>
            </div>
          )}
          <div style={{ textAlign: isMobile ? 'right' : (isTablet ? 'left' : 'right') }}>
            <div style={{ color: '#ffffff40', marginBottom: 4 }}>© 2026</div>
            <div>Built in Gilgit-Baltistan</div>
          </div>
        </div>

        {/* Signature marquee */}
        <div style={{ marginTop: isMobile ? 48 : 80, overflow: 'hidden' }}>
          <Marquee speed={25}>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: isMobile ? 'clamp(80px, 18vw, 160px)' : 'clamp(140px, 22vw, 360px)', letterSpacing: '-0.04em', color: 'var(--accent)', paddingRight: 80, lineHeight: 0.9 }}>
              Awais Khan ✦ Awais Khan ✦
            </span>
          </Marquee>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WorkSection, AboutSection, ExperienceSection, SkillsSection, TestimonialsSection, ContactSection, SectionLabel, ProjectThumbnail });
