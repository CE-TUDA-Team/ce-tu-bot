import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction} from 'discord.js';
import {CommandInterface, InteractionSubHandler} from "./interactionInterfaces";


export class TeetrinkerInteraction extends InteractionSubHandler implements CommandInterface {
    name = 'teetrinker';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('Bist du ein Teetrinker?');

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === this.name;
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        if (this.helper.memberHelper.memberHasRole(interaction.member, 'Teetrinker')) {
            await interaction.reply('Du besitzt diese Rolle schon.');
            return;
        }

        this.helper.memberHelper.memberAssignRole(interaction.member, 'Teetrinker')
        await interaction.reply(interaction.member?.user.username + ' ist ein Teetrinker.');
    }
}