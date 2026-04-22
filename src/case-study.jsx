/* Case study modal - opens when a project row is clicked */

function CaseStudyModal({ project, onClose }) {
  const [scrollPos, setScrollPos] = React.useState(0);
  const ref = React.useRef(null);
  const { isMobile, isTablet } = useBreakpoint();

  React.useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [project]);

  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  const onScroll = e => setScrollPos(e.currentTarget.scrollTop);
  const px = isMobile ? 20 : 40;

  const descriptions = {
    ledgerly: 'A CrewAI-based multi-agent system for an SME finance team. Researcher, analyst, writer and auditor agents collaborate on recurring financial tasks — reports that used to take days now arrive as a pull request every Monday morning.',
    cadence: 'An ML pipeline predicting heart attack risk from clinical variables, and a parallel classifier scoring advertising response. Full EDA through scikit-learn deployment — accuracy 0.89, interpretable via SHAP.',
    fieldnotes: 'Exploratory analysis of a 1.4M-row Amazon purchase dataset using pandas and numpy. Surfaces top categories, hourly purchase patterns, and churn cohorts, all captured in a single reproducible notebook with Matplotlib visuals.',
    marin: 'Automation for cold outreach and lead generation. Agents scrape qualified prospects, draft personalised intros, and log responses to a PowerBI dashboard — replacing a manual pipeline that hit a ceiling at 40 leads/week.',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: project.color, color: project.fg,
      animation: 'caseIn 0.6s var(--ease-out)',
    }}>
      {/* close */}
      <button onClick={onClose} data-cursor="hover"
        style={{
          position: 'fixed', top: isMobile ? 16 : 28, right: isMobile ? 20 : 40, zIndex: 10,
          width: 48, height: 48, borderRadius: '50%',
          border: `1px solid ${project.fg}30`, background: `${project.fg}0A`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke={project.fg} strokeWidth="1.4"/></svg>
      </button>

      {/* scroll progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: `${project.fg}18`, zIndex: 9 }}>
        <div style={{ height: '100%', background: project.accent, width: `${scrollPos > 0 ? Math.min(100, (scrollPos / (ref.current?.scrollHeight - ref.current?.clientHeight || 1)) * 100) : 0}%`, transition: 'width 0.1s linear' }} />
      </div>

      <div ref={ref} onScroll={onScroll} style={{ height: '100vh', overflowY: 'auto', padding: `${isMobile ? 72 : 64}px ${px}px ${isMobile ? 60 : 120}px` }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* meta */}
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', gap: 12, marginBottom: 40, opacity: 0.7, flexWrap: 'wrap' }}>
            <span>§ {project.num}</span>
            <span>{project.client}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.role}</span>
          </div>

          {/* title */}
          <h1 style={{
            margin: 0, fontFamily: 'var(--display)', fontWeight: 300,
            fontSize: isMobile ? 'clamp(40px, 10vw, 72px)' : 'clamp(56px, 8vw, 128px)',
            lineHeight: 0.92, letterSpacing: '-0.03em', maxWidth: '15ch',
          }}>
            <span>{project.title.split(' ').slice(0, -2).join(' ')} </span>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>{project.title.split(' ').slice(-2).join(' ')}</span>
          </h1>

          {/* intro grid */}
          <div style={{ marginTop: isMobile ? 40 : 64, display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: 48 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 17 : 24, lineHeight: 1.45, fontStyle: 'italic', maxWidth: 540 }}>
              {descriptions[project.id]}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 16 : 24 }}>
              {[
                { label: 'Duration', value: 'Ongoing' },
                { label: 'Role',     value: project.role },
                { label: 'Stack',    value: project.tags.join(' · ') },
                { label: 'Outcome',  value: 'Shipped' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 16 : 22, fontStyle: 'italic' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* big visual */}
          <div style={{ marginTop: isMobile ? 48 : 80, height: isMobile ? 260 : 560, background: project.fg, borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: isMobile ? 20 : 40 }}>
              <ProjectThumbnail project={project} />
            </div>
          </div>

          {/* process narrative */}
          <div style={{ marginTop: isMobile ? 48 : 80, display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '140px 1fr', gap: isMobile ? 16 : 48 }}>
            {!isTablet && (
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6 }}>01 · Framing</div>
            )}
            <div style={{ maxWidth: 720 }}>
              {isTablet && (
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 12 }}>01 · Framing</div>
              )}
              <p style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 18 : 26, lineHeight: 1.4, fontStyle: 'italic', margin: 0 }}>
                We started where every good data project should: with the question, not the model. Three weeks of stakeholder interviews, source-system audits, and sample exports — then a ruthless edit down to the single decision the team actually needed help making.
              </p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 16 : 19, lineHeight: 1.55, marginTop: 24, opacity: 0.8 }}>
                From there the work was disciplined: reproducible notebooks, clean features, honest baselines, and a pipeline the team could re-run themselves. Nothing magical — just rigour, repeated.
              </p>
            </div>
          </div>

          {/* before/after */}
          <div style={{ marginTop: isMobile ? 40 : 80, display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: 40 }}>
            <div style={{ aspectRatio: isTablet ? '16/9' : '4/3', background: project.fg, borderRadius: 6, padding: isMobile ? 20 : 32, color: project.color }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 8 }}>Before</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 20 : 28, fontWeight: 300, letterSpacing: '-0.02em' }}>3 people, 2 days per report</div>
              <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.6, lineHeight: 1.6 }}>
                Data lived across spreadsheets, a CRM, and a PDF archive nobody trusted. Every recurring analysis began with an hour of copy-paste and an apology.
              </div>
            </div>
            <div style={{ aspectRatio: isTablet ? '16/9' : '4/3', background: project.accent, borderRadius: 6, padding: isMobile ? 20 : 32, color: project.color }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 8 }}>After</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 20 : 28, fontWeight: 300, letterSpacing: '-0.02em' }}>1 pipeline, 1 dashboard, 0 reruns</div>
              <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.7, lineHeight: 1.6 }}>
                A single reproducible pipeline: pandas for cleaning, scikit-learn for modelling, a multi-agent layer for narrative, PowerBI for the stakeholders.
              </div>
            </div>
          </div>

          {/* pull quote */}
          <div style={{ marginTop: isMobile ? 60 : 120, marginBottom: isMobile ? 40 : 80, textAlign: 'center', maxWidth: 900, margin: `${isMobile ? 60 : 120}px auto ${isMobile ? 40 : 80}px` }}>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: isMobile ? 'clamp(22px, 6vw, 32px)' : 'clamp(32px, 4vw, 56px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              <span style={{ fontSize: '1.5em', color: project.accent, lineHeight: 0, verticalAlign: '-0.15em' }}>"</span>
              The dashboard told us in four minutes what three people used to spend two days writing. Then we trusted it.
              <span style={{ fontSize: '1.5em', color: project.accent, lineHeight: 0, verticalAlign: '-0.15em' }}>"</span>
            </div>
            <div style={{ marginTop: 32, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6 }}>
              Ops lead, SME finance client
            </div>
          </div>

          {/* outcome metrics */}
          <div style={{ borderTop: `1px solid ${project.fg}24`, paddingTop: 48, display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 28 : 32 }}>
            {[
              { n: '0.89', l: 'Model accuracy' },
              { n: '−92%', l: 'Time to report' },
              { n: '×4.1', l: 'Throughput uplift' },
              { n: '1.4M', l: 'Rows processed' },
            ].map((m, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 52 : 72, fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.9 }}>{m.n}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, marginTop: 8 }}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* back / close */}
          <div style={{ marginTop: isMobile ? 60 : 120, paddingTop: 48, borderTop: `1px solid ${project.fg}24`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={onClose} data-cursor="hover"
              style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 10, color: project.fg }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 13L1 1M1 1V9M1 1H9" stroke="currentColor" strokeWidth="1.4"/></svg>
              Back to index
            </button>
            {!isMobile && (
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.5 }}>
                Esc to close
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes caseIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

window.CaseStudyModal = CaseStudyModal;
