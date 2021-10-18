import Interactions from "../interactions";
import {ButtonInteraction, CommandInteraction, Interaction, SelectMenuInteraction} from 'discord.js';
import Helper from "../helpers/helper";


export default class InteractionHandler {
    helper: Helper
    interactions: Interactions

    constructor(helper: Helper) {
        this.helper = helper;
        this.interactions = new Interactions(helper);
    }

    async handleInteraction(interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            const commandInteraction: CommandInteraction = interaction;
            const cmd = this.interactions.commands.find(cmd => cmd.checkCommand(commandInteraction));
            if (!cmd) console.error("Can not find the application command " + commandInteraction.commandName)
            else cmd.runCommand(commandInteraction).catch((e) => {
                if (commandInteraction.deferred || commandInteraction.replied) commandInteraction.channel?.send('Ein interner Fehler ist aufgetreten :(');
                else commandInteraction.reply('Ein interner Fehler ist aufgetreten :(');
                console.error(e);
            });

        } else if (interaction.isButton()) {
            const buttonInteraction: ButtonInteraction = interaction;
            const btn = this.interactions.buttons.find(btn => btn.checkButton(buttonInteraction));
            if (!btn) console.error("Can not find the application button " + buttonInteraction.customId);
            else btn.runButton(buttonInteraction).catch((e) => {
                if (buttonInteraction.deferred || buttonInteraction.replied) buttonInteraction.channel?.send('Ein interner Fehler ist aufgetreten :(');
                else buttonInteraction.reply('Ein interner Fehler ist aufgetreten :(');
                console.error(e);
            });

        } else if (interaction.isSelectMenu()) {
            const selectMenuInteraction: SelectMenuInteraction = interaction;
            const menu = this.interactions.menus.find(menu => menu.checkSelect(selectMenuInteraction));
            if (!menu) console.error("Can not find the application select menu " + selectMenuInteraction.customId);
            else menu.runSelect(interaction).catch((e) => {
                if (selectMenuInteraction.deferred || selectMenuInteraction.replied) selectMenuInteraction.channel?.send('Ein interner Fehler ist aufgetreten :(');
                else selectMenuInteraction.reply('Ein interner Fehler ist aufgetreten :(');
                console.error(e);
            });
        }
    }
}