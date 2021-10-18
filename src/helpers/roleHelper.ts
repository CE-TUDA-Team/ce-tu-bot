import {Guild} from "discord.js";

export default class RoleHelper {
    guild: Guild;

    constructor(guild: Guild) {
        this.guild = guild;
    }

}