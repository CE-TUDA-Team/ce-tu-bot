import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction} from 'discord.js';
import {CommandInterface, InteractionSubHandler} from "./interactionInterfaces";


export class ErstiInteraction extends InteractionSubHandler implements CommandInterface {
    name = 'ersti';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('B.Sc. Studenten im ersten Semester: schlagt hier zu.');

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === this.name;
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        if (this.helper.memberHelper.memberHasRole(interaction.member, 'Ersti')) {
            await interaction.reply('Du besitzt diese Rolle schon.');
            return;
        }

        this.helper.memberHelper.memberAssignRole(interaction.member, 'Ersti')
        this.helper.memberHelper.memberAssignRole(interaction.member, 'Sem1')

        await interaction.reply('Willkommen auf Computational Engineering, du erhältst alle Erstsemestler Rollen.');
    }
}