import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction, GuildMemberRoleManager} from 'discord.js';
import {CommandInterface} from "./interactionInterfaces";


export class GamingInteraction implements CommandInterface {
    name = 'gaming';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('Bist du ein echter Gamer?');

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === this.name;
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        const serverRoleManager = interaction.guild?.roles
        const memberRoleManager: GuildMemberRoleManager = <GuildMemberRoleManager>interaction.member?.roles;
        if (!memberRoleManager) return Promise.reject('Oh no');

        const gamerRole = serverRoleManager?.cache.find(r => r.name === 'Gaming');
        if(!gamerRole) return Promise.reject('Err');

        if (memberRoleManager.cache.find(r => r.id === gamerRole.id)) {
            await interaction.reply('Du besitzt diese Rolle schon.');
            return;
        }

        await memberRoleManager.add(gamerRole);
        await interaction.reply(interaction.member?.user.username + ' ist ein Gamer.');
    }
}