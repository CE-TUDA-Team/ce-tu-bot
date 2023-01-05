import {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, SnowflakeUtil} from "discord.js";
import Helper from "../helpers/helper";
import {PRINT_ROLECALL} from "../config/envConfig";

export async function prepareRolecallChannel(helper: Helper) : Promise<void> {


    let channel = helper.channelHelper.findTextChannelViaId("771327518963793941");


    // DELETE old messages
    let time = Date.now() - 7 * 24 * 60 * 60 * 1000;
    try {
        let messages = await channel?.messages.fetch({
        limit: 50,
        before: SnowflakeUtil.generate(time),
        });
        if (!messages) return;
        await messages.forEach(message => {
            if (message.embeds.length > 0) return;
            if (!message.deleted && message.deletable && message.id) message.delete();
        });
    } catch (e) {}

    // PRINT the interaction buttons
    if(PRINT_ROLECALL) {
        const row1 = new MessageActionRow();
        const row2 = new MessageActionRow();
        const row3 = new MessageActionRow();

        let bsc_buttons = [
            new MessageButton().setCustomId('semester_sem1').setLabel('BSc. 1').setStyle('PRIMARY'),
            new MessageButton().setCustomId('semester_sem2').setLabel('BSc. 2').setStyle('PRIMARY'),
            new MessageButton().setCustomId('semester_sem3').setLabel('BSc. 3').setStyle('PRIMARY'),
            new MessageButton().setCustomId('semester_sem4').setLabel('BSc. 4').setStyle('PRIMARY'),
            new MessageButton().setCustomId('semester_sem5').setLabel('BSc. 5+').setStyle('PRIMARY'),
        ];

        bsc_buttons.forEach(btn => row1.addComponents(btn));
        row2.addComponents(new MessageButton().setCustomId('master_master').setLabel('Master').setStyle('PRIMARY'));
        row2.addComponents(new MessageButton().setCustomId('ehemalig').setLabel('Ehemalig').setStyle('SECONDARY'))


        const embed1 = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('BSc, MSc, OmG')
            .setDescription('Joa, klick mal dahin wo du dich grade so siehst:');
        channel?.send({ embeds: [embed1], components: [row1, row2] })



        let vertiefungsRichtungen: { label: string, value: string }[] = [
            {value: 'Vertiefung Bauingenieurwesen', label: 'Bauingenieurwesen'},
            {value: 'Vertiefung Computational_Robotics', label: 'Computational_Robotics'},
            {value: 'Vertiefung Elektrotechnik-Informationstechnik', label: 'Elektrotechnik-Informationstechnik'},
            {value: 'Vertiefung Informatik', label: 'Informatik'},
            {value: 'Vertiefung Maschinenbau', label: 'Maschinenbau'},
            {value: 'Vertiefung Mathe-Mechanik', label: 'Mathe-Mechanik'},
            {value: 'Vertiefung Strömung-Verbrennung', label: 'Strömung-Verbrennung'},
        ];
        row3.addComponents(new MessageSelectMenu()
            .setCustomId('vertiefung_SELECT')
            .setPlaceholder('Nothing selected')
            .addOptions(vertiefungsRichtungen)
            .setMinValues(1).setMaxValues(1));
        const embed2 = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Die Qual der Wahl')
            .setDescription('Im 4 BSc Semester, sowie im Master wählst du eine Vertiefungsrichtung. Du kannst unten diese auswählen:');
        channel?.send({ embeds: [embed2], components: [row3] })
    }
}