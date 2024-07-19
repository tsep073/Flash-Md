const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU9xZXZGMy9lSG5ZY0hlUVYyazMraEcwWGlOWTNJSngyRU1KTnE1RlFVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0ZIMHk1K2dVaEhUS0w1dVc0d1ZHVHRXQkpOTy9MWitReGZUeEFURWxqUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTRm5JdHovckF5anZmUE94b3VRbUlHRmErVFozMmc1V0s5RkZyZExndUhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTR1MvUDdsZ1NPRHdaWTFweDF4SWZEM3poWlFaQkwwQWc0U05GTzQ0aTM4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdBRVpqUi83YjRZcm12NVpTazlLVGZhNTFsVVNFY0dRU01HY3FNTFY2V1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjB5MTdxbEU5d0xIckFQODN0N0crcTJMcXFtRytwcnpHVCtvQUdidmRYbG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0pBYUJkK1JpQ3crMU9NLzV2NWl4UWgzTnVQdDhKcEhLMEZuSWVLOWRWdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHF3QVM0bmJIUXpGU095WStYMkVMbXc1QW1JUGVDWldOOEtKTDA1WmlHYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imc2QlJtb1B1enZITld0T0dHYkZFTzRndTdSbk9wT0tpK1dhTzlqRXdEc2IyWW5vSXkwRFFOb2JOLzFKSTk4blpRUExya1J5OEF5Q08vQytjZkJsS0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzksImFkdlNlY3JldEtleSI6IkxyZ0V0UFNuV29NYmRzZXVCUlpMQjBIWDNLakR3cWpXdnBSUkJuOHBISTA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik5BWnJndHgwU0J1UWFaX3U0V0ZHelEiLCJwaG9uZUlkIjoiMGZlMGUzZDgtN2JjMS00MmY3LTllMGMtMDNkMGI4NDZjNTRiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFPOUZSSkpRN0tyNDAxVUFnWXdlNm5VbkRHdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5ZDBzZWRnZTRiZXNTY3NQREg0TXcwNEVsNE09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQkNNVFpQWkwiLCJtZSI6eyJpZCI6IjI3NzM2MjY3NzY4OjcyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKAlFNsYWRl4oCUIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQYWc1aDhRdFpMbnRBWVlBaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJReUZYb2ZtMjRDQVRVSStPUGpXTmdQTDdLYWVNcUJ6OTh5WFVwbmFLelE0PSIsImFjY291bnRTaWduYXR1cmUiOiI2dStucVFPWnJKMnF2aFQzc2d0aDl2N3VyaDhabjFuYWh0cmlpdkxqZjhXTEM1NVVnaEJFUkVENU1UUVdHcG5OWWFlMXZici94czBjaW55K0ZLUDdEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTXh1MWg3RUNSQjdyemZ2cC9hdHFmdzNoZ0hjZ2VvUytDeG9SUVhhZjR6RGxVN2tQUmxhTGxWeWRWNU9meno2TlUrNUY2eDRyUlAvN2ZBU1BsL3Q2QVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzczNjI2Nzc2ODo3MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVTWhWNkg1dHVBZ0UxQ1BqajQxallEeSt5bW5qS2djL2ZNbDFLWjJpczBPIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMzU0NTYzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUExeiJ9',
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
    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
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
