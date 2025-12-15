const ftp = require("basic-ftp");
const path = require("path");

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    const config = {
        host: "ftp.islamkortam.com",
        user: "info@zynk-adv.com",
        password: "Koto#Koto12", // <--- ضع كلمة المرور هنا
        port: 21,
        secure: false // غيّر إلى true إذا كان السيرفر يدعم FTPS بشكل إجباري
    };

    try {
        console.log("Connecting to FTP...");
        await client.access(config);

        console.log("Uploading files...");
        
        // القائمة السوداء للملفات والمجلدات التي لا نريد رفعها
        const exclude = [
            "node_modules",
            ".git",
            ".vscode",
            ".env",
            "deploy-ftp.js",
            "zynk webstie.zip"
        ];

        // رفع المجلد الحالي بالكامل مع استثناء القائمة أعلاه
        // تأكد من أن المسار البعيد (remote path) صحيح، عادة يكون public_html أو مجلد فرعي
        await client.ensureDir("public_html"); // <--- تأكد من هذا المسار على السيرفر
        
        await client.uploadFromDir(".", "app.", {
            filter: (fileName, filePath) => {
                // التحقق مما إذا كان الملف أو المجلد يجب استثناؤه
                const relativePath = path.relative(".", filePath);
                const rootDir = relativePath.split(path.sep)[0];
                
                if (exclude.includes(rootDir) || exclude.includes(fileName)) {
                    return false;
                }
                return true;
            }
        });

        console.log("Deployment completed successfully!");
    } catch (err) {
        console.error("Deployment failed:", err);
    }
    client.close();
}

deploy();
