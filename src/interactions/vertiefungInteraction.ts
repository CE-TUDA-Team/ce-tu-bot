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
        {value: 'Vertiefung Bauingenieurwesen', label: 'Bauingenieurwesen'},
        {value: 'Vertiefung Computational_Robotics', label: 'Computational_Robotics'},
        {value: 'Vertiefung Elektrotechnik-Informationstechnik', label: 'Elektrotechnik-Informationstechnik'},
        {value: 'Vertiefung Informatik', label: 'Informatik'},
        {value: 'Vertiefung Maschinenbau', label: 'Maschinenbau'},
        {value: 'Vertiefung Mathe-Mechanik', label: 'Mathe-Mechanik'},
        {value: 'Vertiefung Strömung-Verbrennung', label: 'Strömung-Verbrennung'},
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
                    .setMinValues(1).setMaxValues(3),
            );

        await interaction.reply({content: 'Bitte wähle eine Vertiefungsrichtung', components: [row]});
    }

    checkSelect(interaction: SelectMenuInteraction): boolean {
        return interaction.customId === 'vertiefung_SELECT';
    }

    async runSelect(interaction: SelectMenuInteraction): Promise<void> {
        let gmember = this.helper.memberHelper.findGuildMember(interaction.member);
        interaction.values.forEach(selected => this.helper.memberHelper.memberAssignRole(interaction.member, selected))
        let str = interaction.values[0];
        for (let i = 1; i < interaction.values.length; i++) {
            str += ' und ' + interaction.values[i];
        }
        await interaction.reply(`${gmember} setzt ${str} ein. War das eine gute Wahl?`);

    }
}