const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "..", "public");

// 1. Pixel mark grid rects
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

// 2. Full Horizontal Lockup (Light)
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" width="280" height="64" fill="none">
  <!-- Brand Icon Badge -->
  <rect x="0" y="0" width="64" height="64" rx="10" fill="#366CC5"/>
  <g>
    ${generateMarkSvgInner("#FEFEF7")}
  </g>
  <!-- Brand Text -->
  <text x="82" y="44" font-family="'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="-0.06em">
    <tspan fill="#030302">MIA</tspan>
    <tspan fill="#AF140B" dx="3">/</tspan>
  </text>
</svg>`;

// 3. Full Horizontal Lockup (Dark)
const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" width="280" height="64" fill="none">
  <!-- Brand Icon Badge -->
  <rect x="0" y="0" width="64" height="64" rx="10" fill="#366CC5"/>
  <g>
    ${generateMarkSvgInner("#FEFEF7")}
  </g>
  <!-- Brand Text -->
  <text x="82" y="44" font-family="'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="-0.06em">
    <tspan fill="#FEFEF7">MIA</tspan>
    <tspan fill="#AF140B" dx="3">/</tspan>
  </text>
</svg>`;

// 4. Standalone Blue App Icon (512x512)
const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512">
  <rect width="64" height="64" rx="12" fill="#366CC5"/>
  <g>
    ${generateMarkSvgInner("#FEFEF7")}
  </g>
</svg>`;

// 5. Standalone Dark App Icon (512x512)
const logoMarkDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512">
  <rect width="64" height="64" rx="12" fill="#030302"/>
  <g>
    ${generateMarkSvgInner("#FEFEF7")}
  </g>
</svg>`;

// 6. Large Pixel Wordmark
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
  <g>
    ${rects}
  </g>
</svg>`;
}

const miaWordmarkSvg = generateWordmarkSvg(false);
const miaWordmarkDarkSvg = generateWordmarkSvg(true);

const files = [
  { name: "logo.svg", content: logoSvg, pngWidth: 1120 },
  { name: "logo-dark.svg", content: logoDarkSvg, pngWidth: 1120 },
  { name: "logo-mark.svg", content: logoMarkSvg, pngWidth: 1024 },
  { name: "logo-mark-dark.svg", content: logoMarkDarkSvg, pngWidth: 1024 },
  { name: "mia-wordmark.svg", content: miaWordmarkSvg, pngWidth: 2000 },
  { name: "mia-wordmark-dark.svg", content: miaWordmarkDarkSvg, pngWidth: 2000 },
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

