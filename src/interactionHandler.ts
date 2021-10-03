import {buttons, commands} from "./interactions";
import {ButtonInteraction, CommandInteraction, Interaction} from 'discord.js';


export default class InteractionHandler {
    async handleInteraction(interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            const commandInteraction: CommandInteraction = interaction;
            const cmd = commands.find(cmd => cmd.checkCommand(commandInteraction));
            if (!cmd) console.error("Can not find the application command " + commandInteraction.commandName)
            else cmd.runCommand(commandInteraction).catch(()=>commandInteraction.reply('Ein interner Fehler ist aufgetreten :('));

        } else if (interaction.isButton()) {
            const buttonInteraction: ButtonInteraction = interaction;
            const btn = buttons.find(btn => btn.checkButton(buttonInteraction));
            if (!btn) console.error("Can not find the application command " + buttonInteraction.customId)
            else await btn.runButton(buttonInteraction);

        } else if (interaction.isContextMenu()) {
            // ...
        }
    }
}