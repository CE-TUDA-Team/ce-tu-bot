import {SlashCommandBuilder} from "@discordjs/builders";
import {
    ButtonInteraction, CommandInteraction, Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed
} from 'discord.js';
import {ButtonInterface, CommandInterface, InteractionSubHandler} from "./interactionInterfaces";

export class AnnouncementInteraction extends InteractionSubHandler implements CommandInterface, ButtonInterface {
    data = new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('Command nur für Nudeln. Schreibe vorher eine Nachricht die du publizieren willst.')
        .addStringOption(option => option.setName('title').setDescription('Der Titel').setRequired(true))
        //.addStringOption(option => option.setName('message').setDescription('Die Massage (äh warte).').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('Chantal wähle eine Channel.').setRequired(true))
        .addStringOption(option => option.setName('url').setDescription('Ne ordendliche URL (http://....)').setRequired(false));

    //.addBooleanOption(option => option.setName('fachschaft').setDescription('...').setRequired(false))

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === 'announcement';
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {

        const title = interaction.options.getString('title', true);
        const lastMessage = await this.helper.channelHelper.findLastMessageOfMemberInChannel(interaction.channel?.id, interaction.member);
        const message = lastMessage?.content;//interaction.options.getString('message', true);
        if (!lastMessage || !message) {
            await interaction.reply({
                content: 'Huch ich sende immer deine letzte Nachricht, aber ich konnte keine aktuelle finden.',
                ephemeral: true
            });
            return;
        }

        const url = interaction.options.getString('url', false);
        const channel = interaction.options.getChannel('channel', false);

        const hasRole = this.helper.memberHelper.memberHasAnyRole(interaction.member, ['Team', 'Fachschaft', 'Fachschaftsrat', 'wimi_announcements']);

        if (!hasRole) {
            await interaction.reply({
                content: 'Huch du bist keine Nudel. Die CE Polizei ist alarmiert.',
                ephemeral: true
            });
            return;
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('announcement_BTN_send')
                    .setLabel('Senden')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('announcement_BTN_notsend')
                    .setLabel('Nicht senden')
                    .setStyle('DANGER'),
            );
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(title)
            .setDescription(message);
        if (url) embed.setURL(url);
        if (channel) embed.setFooter('channel=' + channel.id)
        await interaction.reply({
            content: 'Bidde eimal checken, ob ich das WIRKLICH so senden soll.',
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
        try {
            await lastMessage.delete();
        } catch (e) {}
    }

    checkButton(interaction: ButtonInteraction): boolean {
        const buttonsIds = ['announcement_BTN_send', 'announcement_BTN_notsend']
        return !!buttonsIds.find((id) => id === interaction.customId);
    }

    async runButton(interaction: ButtonInteraction): Promise<void> {
        if (interaction.customId === 'announcement_BTN_notsend') {
            const prevMessage: Message = <Message>interaction.message;
            await interaction.reply({content: 'Not send!', ephemeral: true});
            //TODO: delete message
            return;
        }
        if (interaction.customId === 'announcement_BTN_send') {
            const prevMessage: Message = <Message>interaction.message;
            let prevEmbed = prevMessage.embeds[0];
            const channel = prevEmbed.footer ? this.helper.channelHelper.findChannelViaId(prevEmbed.footer?.text?.replace('channel=', '')) : interaction.channel ;
            prevEmbed = prevMessage.embeds[0].setFooter('');
            if (channel?.isText()) {
                channel?.send({embeds: [prevEmbed]});
                await interaction.reply({content: 'Ok dann habe ich die Brieftauben losgeschickt.', ephemeral: true});
            } else await interaction.reply({content: 'Chantal konnte den richtigen Channel nicht finden.', ephemeral: true});
            //TODO: delete message
            return;
        }
        return Promise.reject("Can't handle")
    }

}
