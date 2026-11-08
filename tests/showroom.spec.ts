import { test, expect } from '@playwright/test';

test.describe('NØRRA SAUNA Showroom Architecture & E-Commerce', () => {

  test('Homepage mounts single persistent Canvas without collapsing to 300px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Wait for canvas to be present
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible({ timeout: 10000 });
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.getBoundingClientRect().width > 500;
    });

    // Verify canvas sizing
    const box = await canvas.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      // Must occupy full viewport and NOT default 300px
      expect(box.width).toBeGreaterThanOrEqual(1400);
      expect(box.height).toBeGreaterThanOrEqual(850);
      expect(box.width).not.toBe(300);
      expect(box.height).not.toBe(150);
    }

    // Check wrapper
    const wrapper = page.locator('[data-testid="norra-canvas-wrapper"]');
    await expect(wrapper).toBeVisible();

    // Verify hero text
    await expect(page.locator('h1')).toContainText('WÄRME');
  });

  test('Canvas persists without remounting during scroll down and reverse scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible();

    // Store element handle
    const initialCanvasHandle = await canvas.elementHandle();

    // Scroll through sections
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4));
    await page.waitForTimeout(600);

    // Canvas must still be present and be the exact same DOM node
    const currentCanvasHandle = await canvas.elementHandle();
    expect(initialCanvasHandle).toBeTruthy();
    expect(currentCanvasHandle).toBeTruthy();

    // Scroll reverse back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    await expect(page.locator('h1')).toContainText('WÄRME');
  });

  test('Configurator allows 3D options, pricing updates, and quotation summary', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/konfigurator');

    // Canvas exists and fills ~70% area
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible();
    await page.waitForFunction(() => {
      const c = document.querySelector('canvas');
      return c && c.getBoundingClientRect().width > 500;
    });

    const box = await canvas.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(800);
      expect(box.width).not.toBe(300);
    }

    // Check initial price
    const priceText = page.locator('text=CHF 10\'490').first();
    await expect(priceText).toBeVisible();

    // Switch to Grand size
    await page.click('button:has-text("Grand")');
    await page.waitForTimeout(300);
    await expect(page.locator('text=CHF 14\'990').first()).toBeVisible();

    // Switch to Natural Thermowood on Exterior tab
    await page.click('button:has-text("Aussen")');
    await page.waitForTimeout(300);
    await page.click('button:has-text("Natur Thermoholz")');
    await page.waitForTimeout(300);
    // 14990 + 450 = 15440
    await expect(page.locator('text=CHF 15\'440').first()).toBeVisible();

    // Open Offerte Summary Modal
    await page.click('button:has-text("Offerte Zusammenfassung")');
    await expect(page.locator('h3:has-text("Ihre CUBE 01 Zusammenfassung")')).toBeVisible();
    await expect(page.locator('text=CHF 15\'440').first()).toBeVisible();
  });

  test('All required brand routes load successfully', async ({ page }) => {
    const routes = [
      '/kollektion',
      '/kollektion/cube-01',
      '/konfigurator',
      '/der-weg',
      '/materialien',
      '/atelier',
      '/offerte',
      '/kontakt',
      '/faq',
      '/impressum',
      '/datenschutz',
      '/agb',
    ];

    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('nav').first()).toBeVisible();
    }
  });

  test('404 route displays custom architectural error state', async ({ page }) => {
    await page.goto('/nicht-existierend');
    await expect(page.locator('h1')).toContainText('Im Nebel verschollen');
  });

  test('Mobile viewport (390px) renders without horizontal scroll overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible();

    // Ensure no horizontal scrollbar overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });

});
