const crypto = require('crypto');
const express = require('express');
const app = express();

// استفاده از پورتی که هاست Katabump به برنامه اختصاص می‌دهد
const port = process.env.PORT || 3000;

// تابع تولید UUID تصادفی برای کانفیگ
function generateUUID() {
    return crypto.randomUUID();
}

// تابع تولید رشته Vmess
function generateVmessConfig() {
    const uuid = generateUUID();
    const timestamp = Date.now();
    const displayName = `Katabump-Node-${timestamp}`;

    const vmessData = {
        v: "2",
        ps: displayName,
        add: "t.me/SUKOT1344", // آدرس یا پروکسی پشتیبان شما
        port: 443,
        id: uuid,
        aid: "0",
        net: "ws",
        type: "none",
        host: "",
        path: "/v2ray",
        tls: "tls",
        sni: "",
        alpn: "h2,http/1.1",
        allowInsecure: 0
    };

    const jsonString = JSON.stringify(vmessData);
    const base64String = Buffer.from(jsonString).toString('base64');
    return `vmess://${base64String}`;
}

// صفحه اصلی پنل
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="fa" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>پنل مدیریت کانفیگ - کاتابمپ</title>
            <style>
                body { font-family: Tahoma, sans-serif; background: #121212; color: #fff; text-align: center; padding-top: 50px; }
                .box { background: #1e1e1e; padding: 20px; border-radius: 10px; display: inline-block; width: 80%; max-width: 600px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
                a { color: #4CAF50; text-decoration: none; font-size: 18px; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <div class="box">
                <h2>⚡ پنل کاتابمپ با موفقیت فعال شد ⚡</h2>
                <p>برای دریافت کانفیگ اختصاصی خود روی لینک زیر کلیک کنید:</p>
                <br>
                <a href="/get-config" target="_blank">🔗 دریافت لینک کانفیگ (Vmess)</a>
            </div>
        </body>
        </html>
    `);
});

// مسیر دریافت فایل یا JSON کانفیگ
app.get('/get-config', (req, res) => {
    const vmessLink = generateVmessConfig();

    res.json({
        status: "success",
        message: "کانفیگ با موفقیت برای شما آماده شد",
        vmess_link: vmessLink,
        created_at: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
                        
