import dotenv from 'dotenv';
dotenv.config();

const {beta_token, DISCORD_CLIENT_ID } = process.env;

if (!beta_token || !DISCORD_CLIENT_ID) {
    throw new Error('Missing environment variables');
}

export const config = {
    beta_token,
    DISCORD_CLIENT_ID
};