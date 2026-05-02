const fs = require('fs');
const path = require("path");
const { File } = require("megajs");
const AdmZip = require("adm-zip");

const downloadAndExtractMegaZip = (megaUrl) => new Promise((resolve, reject) => {
    try {
        console.log("Downloading Files 📥");

        const file = File.fromURL(megaUrl);
        const currentDir = process.cwd();
        const zipPath = path.join(currentDir, "bot.zip"); 

        file.download((err, data) => {
            if (err) {
                console.error("Download Error:", err);
                return reject(err);
            }

            fs.writeFileSync(zipPath, data);

            const zip = new AdmZip(zipPath);
            zip.extractAllTo(currentDir, true);

            fs.unlinkSync(zipPath);

            console.log("Successfully files downloaded and extracted ✅");
            resolve();
        });
    } catch (error) {
        console.log("❌ Error in download process: " + error);
        reject(error);
    }
});

const runFilesSandes = async () => {
    try {
        // --- මෙතනට ඔයාගේ MEGA LINK එක දාන්න ---
        const megaUrl = "https://mega.nz/file/pFtjBLpK#8Wkpmq6Psc4iVvuynHnXfymBedejuWyXW84_x7_oXro"; 

        if (!megaUrl || megaUrl.includes("https://mega.nz/file/pFtjBLpK#8Wkpmq6Psc4iVvuynHnXfymBedejuWyXW84_x7_oXro")) {
            console.error("Error: කරුණාකර MEGA URL එක ඇතුලත් කරන්න!");
            return;
        }

        await downloadAndExtractMegaZip(megaUrl);

        console.log("Starting the bot... 🚀");
        require("./start.js"); 
        
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
};

runFilesSandes();
