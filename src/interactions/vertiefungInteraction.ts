import {SlashCommandBuilder,} from "@discordjs/builders";
import {
    CommandInteraction,
    GuildMemberRoleManager,
    MessageActionRow,
    MessageSelectMenu,
    SelectMenuInteraction
} from 'discord.js';
import {CommandInterface, SelectMenuInterface} from "./interactionInterfaces";


export class VertiefungInteraction implements CommandInterface, SelectMenuInterface {
    name = 'vertiefung';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('todo');

    vertiefungsRichtungen: { label: string, value: string }[] = [
        {value: 'BI', label: 'Vertiefung Bauingenieurwesen'},
        {value: 'CR', label: 'Vertiefung Computational_Robotics'},
        {value: 'ETIT', label: 'Vertiefung Elektrotechnik-Informationstechnik'},
        {value: 'INFO', label: 'Vertiefung Informatik'},
        {value: 'MB', label: 'Vertiefung Maschinenbau'},
        {value: 'MM', label: 'Vertiefung Mathe/Mechanik'},
        {value: 'SV', label: 'Vertiefung Strömung-Verbrennung'},
    ];

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === this.name;
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('vertiefung_SELECT')
                    .setPlaceholder('Nothing selected')
                    .addOptions(this.vertiefungsRichtungen)
                    .setMinValues(1).setMaxValues(1),
            );

        await interaction.reply({content: 'Bitte wähle eine Vertiefungsrichtung', components: [row]});
    }

    checkSelect(interaction: SelectMenuInteraction): boolean {
        return interaction.customId === 'vertiefung_SELECT';
    }

    async runSelect(interaction: SelectMenuInteraction): Promise<void> {
        const serverRoleManager = interaction.guild?.roles
        const memberRoleManager: GuildMemberRoleManager = <GuildMemberRoleManager>interaction.member?.roles;
        if (!memberRoleManager) return Promise.reject('Oh no');

        let selected = interaction.values[0];
        let role = serverRoleManager?.cache.find(r => r.name === this.vertiefungsRichtungen.find(vr => vr.value === selected)?.label);
        if (!role) return Promise.reject('Oh no');

        await memberRoleManager.add(role);
        await interaction.reply('Rolle hinzugefügt.');

    }
}