const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  // Wait for load
  await page.waitForTimeout(2000);
  
  // Open McDonald's
  const mcd = await page.waitForSelector('.desktop-icon');
  await mcd.evaluate(el => {
    const event = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
    el.dispatchEvent(event);
  });
  
  await page.waitForTimeout(1000);
  
  // Find 05_SOCIAL
  const folders = await page.$$('.finder-folder-item');
  for (let f of folders) {
    const text = await f.evaluate(el => el.innerText);
    if (text.includes('05_SOCIAL')) {
      await f.evaluate(el => {
        const event = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
        el.dispatchEvent(event);
      });
      break;
    }
  }
  
  await page.waitForTimeout(1000);
  
  // Find 03_TIKTOK
  const folders2 = await page.$$('.finder-folder-item');
  for (let f of folders2) {
    const text = await f.evaluate(el => el.innerText);
    if (text.includes('03_TIKTOK')) {
      await f.evaluate(el => {
        const event = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
        el.dispatchEvent(event);
      });
      break;
    }
  }
  
  await page.waitForTimeout(1000);
  
  // Double click the first video
  const videos = await page.$$('.finder-folder-item');
  if (videos.length > 0) {
    await videos[0].evaluate(el => {
      const event = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
      el.dispatchEvent(event);
    });
  }
  
  await page.waitForTimeout(2000);
  
  // See if a video is playing
  const isPlaying = await page.evaluate(() => {
    const v = document.querySelector('video.qt-video-element');
    return v ? !v.paused : null;
  });
  console.log('Is playing originally:', isPlaying);
  
  // Try to click the video to pause
  const video = await page.$('.qt-video-element');
  if (video) {
    await video.click();
  }
  
  await page.waitForTimeout(1000);
  
  const isPausedAfterVideoClick = await page.evaluate(() => {
    const v = document.querySelector('video.qt-video-element');
    return v ? v.paused : null;
  });
  console.log('Is paused after video click:', isPausedAfterVideoClick);
  
  // If not paused, click the overlay
  await page.evaluate(() => {
    const overlay = document.querySelector('.qt-player-area > div[style*="position: absolute"]');
    if (overlay) overlay.click();
  });
  
  await page.waitForTimeout(1000);
  
  const isPausedAfterOverlayClick = await page.evaluate(() => {
    const v = document.querySelector('video.qt-video-element');
    return v ? v.paused : null;
  });
  console.log('Is paused after overlay click:', isPausedAfterOverlayClick);
  
  // If not paused, click the pause button
  await page.evaluate(() => {
    const btn = document.querySelector('.qt-btn-play');
    if (btn) btn.click();
  });
  
  await page.waitForTimeout(1000);
  
  const isPausedAfterBtnClick = await page.evaluate(() => {
    const v = document.querySelector('video.qt-video-element');
    return v ? v.paused : null;
  });
  console.log('Is paused after btn click:', isPausedAfterBtnClick);
  
  // Check pointer events of overlay
  const overlayEvents = await page.evaluate(() => {
    const overlay = document.querySelector('.qt-player-area > div[style*="position: absolute"]');
    return overlay ? window.getComputedStyle(overlay).pointerEvents : null;
  });
  console.log('Overlay pointer events:', overlayEvents);

  await browser.close();
})();
