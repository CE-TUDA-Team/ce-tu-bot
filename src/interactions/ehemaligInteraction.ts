import {SlashCommandBuilder} from "@discordjs/builders";
import {ButtonInteraction, CommandInteraction} from 'discord.js';
import {ButtonInterface, CommandInterface, InteractionSubHandler} from "./interactionInterfaces";


export class EhemaligInteraction extends InteractionSubHandler implements CommandInterface,ButtonInterface{
    name = 'ehemalig';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('Du bist ehemaliger CE Studendierender schnappe dir hier deine Rolle.');

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === 'ehemalig';
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        let roles = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5+', 'Master'];
        let gmember = this.helper.memberHelper.findGuildMember(interaction.member);

        roles.forEach((role) => {
            this.helper.memberHelper.memberRemoveRole(interaction.member, role)
        })

        this.helper.memberHelper.memberAssignRole(interaction.member, 'Ehemalig')
        await interaction.reply(`Okidoki der legandäre ${gmember} ist jetzt am Start.`);
        return;
    }

    checkButton(interaction: ButtonInteraction): boolean {
        return interaction.customId == 'ehemalig';
    }

    runButton(interaction: ButtonInteraction): Promise<void> {
        let gmember = this.helper.memberHelper.findGuildMember(interaction.member);

        this.helper.memberHelper.memberAssignRole(interaction.member,'Ehemalig');
        interaction.reply(`Okidoki der legandäre ${gmember} ist jetzt am Start.`).then();
        return Promise.resolve();
    }
}