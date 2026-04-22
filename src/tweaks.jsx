/* Tweaks panel - theme + motion intensity */

function TweaksPanel({ tweaks, setTweaks }) {
  const [active, setActive] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setActive(true);
      else if (e.data.type === '__deactivate_edit_mode') setActive(false);
    };
    window.addEventListener('message', onMsg);
    // announce
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  React.useEffect(() => {
    if (active) setVisible(true);
    else {
      const id = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(id);
    }
  }, [active]);

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 200,
      width: 300, padding: 20,
      background: 'var(--paper)', color: 'var(--ink)',
      border: '1px solid var(--rule-strong)',
      borderRadius: 8,
      boxShadow: '0 30px 60px -20px #14131140',
      fontFamily: 'var(--sans)',
      transform: active ? 'translateY(0)' : 'translateY(12px)',
      opacity: active ? 1 : 0,
      transition: 'transform 0.4s var(--ease-out), opacity 0.4s var(--ease-out)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Tweaks
        </div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
      </div>

      {/* Theme */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Theme</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, padding: 4, border: '1px solid var(--rule-strong)', borderRadius: 6 }}>
          {['light', 'dark'].map(t => (
            <button key={t} onClick={() => update({ theme: t })} data-cursor="hover"
              style={{
                padding: '10px 12px', borderRadius: 4,
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                background: tweaks.theme === t ? 'var(--ink)' : 'transparent',
                color: tweaks.theme === t ? 'var(--paper)' : 'var(--ink)',
                transition: 'all 0.3s var(--ease-out)',
              }}>
              {t === 'light' ? '☀ Light' : '☾ Dark'}
            </button>
          ))}
        </div>
      </div>

      {/* Motion */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
          <span>Motion intensity</span>
          <span style={{ color: 'var(--accent)' }}>{tweaks.motionIntensity.toFixed(1)}x</span>
        </div>
        <input type="range" min="0" max="2" step="0.1" value={tweaks.motionIntensity}
          onChange={e => update({ motionIntensity: parseFloat(e.target.value) })}
          style={{ width: '100%', accentColor: 'var(--accent)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted-2)', marginTop: 4 }}>
          <span>off</span><span>natural</span><span>extra</span>
        </div>
      </div>

      {/* Hero variant */}
      <div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Hero variant</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {[
            { n: 1, label: 'Editorial' },
            { n: 2, label: 'Oversized' },
            { n: 3, label: 'Portrait' },
          ].map(v => (
            <button key={v.n} onClick={() => update({ heroVariant: v.n })} data-cursor="hover"
              style={{
                padding: '10px 8px', borderRadius: 4,
                border: '1px solid ' + (tweaks.heroVariant === v.n ? 'var(--ink)' : 'var(--rule-strong)'),
                background: tweaks.heroVariant === v.n ? 'var(--ink)' : 'transparent',
                color: tweaks.heroVariant === v.n ? 'var(--paper)' : 'var(--ink)',
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'all 0.3s var(--ease-out)',
              }}>
              {v.n} · {v.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
