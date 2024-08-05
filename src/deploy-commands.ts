import { REST, Routes } from "discord.js";
import { config } from "./config";
import {commands} from "./commands/index";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.token);

export async function deployCommands() {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationCommands(config.DISCORD_CLIENT_ID),
            { body: commandsData },
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
}