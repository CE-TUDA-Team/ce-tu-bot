import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction, GuildMemberRoleManager} from 'discord.js';
import {CommandInterface} from "./interactionInterfaces";


export class MasterInteraction implements CommandInterface {
    name = 'master';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('Hole dir die Masterrolle.')
        .addBooleanOption(option => option.setName('ersti').setRequired(false).setDescription('Bist du im ersten Mastersemester?'));

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === this.name;
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        const ersti = !!interaction.options.getBoolean('ersti', false);
        const serverRoleManager = interaction.guild?.roles;
        const memberRoleManager: GuildMemberRoleManager = <GuildMemberRoleManager>interaction.member?.roles;
        if (!memberRoleManager) return Promise.reject('Oh no');


        const masterRole = serverRoleManager?.cache.find(r => r.name === 'Master');
        const erstiRole = serverRoleManager?.cache.find(r => r.name === 'Ersti');
        if(!erstiRole || !masterRole) return Promise.reject('Err');

        if (memberRoleManager.cache.find(r => r.id === masterRole.id) && !ersti) {
            await interaction.reply('Du besitzt diese Rolle schon.');
            return;
        } else if(memberRoleManager.cache.find(r => r.id === erstiRole.id) && !ersti){
            await memberRoleManager.remove(erstiRole);
            await interaction.reply('Du besitzt kein Ersti mehr.');
            return;
        }

        await memberRoleManager.add(masterRole);
        if (ersti) await memberRoleManager.add(erstiRole);
        await interaction.reply('Willkommen Master of Disaster.');
    }
}