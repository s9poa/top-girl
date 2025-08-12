(() => {
  const cfg = { initialDelay: 2000, fade: 350, step: 900 };
  const $ = s => document.querySelector(s);
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const setShown = (el, show, display = 'block') => {
    if (!el) return;
    el.style.display = show ? display : 'none';
    el.style.opacity = show ? '1' : '0';
  };
  const fadeTo = (el, target, dur, display = 'block') =>
    new Promise(res => {
      if (!el) return res();
      if (target === 1) {
        el.style.display = display;
        el.style.opacity = '0';
      }
      el.style.transition = `opacity ${dur}ms ease`;
      requestAnimationFrame(() => {
        el.style.opacity = String(target);
        setTimeout(() => {
          if (target === 0) el.style.display = 'none';
          res();
        }, dur);
      });
    });

  const runBar = async () => {
    const wrap = $('.loading-state.two');
    const footer = wrap.querySelector('.footer');
    const outline = footer.querySelector('.loading-bar-outline');
    const bar = outline.querySelector('.loading-bar');
    let txt = footer.querySelector('.loading-text');
    if (!txt) {
      txt = document.createElement('p');
      txt.className = 'loading-text';
      footer.insertBefore(txt, outline);
    }
    const messages = [
      'Checking Network . . .',
      'Verifying Game Resources . . .',
      'Platform Certification in Progress . . .',
      'Connecting to Gateway . . .',
      'Requesting Character List . . .',
      'Logging into Server . . .'
    ];
    const total = cfg.step * messages.length;
    bar.style.transition = 'none';
    bar.style.width = '0%';
    bar.getBoundingClientRect();
    bar.style.transition = `width ${total}ms linear`;
    bar.style.width = '100%';
    for (const m of messages) {
      txt.textContent = m;
      await wait(cfg.step);
    }
  };

  const start = async () => {
    const s1 = $('.loading-state.one');
    const s2 = $('.loading-state.two');
    const s3 = $('.loading-state.three');
    setShown(s1, true, 'flex');
    setShown(s2, false);
    setShown(s3, false);
    await wait(cfg.initialDelay);
    await fadeTo(s1, 0, cfg.fade);
    await fadeTo(s2, 1, cfg.fade, 'flex');
    await runBar();
    await fadeTo(s2, 0, cfg.fade);
    await fadeTo(s3, 1, cfg.fade, 'flex');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
