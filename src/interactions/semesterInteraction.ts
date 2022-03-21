import {SlashCommandBuilder} from "@discordjs/builders";
import {ButtonInteraction, CommandInteraction} from 'discord.js';
import {ButtonInterface, CommandInterface, InteractionSubHandler} from "./interactionInterfaces";


export class SemesterInteraction extends InteractionSubHandler implements CommandInterface,ButtonInterface{
    name = 'semester';
    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription('Du bist Bachelor Student schnappe dir hier deine Semesterrolle.')
        .addIntegerOption(option => option.setName('nr').setDescription('Wie viele Semester bist du schon am verzweifeln?').setRequired(true));

    checkCommand(interaction: CommandInteraction): boolean {
        return interaction.commandName === 'semester';
    }

    async runCommand(interaction: CommandInteraction): Promise<void> {
        let num = interaction.options.getInteger('nr', true);
        let roles = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5+'];

        if (num <= 0) {
            await interaction.reply('Bitte gib ein Bachelor-Semester ab 1 an.');
            return;
        }
        if (num > 5) {
            num = 5;
        }
        const rolename = roles[num - 1];

        if (this.helper.memberHelper.memberHasRole(interaction.member, rolename)) {
            await interaction.reply('Du besitzt diese Rolle schon.');
            return;
        }

        if(num > 1) {
            this.helper.memberHelper.memberRemoveRole(interaction.member, 'Ersti')
            this.helper.memberHelper.memberAssignRole(interaction.member, rolename)
            await interaction.reply('Yay du hast es bis zum ' + num + '. Semester geschafft.');
            return;
        }

        if(num === 1) {
            this.helper.memberHelper.memberAssignRole(interaction.member, 'Ersti')
            this.helper.memberHelper.memberAssignRole(interaction.member, rolename)
            await interaction.reply('Willkommen auf Computational Engineering, du erhältst alle Erstsemestler Rollen.');
            return;
        }
    }

    mappings = [
        {nr: 1, button_id: 'semester_sem1', role_name: 'Sem1'},
        {nr: 2, button_id: 'semester_sem2', role_name: 'Sem2'},
        {nr: 3, button_id: 'semester_sem3', role_name: 'Sem3'},
        {nr: 4, button_id: 'semester_sem4', role_name: 'Sem4'},
        {nr: 5, button_id: 'semester_sem5', role_name: 'Sem5+'},
    ];

    checkButton(interaction: ButtonInteraction): boolean {
        const buttonsIds = this.mappings.map(obj => obj.button_id);
        return !!buttonsIds.find((id) => id === interaction.customId);
    }

    runButton(interaction: ButtonInteraction): Promise<void> {
        let req_obj = this.mappings.find(obj=> obj.button_id == interaction.customId);
        let notreq_objs = this.mappings.filter(obj => obj.button_id != interaction.customId);
        if (!req_obj) return Promise.reject('Not a correct button');
        let gmember = this.helper.memberHelper.findGuildMember(interaction.member);

        this.helper.memberHelper.memberAssignRole(interaction.member, req_obj.role_name);
        notreq_objs.forEach(obj => this.helper.memberHelper.memberRemoveRole(interaction.member, obj.role_name));
        let num = req_obj.nr;
        if(num === 1) {
            this.helper.memberHelper.memberAssignRole(interaction.member, 'Ersti')
            interaction.reply(`${gmember}: Willkommen auf Computational Engineering, du erhältst alle Erstsemestler Rollen.`);
            return Promise.resolve();
        }
        else {
            this.helper.memberHelper.memberRemoveRole(interaction.member, 'Ersti')
            interaction.reply(`${gmember}: Yay du hast es bis zum ` + num + '. Semester geschafft.');
            return Promise.resolve();
        }

        return Promise.reject('Ah ****');
    }
}