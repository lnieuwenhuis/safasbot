import { Collection } from "discord.js";

declare module "discord.js" {
    export interface Client {
        commands: Collection<any, any>;
        commandArray: any[];
        handleEvents: () => void;
        handleCommands: () => void;
    }
    export interface client {
        commands: Collection<any, any>;
        commandArray: any[];
        handleEvents: () => void;
        handleCommands: () => void;
    }
}