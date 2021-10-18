import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction} from 'discord.js';
import {CommandInterface, InteractionSubHandler} from "./interactionInterfaces";


export class MasterInteraction extends InteractionSubHandler implements CommandInterface {
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

        if (this.helper.memberHelper.memberHasRole(interaction.member, 'Master') && !ersti) {
            await interaction.reply('Du besitzt diese Rolle schon.');
            return;

        } else if(this.helper.memberHelper.memberHasRole(interaction.member, 'Ersti') && !ersti){

            this.helper.memberHelper.memberRemoveRole(interaction.member, 'Ersti')

            await interaction.reply('Du besitzt kein Ersti mehr.');
            return;
        }

        this.helper.memberHelper.memberAssignRole(interaction.member, 'Master')
        if (ersti) this.helper.memberHelper.memberAssignRole(interaction.member, 'Ersti')
        await interaction.reply('Willkommen Master of Disaster.');
    }
}