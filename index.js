const fs = require('fs');
const path = require("path");
const { File } = require("megajs");
const AdmZip = require("adm-zip");
const axios = require("axios");

const downloadAndExtractMegaZip = (megaUrl) => new Promise((resolve, reject) => {
    try {
        console.log("Downloading Files 📥");

        const file = File.fromURL(megaUrl);
        const currentDir = process.cwd();
        const zipPath = path.join(currentDir, "bot.zip"); // මෙතනට මෙගා එකට අප්ලෝඩ් කරපු file එකෙ file name එක දාහම්

        file.download((err, data) => {
            if (err) return reject(err);

            fs.writeFileSync(zipPath, data);

            const zip = new AdmZip(zipPath);
            zip.extractAllTo(currentDir, true);

            fs.unlinkSync(zipPath);

            console.log("Successfully files downloaded and extracted ✅");
            resolve()
        });
    } catch (error) {
        console.log("❌ " + error)
        reject(error)
}});

const runFilesSandes = async () => {
    try {
        console.log("Fetching data...🚀");

        const response = await axios.get("https://raw.githubusercontent.com/issu478/Iwwe/refs/heads/main/bot.json"); // මෙතනට git hub raw json file link එක දාහම් සුද්දා
        const { zip: zipUrl } = response.data;

        await downloadAndExtractMegaZip(zipUrl);

        require("./start.js"); // read කරන්න ඕන file එකෙ file name එක දාහම්

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
};


runFilesSandes(); // බඩු වැඩ කරයි දැන් 😉

