const fs = require("fs");
const path = require("path");

const nsisDir = "D:\\Engg.  Project\\Meetly\\MIA\\target\\release\\bundle\\nsis";
const targetDir = path.join(__dirname, "..", "public", "downloads");

function sync() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (!fs.existsSync(nsisDir)) {
    console.log(`[sync-installer] NSIS directory not found at: ${nsisDir}`);
    return;
  }

  const files = fs.readdirSync(nsisDir).filter((f) => f.endsWith(".exe"));
  if (files.length === 0) {
    console.log(`[sync-installer] No .exe setup files found in ${nsisDir}`);
    return;
  }

  for (const file of files) {
    const srcPath = path.join(nsisDir, file);
    const destPath = path.join(targetDir, file);
    const srcStat = fs.statSync(srcPath);

    let needsCopy = true;
    if (fs.existsSync(destPath)) {
      const destStat = fs.statSync(destPath);
      if (destStat.size === srcStat.size && destStat.mtimeMs >= srcStat.mtimeMs) {
        needsCopy = false;
      }
    }

    if (needsCopy) {
      console.log(
        `[sync-installer] Copying ${file} (${(srcStat.size / (1024 * 1024)).toFixed(1)} MB)...`
      );
      fs.copyFileSync(srcPath, destPath);
      console.log(`[sync-installer] Successfully synced ${file} to public/downloads/`);
    } else {
      console.log(`[sync-installer] ${file} is already up to date in public/downloads/ (${(srcStat.size / (1024 * 1024)).toFixed(1)} MB)`);
    }
  }
}

sync();
