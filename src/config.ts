import dotenv from "dotenv";
dotenv.config();

const { token, beta_token, MONGO_URI, WEATHER_API_KEY, DISCORD_CLIENT_ID } = process.env;

if (!token || !beta_token || !MONGO_URI || !WEATHER_API_KEY || !DISCORD_CLIENT_ID) {
    throw new Error("Missing environment variables");
}

export const config = {
    token,
    beta_token,
    MONGO_URI,
    WEATHER_API_KEY,
    DISCORD_CLIENT_ID,
}