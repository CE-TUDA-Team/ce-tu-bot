import Command from "./commandInterface";
import {Message} from "discord.js";

export class NoCommand implements Command{
    commandNames = ["no_command"];

    help(commandPrefix: string): string {
        return "";
    }

    run(parsedUserCommand: Message): Promise<void> {
        return Promise.resolve(undefined);
    }

}