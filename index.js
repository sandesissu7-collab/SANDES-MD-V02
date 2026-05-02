const fs = require('fs');
const path = require("path");
const { File } = require("megajs");
const AdmZip = require("adm-zip");

/**
 * 🎀 SANDES-MD AUTO DOWNLOADER 🎀
 */

const downloadAndExtractMegaZip = (megaUrl) => new Promise((resolve, reject) => {
    try {
        console.log("📥 Downloading files from MEGA...");

        const file = File.fromURL(megaUrl);
        const currentDir = process.cwd();
        const zipPath = path.join(currentDir, "bot_files.zip"); 

        file.download((err, data) => {
            if (err) {
                console.error("❌ Download Error:", err);
                return reject(err);
            }

            fs.writeFileSync(zipPath, data);
            
            // Extract කරනවා current directory එකටම
            const zip = new AdmZip(zipPath);
            zip.extractAllTo(currentDir, true);

            // Zip එක වැඩක් නැති නිසා අයින් කරනවා
            fs.unlinkSync(zipPath);

            console.log("✅ Mega files extracted successfully!");
            resolve();
        });
    } catch (error) {
        console.log("❌ Error: " + error);
        reject(error);
    }
});

const startBot = async () => {
    try {
        // --- ඔයාගේ MEGA LINK එක මම මෙතනට දැම්මා ---
        const megaUrl = "https://mega.nz/file/pFtjBLpK#8Wkpmq6Psc4iVvuynHnXfymBedejuWyXW84_x7_oXro"; 

        // 1. කලින්ම Mega එකේ files ටික බාගන්නවා
        await downloadAndExtractMegaZip(megaUrl);

        // 2. දැන් Files ටික තියෙන නිසා Repo එකේ තියෙන start.js එක run කරනවා
        console.log("🚀 Starting Sandes MD via start.js...");
        
        // මේ ෆයිල් එක රෙපෝ එකේ තියෙන නිසා බය නැතුව require කරන්න පුළුවන්
        require("./start.js"); 

    } catch (error) {
        console.error("❌ Failed to start:", error.message);
    }
};

startBot();
