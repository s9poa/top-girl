(() => {
    const config = {
      initialDelay: 2000,   // ms before fading state-one → state-two
      fadeDuration: 500,    // fade in/out time (ms)
      checkInterval: 1000   // time each check-message stays (ms)
    };
  
    const wait = ms => new Promise(r => setTimeout(r, ms));
  
    const fadeOut = (el, d) =>
      new Promise(r => {
        el.style.transition = `opacity ${d}ms`;
        el.style.opacity = 0;
        setTimeout(() => {
          el.style.display = 'none';
          r();
        }, d);
      });
  
    const fadeIn = (el, d, display = 'block') =>
      new Promise(r => {
        el.style.opacity   = 0;
        el.style.display   = display;
        el.style.transition = `opacity ${d}ms`;
        requestAnimationFrame(() => el.style.opacity = 1);
        setTimeout(r, d);
      });
  
    async function runChecks() {
      const container  = document.querySelector('.loading-state.two');
      const footer     = container.querySelector('.footer');
      const barOutline = footer.querySelector('.loading-bar-outline');
      const loadingBar = barOutline.querySelector('.loading-bar');
  
      // 1) Make sure it’s always a smooth pill and hint to GPU
      loadingBar.style.borderRadius = '10px'; // half of 20px height
      loadingBar.style.willChange    = 'width';
  
      // 2) Ensure exactly one <p class="loading-text">
      let txt = footer.querySelector('.loading-text');
      if (!txt) {
        txt = document.createElement('p');
        txt.className = 'loading-text';
        footer.insertBefore(txt, barOutline);
      }
  
      // 3) Your check messages
      const messages = [
        'Checking Network . . .',
        'Verifying Game Resources . . .',
        'Platform Certification in Progress . . .',
        'Connecting to Gateway . . .',
        'Request Character List . . .',
        'Logging into Server . . .'
      ];
      const totalTime = config.checkInterval * messages.length;
  
      // 4) Reset bar to 0% **without** transition
      loadingBar.style.transition = 'none';
      loadingBar.style.width      = '0%';
  
      // 5) Force a reflow so the browser paints that 0% immediately
      loadingBar.getBoundingClientRect();
  
      // 6) Now set the transition and kick off the fill
      loadingBar.style.transition = `width ${totalTime}ms linear`;
      loadingBar.style.width      = '100%';
  
      // 7) Cycle through each message
      for (const msg of messages) {
        txt.textContent = msg;
        await wait(config.checkInterval);
      }
    }
  
    async function startLoading() {
      const s1 = document.querySelector('.loading-state.one');
      const s2 = document.querySelector('.loading-state.two');
      const s3 = document.querySelector('.loading-state.three');
  
      // fade one → two
      await wait(config.initialDelay);
      await fadeOut(s1, config.fadeDuration);
  
      // begin showing two & immediately start checks/bar
      fadeIn(s2, config.fadeDuration, 'flex');
      await runChecks();
  
      // fade two → three
      await fadeOut(s2, config.fadeDuration);
      await fadeIn(s3, config.fadeDuration, 'flex');
    }
  
    document.addEventListener('DOMContentLoaded', startLoading);
  })();
  