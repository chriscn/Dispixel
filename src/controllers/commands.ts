import { DMChannel, TextChannel } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import { Client } from "hypixel.ts";
import path from "path";
import client from "../index";
import ICommand from "../model/command/command";
import ECommandResult from "../model/command/command-result";

dotenv.config();

const commandRegistry = new Map<string, ICommand>();

const hpToken = process.env.HYPIXEL_API_KEY ?? "";
const regex = /[\\""](.+?)[\\""]|([^ ]+)/ig;
const prefix = process.env.DISCORD_PREFIX ?? "d?";
const hpClient = new Client(hpToken);

gatherAllFiles(path.join(__dirname, "..", "commands"), []).forEach((x) => {
    if (x.endsWith(".map")) { return; }
    const command = require(x);
    registerCommand(new command.default());
});

client.on("message", async (message) => {
    if (!(message.channel instanceof TextChannel || message.channel instanceof DMChannel)) {
        return;
    }

    if (!message.content.startsWith(prefix)) {
        return;
    }

    const messageString = message.content.substr(prefix.length);

    if (messageString.length === 0) {
        return;
    }

    const untrimmedMatches = messageString.match(regex);

    if (untrimmedMatches === null) {
        return;
    }

    const matches: string[] = [];

    untrimmedMatches.forEach((x) => {
        matches.push(x.trim().replace(/\"/g, ""));
    });

    const command = commandRegistry.get(matches[0].toLowerCase());

    if (!command) {
        return;
    }

    const textChannel = message.channel;

    let [error, result] = await handlePromise(command.execute(message, matches.slice(1, matches.length), hpClient));

    if (error) {
        result = ECommandResult.INTERNAL_ERROR;
        console.error(error);
    }

    switch (result) {
        case ECommandResult.NOT_ENOUGH_PERMISSION:
            textChannel.send("You don't have the required permissions to execute this command!");
            break;
        case ECommandResult.INVALID_SYNTAX:
            textChannel.send(
                `The syntax you supplied for the command was incorrect!\n` +
                `The correct syntax is ${prefix + (command.syntax ?? command.name)}\n` +
                `Please do ${prefix + "help " + command.name} for the help about this command.`
            );
            break;
        case ECommandResult.INTERNAL_ERROR:
            textChannel.send("There was an internal error, please contact an administrator.");
            break;
    }
});

function registerCommand(command: ICommand) {
    commandRegistry.set(command.name.toLowerCase(), command);

    if (command.aliases && command.aliases.length !== 0) {
        command.aliases.forEach((x) => {
            if (!commandRegistry.has(x.toLowerCase())) {
                commandRegistry.set(x.toLowerCase(), command);
            }
        });
        console.log(`Registered the command '${command.name}' with the aliases [${command.aliases.join(", ")}].`);
    } else {
        console.log(`Registered the command '${command.name}'.`);
    }
}

function gatherAllFiles(dir: string, fileList: string[]) {
    const files = fs.readdirSync(dir);
    fileList = fileList || [];

    files.forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList = gatherAllFiles(path.join(dir, file), fileList);
        } else {
            fileList.push(path.join(dir, file));
        }
    });

    return fileList;
}

function handlePromise(promise: any) {
    return promise
        .then((res: any) => [null, res])
        .catch((err: any) => [err]);
}

export default commandRegistry;
