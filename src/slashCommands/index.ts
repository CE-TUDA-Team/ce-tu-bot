import SlashCommandInterface from "./slashCommandInterface";
import {TestSlashCmd} from "./testSlashCmd";
import {SemesterSlashCommand} from "./semesterSlashCommand";

const slashCommands : SlashCommandInterface[] = [
    new TestSlashCmd(),
    new SemesterSlashCommand(),
];
export default slashCommands;
