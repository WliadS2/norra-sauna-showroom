import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const screenshotsDir = path.resolve('public/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Start preview server on port 4173
  console.log('Starting preview server...');
  const server = spawn('npm', ['run', 'preview', '--', '--port', '4173'], {
    stdio: 'pipe',
    shell: true,
  });

  server.stdout.on('data', (d) => process.stdout.write(d.toString()));
  server.stderr.on('data', (d) => process.stderr.write(d.toString()));

  await wait(3000); // Give preview server time to start

  const browser = await chromium.launch({
    headless: true,
    args: ['--enable-webgl', '--enable-webgl2', '--use-gl=angle', '--use-angle=swiftshader'],
  });
  const context = await browser.newContext();

  console.log('Capturing visual screenshots on http://localhost:4173 ...');

  // 1. DESKTOP VIEWPORT (1920x1080)
  const page = await context.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  // 1. First Hero Frame
  console.log('1. First Hero Frame');
  await page.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' });
  await wait(2000);
  await page.screenshot({ path: path.join(screenshotsDir, '01-hero-first-frame.png') });

  // 2. Hero After Camera Movement (Stage 2)
  console.log('2. Hero After Camera Movement');
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.0));
  await wait(1200);
  await page.screenshot({ path: path.join(screenshotsDir, '02-hero-camera-movement.png') });

  // 3. Material Close-Up (Stage 3)
  console.log('3. Material Close-Up');
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.2));
  await wait(1200);
  await page.screenshot({ path: path.join(screenshotsDir, '03-material-closeup.png') });

  // 4. Factory Assembly (Stage 4)
  console.log('4. Factory Assembly');
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3.4));
  await wait(1200);
  await page.screenshot({ path: path.join(screenshotsDir, '04-factory-assembly.png') });

  // 5. Product Studio (Stage 5)
  console.log('5. Product Studio');
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 4.6));
  await wait(1200);
  await page.screenshot({ path: path.join(screenshotsDir, '05-product-studio.png') });

  // 6. Shipping Scene (Stage 6)
  console.log('6. Shipping Scene');
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 6.0));
  await wait(1200);
  await page.screenshot({ path: path.join(screenshotsDir, '06-shipping-scene.png') });

  // 7. Final Villa Reveal (Stage 12)
  console.log('7. Final Villa Reveal');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await wait(1200);
  await page.screenshot({ path: path.join(screenshotsDir, '07-final-villa-reveal.png') });

  // 8. Configurator Desktop
  console.log('8. Configurator Desktop');
  await page.goto('http://localhost:4173/konfigurator', { waitUntil: 'domcontentloaded' });
  await wait(2000);
  await page.screenshot({ path: path.join(screenshotsDir, '08-configurator-desktop.png') });

  // 9. Collection Page
  console.log('9. Collection Overview');
  await page.goto('http://localhost:4173/kollektion', { waitUntil: 'domcontentloaded' });
  await wait(1000);
  await page.screenshot({ path: path.join(screenshotsDir, '09-collection-overview.png') });

  // 10. Product Detail Page
  console.log('10. Product Detail CUBE 01');
  await page.goto('http://localhost:4173/kollektion/cube-01', { waitUntil: 'domcontentloaded' });
  await wait(2000);
  await page.screenshot({ path: path.join(screenshotsDir, '10-product-detail.png') });

  await page.close();

  // 2. MOBILE VIEWPORT (390x844)
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });

  // 11. Mobile Hero
  console.log('11. Mobile Hero Frame');
  await mobilePage.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' });
  await wait(2000);
  await mobilePage.screenshot({ path: path.join(screenshotsDir, '11-mobile-hero.png') });

  // 12. Mobile Configurator
  console.log('12. Mobile Configurator');
  await mobilePage.goto('http://localhost:4173/konfigurator', { waitUntil: 'domcontentloaded' });
  await wait(2000);
  await mobilePage.screenshot({ path: path.join(screenshotsDir, '12-mobile-configurator.png') });

  await mobilePage.close();
  await browser.close();

  server.kill();
  console.log('Screenshot capture finished successfully!');
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
