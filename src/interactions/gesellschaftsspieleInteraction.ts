import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction} from 'discord.js';
import {CommandInterface, InteractionSubHandler} from "./interactionInterfaces";


export class GesellschaftsspieleInteraction extends InteractionSubHandler implements CommandInterface {
    name = 'gesellschaftsspiele';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('Bist du ein Gesellschaftsspieler?');

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === this.name;
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        if (this.helper.memberHelper.memberHasRole(interaction.member, 'Gesellschaftsspiele')) {
            await interaction.reply('Du besitzt diese Rolle schon.');
            return;
        }

        this.helper.memberHelper.memberAssignRole(interaction.member, 'Gesellschaftsspiele')
        await interaction.reply(interaction.member?.user.username + ' ist ein Gesellschaftsspieler :).');
    }
}