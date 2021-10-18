import {SlashCommandBuilder,} from "@discordjs/builders";
import {
    CommandInteraction,
    MessageActionRow,
    MessageSelectMenu,
    SelectMenuInteraction
} from 'discord.js';
import {CommandInterface, InteractionSubHandler, SelectMenuInterface} from "./interactionInterfaces";


export class VertiefungInteraction extends InteractionSubHandler implements CommandInterface, SelectMenuInterface {
    name = 'vertiefung';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('Du kannst hiermit deine Vertiefungrichtung wählen.');

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
        let selected = interaction.values[0];

        this.helper.memberHelper.memberAssignRole(interaction.member, selected)
        await interaction.reply(interaction.member?.user.username + ' setzt ' + selected + ' ein. War das eine gute Wahl?');

    }
}