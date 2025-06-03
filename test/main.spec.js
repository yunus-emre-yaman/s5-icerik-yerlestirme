import { expect, test } from "@playwright/test";
import { siteContent } from "./../content.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getNormalizedHtmlHash() {
  const html = path.resolve(__dirname, "../index.html");
  const htmlContent = fs.readFileSync(html, "utf-8");
  const normalized = htmlContent
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

let context;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
});

test.afterAll(async () => {
  await context.close();
});

/* 1 */
test("Logo görseli doğru src'ye sahip olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const logoImg = page.locator("#logo-img");
  await expect(logoImg).toHaveAttribute("src", siteContent.images["logo-img"]);
  await page.close();
});

/* 2 */
test("Nav linkleri doğru text ve 'italic' class'ına sahip olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const navLinks = page.locator("nav a");
  const count = await navLinks.count();

  for (let i = 0; i < count; i++) {
    await expect(navLinks.nth(i)).toHaveText(
      siteContent.nav[`nav-item-${i + 1}`],
    );
    await expect(navLinks.nth(i)).toHaveClass(/italic/);
  }
  await page.close();
});

/* 3 */
test("CTA başlığı doğru text içermeli", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const ctaTitle = page.locator(".cta-text h1");
  await expect(ctaTitle).toHaveText(siteContent.cta.h1);
  await page.close();
});

/* 4 */
test("CTA butonu doğru text içermeli", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const ctaButton = page.locator(".cta-text button");
  await expect(ctaButton).toHaveText(siteContent.cta.button);
  await page.close();
});

/* 5 */
test("CTA görseli doğru src'ye sahip olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const ctaImg = page.locator("#cta-img");
  await expect(ctaImg).toHaveAttribute("src", siteContent.images["cta-img"]);
  await page.close();
});

/* 6 */
test("Middle img doğru src'ye sahip olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const middleImg = page.locator("#middle-img");
  await expect(middleImg).toHaveAttribute(
    "src",
    siteContent.images["accent-img"],
  );
  await page.close();
});

/* 7 */
test("Top content başlıkları doğru olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const headings = page.locator(".top-content .text-content h4");
  await expect(headings.nth(0)).toHaveText(
    siteContent["top-content"]["left-h4"],
  );
  await expect(headings.nth(1)).toHaveText(
    siteContent["top-content"]["right-h4"],
  );
  await page.close();
});

/* 8 */
test("Top content paragrafları doğru olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const paragraphs = page.locator(".top-content .text-content p");
  await expect(paragraphs.nth(0)).toHaveText(
    siteContent["top-content"]["left-content"],
  );
  await expect(paragraphs.nth(1)).toHaveText(
    siteContent["top-content"]["right-content"],
  );
  await page.close();
});

/* 9 */
test("Bottom content başlıkları doğru olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const headings = page.locator(".bottom-content .text-content h4");
  await expect(headings.nth(0)).toHaveText(
    siteContent["bottom-content"]["left-h4"],
  );
  await expect(headings.nth(1)).toHaveText(
    siteContent["bottom-content"]["middle-h4"],
  );
  await expect(headings.nth(2)).toHaveText(
    siteContent["bottom-content"]["right-h4"],
  );
  await page.close();
});

/* 10 */
test("Bottom content paragrafları doğru olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const paragraphs = page.locator(".bottom-content .text-content p");
  await expect(paragraphs.nth(0)).toHaveText(
    siteContent["bottom-content"]["left-content"],
  );
  await expect(paragraphs.nth(1)).toHaveText(
    siteContent["bottom-content"]["middle-content"],
  );
  await expect(paragraphs.nth(2)).toHaveText(
    siteContent["bottom-content"]["right-content"],
  );
  await page.close();
});

/* 11 */
test("Contact başlığı doğru olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const heading = page.locator(".contact h4");
  await expect(heading).toHaveText(siteContent.contact["contact-h4"]);
  await page.close();
});

/* 12 */
test("Contact bilgileri doğru olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const lines = page.locator(".contact p");
  await expect(lines.nth(0)).toHaveText(siteContent.contact.address);
  await expect(lines.nth(1)).toHaveText(siteContent.contact.phone);
  await expect(lines.nth(2)).toHaveText(siteContent.contact.email);
  await page.close();
});

/* 13 */
test("Footer linki doğru text'e ve 'bold' class'ına sahip olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const footerLink = page.locator("footer a");
  await expect(footerLink).toHaveText(siteContent.footer.copyright);
  await expect(footerLink).toHaveClass(/bold/);
  await page.close();
});

test("index.html içeriği değişmemiş olmalı", async () => {
  const actualHash = getNormalizedHtmlHash();
  const expectedHash =
    "615f980f196d572d23fb9dab8cf0b351b44f83a214088cc688ede4d9c8835774";

  expect(actualHash).toBe(expectedHash);
});
