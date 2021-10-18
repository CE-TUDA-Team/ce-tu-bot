import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction, GuildMemberRoleManager} from 'discord.js';
import {CommandInterface, InteractionSubHandler} from "./interactionInterfaces";


export class ErstiInteraction extends InteractionSubHandler implements CommandInterface {
    name = 'ersti';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('todo');

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === this.name;
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        const serverRoleManager = interaction.guild?.roles
        const memberRoleManager: GuildMemberRoleManager = <GuildMemberRoleManager>interaction.member?.roles;
        if (!memberRoleManager) return Promise.reject('Oh no');

        const erstiRole = serverRoleManager?.cache.find(r => r.name === 'Ersti');
        const sem1Role = serverRoleManager?.cache.find(r => r.name === 'Sem1');
        if(!erstiRole || !sem1Role) return Promise.reject('Err');

        if (memberRoleManager.cache.find(r => r.id === erstiRole.id)) {
            await interaction.reply('Du besitzt diese Rolle schon.');
            return;
        }

        await memberRoleManager.add(erstiRole);
        await memberRoleManager.add(sem1Role);
        await interaction.reply('Willkommen auf Computational Engineering, du erhältst alle Erstsemestler Rollen.');
    }
}