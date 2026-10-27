import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const nsisDir = "D:\\Engg.  Project\\Meetly\\MIA\\target\\release\\bundle\\nsis";
const targetDir = path.join(process.cwd(), "public", "downloads");
const fileName = "MIA_0.4.1_x64-setup.exe";

export async function GET(request: NextRequest) {
  try {
    // If running in development / local environment, ensure the latest build is synced
    const localSrc = path.join(nsisDir, fileName);
    const publicDest = path.join(targetDir, fileName);

    if (fs.existsSync(localSrc)) {
      let needsSync = !fs.existsSync(publicDest);
      if (!needsSync) {
        const srcStat = fs.statSync(localSrc);
        const destStat = fs.statSync(publicDest);
        if (destStat.size !== srcStat.size || destStat.mtimeMs < srcStat.mtimeMs) {
          needsSync = true;
        }
      }
      if (needsSync) {
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.copyFileSync(localSrc, publicDest);
      }
    }

    // Redirect to static public URL for optimal static delivery and browser resume support
    const downloadUrl = new URL(`/downloads/${fileName}`, request.url);
    return NextResponse.redirect(downloadUrl, {
      status: 307,
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Download route error:", error);
    return NextResponse.redirect(new URL(`/downloads/${fileName}`, request.url), {
      status: 307,
    });
  }
}
