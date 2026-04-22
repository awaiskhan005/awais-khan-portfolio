/* App root - wires everything together */

function App() {
  const [tweaks, setTweaks] = React.useState(() => {
    const defaults = window.__TWEAK_DEFAULTS || { theme: 'light', motionIntensity: 1, heroVariant: 1 };
    try {
      const saved = localStorage.getItem('portfolio-tweaks');
      if (saved) return { ...defaults, ...JSON.parse(saved) };
    } catch (e) {}
    return defaults;
  });

  const [caseStudy, setCaseStudy] = React.useState(null);

  // persist
  React.useEffect(() => {
    try { localStorage.setItem('portfolio-tweaks', JSON.stringify(tweaks)); } catch (e) {}
  }, [tweaks]);

  // apply theme
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
  }, [tweaks.theme]);

  const motion = { intensity: tweaks.motionIntensity };

  return (
    <MotionCtx.Provider value={motion}>
      <ScrollProvider>
        <Cursor />
        <Nav theme={tweaks.theme} />
        <main>
          <Hero
            variant={tweaks.heroVariant}
            onVariantChange={(v) => {
              setTweaks(t => ({ ...t, heroVariant: v }));
              window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { heroVariant: v } }, '*');
            }}
          />
          <WorkSection onOpenCaseStudy={setCaseStudy} />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <CaseStudyModal project={caseStudy} onClose={() => setCaseStudy(null)} />
        <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} />
      </ScrollProvider>
    </MotionCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
