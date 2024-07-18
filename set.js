const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUttN2pzbFkycUx0M1pHbHB3aFU2QTloVU9Xd2laQjV3MkxCd2VKV3lFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXZTVkU0TG5COGVIRHpwWmsyV2JQY1pDN0F2alh6dlp4ZG1PU2NoUUhrTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTGNtNUUyaEdpLzJiSGYray8xamtzK1F3K3B6QlJQNk4ySTdQT1orSkhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlS09Ld0F1SXZiVy9FTEtDTmIrWEk3WWIxTFovaU5vL1JWS1ZFeHljMWxVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVNaExpODl3a0MyM2xNOXpwekcybVN0QlRyUFVDa3JrUGtOdlBOb0NXRkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InkxYWFxN0E5Y3ZlQ2VFaytlTzJUVGNTanR6RTViR3F6NS9aVHQzY3hOUVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUl5OWFhYytHZzBvL2M0cWZ6bjdBNzBiblRiMUc5Ry9vVmR5U1BWT2oxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0lIcUd3YWVncWNDVnBwZmFXSjJzeUU0VCtXeVZQbE5TOERpMHErUkx6TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRwajNPNFZEMVdxMW41RjdQeGxaUEJabjNGQm1aK04zVzdlYnkzYVNhNW9tdGNYa2N1djB2c1lrMU11RndqYmY0WlhRc3Y4Ujh2L1dTUk9rZ1V4VUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6Ii9PWk9KMlZsRTZpYmVaV0R4ZklHUWZEYXo2dndTazhpZ09wbkNyT1lsVGc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjc3MzYyNjc3NjhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTcwMzJDNERBNjUzMTVGNjI1RTUyQzBDRThCRDY5NjQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTMyNTY2N31dLCJuZXh0UHJlS2V5SWQiOjYxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6NjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiRkY2aFd6YzNSaHVIUVdEbzNUQXhBQSIsInBob25lSWQiOiJlNWNjZjAxMy0zZTNjLTQ0NGItOTRiOS0zNmYxMTk3MDZiZWYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamdCblFBbmxCbXY4UGhNQVVETlhhdVlHSytFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlR4b0NsOFByVlRiWnptUVFmS3hBNGpCYmpOND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJDQjIzRDYyMiIsIm1lIjp7ImlkIjoiMjc3MzYyNjc3Njg6NjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4oCUU2xhZGXigJQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BXZzVoOFEwYkRsdEFZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlF5RlhvZm0yNENBVFVJK09QaldOZ1BMN0thZU1xQno5OHlYVXBuYUt6UTQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im80YytnNVRESDBqUDZCK2toSUJHUGZhbFlTSnN0ZEdVRmRjRkpxMlBja295Q21lNGl6QkkyUDNtME84MVhmTkdxeGNEQ1FwTE9sT0twaVBmUC91T0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ3bUJlaWJRcC94c1hjSUc4SDFvVXF4aWpTcjJvWXJ2QStLeW9jNEJxbFI4TmdCVzErY01ZL0p6T004MVRtUGRTNWJwdElvdVJ2Tk00ZDRCMEdGZ2FEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NzM2MjY3NzY4OjY5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVNaFY2SDV0dUFnRTFDUGpqNDFqWUR5K3ltbmpLZ2MvZk1sMUtaMmlzME8ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEzMjU2NjIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTnpRIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Tsepo Mohlomi",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "27736267768", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'Tsepo-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "off",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
