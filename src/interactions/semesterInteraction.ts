import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction, GuildMemberRoleManager} from 'discord.js';
import {CommandInterface} from "./interactionInterfaces";


export class SemesterInteraction implements CommandInterface {
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
        const serverRoleManager = interaction.guild?.roles
        const role = serverRoleManager?.cache?.find(r => r.name === rolename);
        if (!role) return Promise.reject('Oh no');
        const memberRoleManager: GuildMemberRoleManager = <GuildMemberRoleManager>interaction.member?.roles;
        if (!memberRoleManager) return Promise.reject('Oh no');

        if (memberRoleManager.cache.find(r => r.id === role.id)) {
            await interaction.reply('Du besitzt diese Rolle schon.');
            return;
        }

        if(num > 1) {
            const erstiRole = memberRoleManager.cache.find(r => r.name === 'Ersti');
            if (erstiRole)  await memberRoleManager.remove(erstiRole);
            await memberRoleManager.add(role);
            await interaction.reply('Yay du hast es bis zum ' + num + '. Semester geschafft.');
            return;
        }

        if(num === 1) {
            const erstiRole = serverRoleManager?.cache.find(r => r.name === 'Ersti');
            if (erstiRole)  await memberRoleManager.add(erstiRole);
            await memberRoleManager.add(role);
            await interaction.reply('Willkommen auf Computational Engineering, du erhältst alle Erstsemestler Rollen.');
            return;
        }
    }
}