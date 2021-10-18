import {Guild, GuildMember} from "discord.js";
import {APIInteractionGuildMember} from "discord-api-types";

export default class MemberHelper {
    guild: Guild;

    constructor(guild: Guild) {
        this.guild = guild;
    }

    memberHasRole(member: GuildMember | APIInteractionGuildMember | null, rolename: string): boolean {
        if (!member) return false;
        const role = this.guild.roles.cache.find(role => role.name === rolename);
        if (!role) return false;
        member = <GuildMember>member;
        return !!member.roles.cache.find(r => r.id === role.id);
    }

    memberAssignRole(member: GuildMember | APIInteractionGuildMember | null, rolename: string): void {
        if (!member) return;
        const role = this.guild.roles.cache.find(role => role.name === rolename);
        if (!role) return;
        member = <GuildMember>member;
        member.roles.add(role).then();
    }

    memberRemoveRole(member: GuildMember | APIInteractionGuildMember | null, rolename: string): void {
        if (!member) return;
        const role = this.guild.roles.cache.find(role => role.name === rolename);
        if (!role) return;
        member = <GuildMember>member;
        member.roles.remove(role).then();
    }



}