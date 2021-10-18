import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction} from 'discord.js';
import {CommandInterface, InteractionSubHandler} from "./interactionInterfaces";


export class SemesterInteraction extends InteractionSubHandler implements CommandInterface {
    name = 'semester';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('Du bist Bachelor Student schnappe dir hier deine Semesterrolle.')
        .addIntegerOption(option => option.setName('nr').setDescription('Wie viele Semester bist du schon am verzweifeln?').setRequired(true));

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === 'semester';
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        let num = interaction.options.getInteger('nr', true);
        let roles = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5+'];

        if (num <= 0) {
            await interaction.reply('Bitte gib ein Bachelor-Semester ab 1 an.');
            return;
        }
        if (num > 5) {
            num = 5;
        }
        const rolename = roles[num - 1];

        if (this.helper.memberHelper.memberHasRole(interaction.member, rolename)) {
            await interaction.reply('Du besitzt diese Rolle schon.');
            return;
        }

        if(num > 1) {
            this.helper.memberHelper.memberRemoveRole(interaction.member, 'Ersti')
            this.helper.memberHelper.memberAssignRole(interaction.member, rolename)
            await interaction.reply('Yay du hast es bis zum ' + num + '. Semester geschafft.');
            return;
        }

        if(num === 1) {
            this.helper.memberHelper.memberAssignRole(interaction.member, 'Ersti')
            this.helper.memberHelper.memberAssignRole(interaction.member, rolename)
            await interaction.reply('Willkommen auf Computational Engineering, du erhältst alle Erstsemestler Rollen.');
            return;
        }
    }
}