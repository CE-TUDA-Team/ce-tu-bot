import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const DISCORD_TOKEN = process.env["token"];
export const CLIENT_ID = process.env["client_id"];
export const GUILD_ID = process.env["guild_id"];
