import { TextChannel } from "discord.js";
import fs from "fs";
import { Client } from "hypixel.ts";
import path from "path";
import client from "../index";
import ICommand from "../model/command/command";
import ECommandResult from "../model/command/command-result";

const commandRegistry = new Map<string, ICommand>();

const hpToken = process.env.HYPIXEL_API_KEY || "";
const regex = /[\\""](.+?)[\\""]|([^ ]+)/ig;
const prefix = "?";
const hpClient = new Client(hpToken);

gatherAllFiles(path.join(__dirname, "..", "commands"), []).forEach((x) => {
    if (x.endsWith(".map")) { return; }
    const command = require(x);
    registerCommand(new command.default());
});

client.on("message", async (message) => {
    if (!(message.channel instanceof TextChannel)) {
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

    // tslint:disable-next-line:prefer-const
    let [resultErr, result] = await hP(command.execute(
        message.member,
        textChannel,
        matches.slice(1, matches.length),
        hpClient
    ));
    if (resultErr) { result = ECommandResult.INTERNAL_ERROR; }

    switch (result) {
        case ECommandResult.NOT_ENOUGH_PERMISSION:
            textChannel.send("You don't have the required permissions to execute this command!");
            break;
        case ECommandResult.INVALID_SYNTAX:
            textChannel.send(
                `The syntax you supplied for the command was incorrect!\n` +
                `Please do ${prefix + "help " + command.name} for the proper usage of this command.`
            );
            break;
        case ECommandResult.INTERNAL_ERROR:
            textChannel.send("There was an internal error, please contact an administrator.");
            break;
    }
});

function registerCommand(command: ICommand) {
    commandRegistry.set(command.name.toLowerCase(), command);

    if (command.aliases) {
        command.aliases.forEach((x) => {
            if (!commandRegistry.has(x.toLowerCase())) {
                commandRegistry.set(x.toLowerCase(), command);
                console.log(`Registered the command '${command.name}' with the alias '${x}'.`);
            }
        });
    } else {
        console.log(`Registered the command '${command.name}'.`);
    }
}

function gatherAllFiles(dir: string, filelist: string[]) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];

    files.forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = gatherAllFiles(path.join(dir, file), filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    });

    return filelist;
}

function hP(promise: any) {
    return promise
        .then((res: any) => [null, res])
        .catch((err: any) => [err]);
}

export default commandRegistry;
