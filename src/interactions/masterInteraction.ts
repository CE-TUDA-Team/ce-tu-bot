import {SlashCommandBuilder} from "@discordjs/builders";
import {ButtonInteraction, CommandInteraction} from 'discord.js';
import {ButtonInterface, CommandInterface, InteractionSubHandler} from "./interactionInterfaces";


export class MasterInteraction extends InteractionSubHandler implements CommandInterface, ButtonInterface {
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
        let gmember = this.helper.memberHelper.findGuildMember(interaction.member);

        if (this.helper.memberHelper.memberHasRole(interaction.member, 'Master') && !ersti) {
            await interaction.reply(`${gmember}: Du besitzt diese Rolle schon.`);
            return;

        } else if(this.helper.memberHelper.memberHasRole(interaction.member, 'Ersti') && !ersti){

            this.helper.memberHelper.memberRemoveRole(interaction.member, 'Ersti')

            await interaction.reply(`${gmember}: Du besitzt kein Ersti mehr.`);
            return;
        }

        this.helper.memberHelper.memberAssignRole(interaction.member, 'Master')

        if (ersti) this.helper.memberHelper.memberAssignRole(interaction.member, 'Ersti')
        await interaction.reply(`${gmember}: Willkommen Master of Disaster.`);
    }

    checkButton(interaction: ButtonInteraction): boolean {
        return interaction.customId === 'master_master';
    }

    runButton(interaction: ButtonInteraction): Promise<void> {
        let gmember = this.helper.memberHelper.findGuildMember(interaction.member);
        this.helper.memberHelper.memberAssignRole(interaction.member, 'Master');
        interaction.reply(`${gmember}: Willkommen Master of Disaster.`);
        return Promise.resolve();
    }
}