import slashCommands from "./slashCommands";
import {ButtonInteraction, CommandInteraction, Interaction} from 'discord.js';


export default class InteractionHandler {
    async handleInteraction(interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            const commandInteraction: CommandInteraction = interaction;
            const cmd = slashCommands.find(cmd => commandInteraction.commandName === cmd.name);
            if (!cmd) {
                console.error("Can not find the application command " + commandInteraction.commandName)
            } else {
                //await commandInteraction.deferReply({ ephemeral: cmd.isPrivateCommand });
                await cmd.run(commandInteraction);
            }
        } else if (interaction.isButton()){
            const buttonInteraction : ButtonInteraction = interaction;
            // TODO ... put cmd and button handlers better together
        }
    }
}