const fs = require('fs');
const path = require("path");
const { File } = require("megajs");
const AdmZip = require("adm-zip");

/**
 * 🎀 SANDES-MD AUTO DOWNLOADER - FIXED URL VERSION 🎀
 */

const downloadAndExtractMegaZip = async (megaUrl) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("📥 Connecting to MEGA...");

            // මෙතනදී URL එක කෙලින්ම File Object එකකට හරවනවා
            const file = File.fromURL(megaUrl);
            const currentDir = process.cwd();
            const zipPath = path.join(currentDir, "bot_files.zip");

            file.download((err, data) => {
                if (err) {
                    return reject(new Error("MEGA Download Failed: " + err.message));
                }

                console.log("📦 Saving downloaded data...");
                fs.writeFileSync(zipPath, data);

                console.log("📂 Extracting files...");
                const zip = new AdmZip(zipPath);
                zip.extractAllTo(currentDir, true);

                fs.unlinkSync(zipPath);
                console.log("✅ Mega files setup complete!");
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    });
};

const startBot = async () => {
    try {
        console.log("--- 🍒 SANDES-MD V2 LOADER ---");

        // URL එක හරියටම තියෙනවා නේද කියලා පරීක්ෂා කරගන්න. 
        // URL එක අන්තිමට තියෙන '#' කෑල්ල නැති වුණොත් තමයි "No Hash" error එක එන්නේ.
        const megaUrl = "https://mega.nz/file/pFtjBLpK#8Wkpmq6Psc4iVvuynHnXfymBedejuWyXW84_x7_oXro";

        await downloadAndExtractMegaZip(megaUrl);

        console.log("🚀 Starting the main bot process...");
        
        // Repo එකේ තියෙන start.js එක call කරනවා
        require("./start.js");

    } catch (error) {
        console.error("❌ CRITICAL ERROR:", error.message);
        // PM2 එක දිගටම restart වෙන එක නවත්තන්න අවුලක් වුණොත් process එක exit කරනවා
        process.exit(1);
    }
};

startBot();
