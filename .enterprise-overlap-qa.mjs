export default async function run(page) {
  await page.goto("http://localhost:3000");
  return await page.locator("#enterprise").evaluate((section) => {
    const sectionBox = section.getBoundingClientRect();
    const guide = section.querySelector('a[href="/enterprise"]');
    const connectorBox = section.querySelector('.bg-white\\/5')?.getBoundingClientRect();
    const guideBox = guide?.getBoundingClientRect();
    return {
      section: { top: sectionBox.top, bottom: sectionBox.bottom, height: sectionBox.height },
      guide: guideBox ? { top: guideBox.top, bottom: guideBox.bottom, height: guideBox.height } : null,
      connector: connectorBox ? { top: connectorBox.top, bottom: connectorBox.bottom } : null,
      overflow: getComputedStyle(section).overflow,
      visible: guide ? getComputedStyle(guide).visibility : null,
    };
  });
}
