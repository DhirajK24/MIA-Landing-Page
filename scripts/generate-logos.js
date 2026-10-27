const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "..", "public");

const markCoords = [
  [0, 0], [1, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2],
  [1, 3], [2, 3], [1, 4], [2, 4], [1, 5], [2, 5],
];

function generateMarkSvgInner(fgColor = "#FEFEF7") {
  return markCoords
    .map(([x, y]) => {
      const rx = x * 15 + 10.5;
      const ry = y * 8 + 9;
      return `<rect x="${rx}" y="${ry}" width="13" height="6" fill="${fgColor}" />`;
    })
    .join("\n    ");
}

function generateScaledBlocks(fill = "#FFFFFF", rx = 4) {
  return markCoords
    .map(([x, y]) => {
      const colX = x === 0 ? 100 : x === 1 ? 209 : 318;
      const rowY = 96 + y * 58;
      return `<rect x="${colX}" y="${rowY}" width="94" height="44" rx="${rx}" fill="${fill}" />`;
    })
    .join("\n    ");
}

// 1. Standard Brand Logos
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" width="280" height="64" fill="none">
  <rect x="0" y="0" width="64" height="64" rx="10" fill="#366CC5"/>
  <g>${generateMarkSvgInner("#FEFEF7")}</g>
  <text x="82" y="44" font-family="'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="-0.06em">
    <tspan fill="#030302">MIA</tspan>
    <tspan fill="#AF140B" dx="3">/</tspan>
  </text>
</svg>`;

const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" width="280" height="64" fill="none">
  <rect x="0" y="0" width="64" height="64" rx="10" fill="#366CC5"/>
  <g>${generateMarkSvgInner("#FEFEF7")}</g>
  <text x="82" y="44" font-family="'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="-0.06em">
    <tspan fill="#FEFEF7">MIA</tspan>
    <tspan fill="#AF140B" dx="3">/</tspan>
  </text>
</svg>`;

const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="blueTile" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3A82F7"/>
      <stop offset="100%" stop-color="#1B63D8"/>
    </linearGradient>
  </defs>
  <rect x="28" y="24" width="456" height="456" rx="108" fill="url(#blueTile)"/>
  <g>${generateScaledBlocks("#FFFFFF")}</g>
</svg>`;

const logoMarkDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <rect x="28" y="24" width="456" height="456" rx="108" fill="#0A0F1D"/>
  <g>${generateScaledBlocks("#FFFFFF")}</g>
</svg>`;

// 2. Large Pixel Wordmark
const pixelLetters = {
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
};

function generateWordmarkSvg(inverted = false) {
  const gradientId = inverted ? "mia-blue-dark" : "mia-blue-light";
  const cells = [];
  Object.entries(pixelLetters).forEach(([letter, rows], letterIndex) => {
    rows.forEach((row, y) => {
      row.split("").forEach((active, x) => {
        if (active === "1") cells.push({ x, y, letter, index: letterIndex });
      });
    });
  });

  const rects = cells
    .map(({ x, y, letter, index }) => {
      const rx = index * 338 + x * 55;
      const ry = y * 27;
      const fill =
        letter === "M"
          ? (inverted ? "#FEFEF7" : "#030302")
          : letter === "I"
          ? "#366CC5"
          : `url(#${gradientId})`;
      return `<rect x="${rx}" y="${ry}" width="49" height="21" fill="${fill}" />`;
    })
    .join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200" width="1000" height="200" fill="none">
  <defs>
    <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#366CC5" />
      <stop offset="0.58" stopColor="#366CC5" />
      <stop offset="1" stopColor="#A9B5B9" />
    </linearGradient>
  </defs>
  <g>${rects}</g>
</svg>`;
}

// 3. 12th Glass (Light) App Icon (512x512)
const logoGlassSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="glassBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.96"/>
      <stop offset="35%" stop-color="#F2F7FD" stop-opacity="0.90"/>
      <stop offset="70%" stop-color="#E2EEFC" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#D0E5FC" stop-opacity="0.85"/>
    </linearGradient>

    <linearGradient id="glassBorder" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="#FFFFFF" stop-opacity="0.60"/>
      <stop offset="100%" stop-color="#9BC4F5" stop-opacity="0.75"/>
    </linearGradient>

    <linearGradient id="glassGloss" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>

    <linearGradient id="blueBlocks" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3A84F7"/>
      <stop offset="50%" stop-color="#2D78EE"/>
      <stop offset="100%" stop-color="#1B63D8"/>
    </linearGradient>

    <filter id="glassOuterShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#366CC5" flood-opacity="0.22"/>
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#0F387A" flood-opacity="0.10"/>
    </filter>

    <filter id="blockSoftShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#1A51B0" flood-opacity="0.26"/>
    </filter>
  </defs>

  <g filter="url(#glassOuterShadow)">
    <rect x="28" y="24" width="456" height="456" rx="108" fill="url(#glassBg)"/>
    <rect x="28" y="24" width="456" height="456" rx="108" stroke="url(#glassBorder)" stroke-width="3"/>
  </g>

  <path d="M 28 132 C 28 65, 80 24, 136 24 L 376 24 C 432 24, 484 65, 484 132 C 484 180, 410 240, 256 240 C 102 240, 28 180, 28 132 Z" fill="url(#glassGloss)" opacity="0.6"/>

  <g filter="url(#blockSoftShadow)">
    ${generateScaledBlocks("url(#blueBlocks)")}
  </g>
</svg>`;

const files = [
  { name: "logo.svg", content: logoSvg, pngWidth: 1120 },
  { name: "logo-dark.svg", content: logoDarkSvg, pngWidth: 1120 },
  { name: "logo-mark.svg", content: logoMarkSvg, pngWidth: 1024 },
  { name: "logo-mark-dark.svg", content: logoMarkDarkSvg, pngWidth: 1024 },
  { name: "mia-wordmark.svg", content: generateWordmarkSvg(false), pngWidth: 2000 },
  { name: "mia-wordmark-dark.svg", content: generateWordmarkSvg(true), pngWidth: 2000 },
  { name: "logo-glass.svg", content: logoGlassSvg, pngWidth: 1024 },
];

async function run() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const file of files) {
    const svgPath = path.join(publicDir, file.name);
    fs.writeFileSync(svgPath, file.content, "utf8");
    console.log(`Saved SVG: ${file.name}`);

    const pngName = file.name.replace(".svg", ".png");
    const pngPath = path.join(publicDir, pngName);
    await sharp(Buffer.from(file.content))
      .resize({ width: file.pngWidth })
      .png()
      .toFile(pngPath);
    console.log(`Rendered PNG: ${pngName}`);
  }
  console.log("All logos successfully generated in public/!");
}

run().catch((err) => {
  console.error("Error generating logos:", err);
  process.exit(1);
});
