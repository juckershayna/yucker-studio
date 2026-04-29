/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect */

const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "editorial",
  "mood": "gold",
  "density": "balanced",
  "captionStyle": "minimal",
  "imageHover": "lift"
}/*EDITMODE-END*/;

function PortfolioTweaks() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    const grid = document.querySelector('.portfolio-grid');
    const body = document.body;

    if (grid) grid.dataset.layout = tw.layout;
    body.dataset.mood = tw.mood;
    body.dataset.density = tw.density;
    body.dataset.captions = tw.captionStyle;
    body.dataset.hover = tw.imageHover;

    const moods = {
      gold:  { gold: '#957B5F', soft: '#C6A47E', deep: '#6B5840', bg: '#0A0A0A', fg: '#F5F2EC' },
      bone:  { gold: '#C9B8A0', soft: '#E8DCC9', deep: '#8B7E6B', bg: '#0E0D0B', fg: '#F7F2E8' },
      ink:   { gold: '#7A8896', soft: '#A8B5C2', deep: '#566270', bg: '#0A0C0E', fg: '#EEF1F4' },
      rouge: { gold: '#A66760', soft: '#D49A92', deep: '#714540', bg: '#0E0A09', fg: '#F5EDEA' },
    };
    const m = moods[tw.mood] || moods.gold;
    root.style.setProperty('--gold', m.gold);
    root.style.setProperty('--gold-soft', m.soft);
    root.style.setProperty('--gold-deep', m.deep);
    root.style.setProperty('--bg', m.bg);
    root.style.setProperty('--fg', m.fg);
  }, [tw]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Layout · Rhythmus">
        <TweakRadio
          value={tw.layout}
          onChange={v => setTweak('layout', v)}
          options={[
            { value: 'uniform',   label: 'Uniform' },
            { value: 'editorial', label: 'Editorial' },
            { value: 'salon',     label: 'Salon' },
          ]}
        />
      </TweakSection>

      <TweakSection label="Stimmung">
        <TweakRadio
          value={tw.mood}
          onChange={v => setTweak('mood', v)}
          options={[
            { value: 'gold',  label: 'Gold' },
            { value: 'bone',  label: 'Bone' },
            { value: 'ink',   label: 'Ink' },
            { value: 'rouge', label: 'Rouge' },
          ]}
        />
      </TweakSection>

      <TweakSection label="Dichte">
        <TweakRadio
          value={tw.density}
          onChange={v => setTweak('density', v)}
          options={[
            { value: 'tight',    label: 'Eng' },
            { value: 'balanced', label: 'Mittel' },
            { value: 'airy',     label: 'Luftig' },
          ]}
        />
      </TweakSection>

      <TweakSection label="Beschriftung">
        <TweakSelect
          value={tw.captionStyle}
          onChange={v => setTweak('captionStyle', v)}
          options={[
            { value: 'minimal', label: 'Minimal — Titel · Jahr' },
            { value: 'serif',   label: 'Editorial — Titel groß' },
            { value: 'index',   label: 'Index — nummeriert' },
          ]}
        />
      </TweakSection>

      <TweakSection label="Bild-Hover">
        <TweakRadio
          value={tw.imageHover}
          onChange={v => setTweak('imageHover', v)}
          options={[
            { value: 'lift',    label: 'Lift' },
            { value: 'reveal',  label: 'Reveal' },
            { value: 'tint',    label: 'Tint' },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const mount = document.createElement('div');
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(<PortfolioTweaks />);
