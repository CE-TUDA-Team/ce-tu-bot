import SlashCommandInterface from "./slashCommandInterface";
import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction, GuildMemberRoleManager} from 'discord.js';

export class SemesterSlashCommand implements SlashCommandInterface {
    name = 'semester';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('todo')
        .addIntegerOption(option => option.setName('nr').setDescription('todo').setRequired(true));

    async run(interaction: CommandInteraction): Promise<void> {
        let num = interaction.options.getInteger('nr',true);
        let roles = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5+'];

        if (num<=0){
            await interaction.reply('Bitte gib ein Bachelor-Semester ab 1 an.');
            return;
        }
        if(num>5){
            num = 5;
        }
        const rolename = roles[num-1];
        const role = interaction.guild?.roles.cache?.find(r => r.name === rolename);
        if(!role) return; // not good
        const member = interaction.member;
        if(!member) return; // not good
        const roleManager: GuildMemberRoleManager  = <GuildMemberRoleManager>member.roles;

        if(roleManager.cache.find(r =>r.id === role.id)){
             await interaction.reply('Du besitzt diese Rolle schon.');
            return;
        }

        await roleManager.add(role);
        await interaction.reply('Du erhälst die Rolle: ' + rolename);

    }

}