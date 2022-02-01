import {Guild, GuildMember} from "discord.js";
import {APIInteractionGuildMember} from "discord-api-types";

export default class MemberHelper {
    guild: Guild;

    constructor(guild: Guild) {
        this.guild = guild;
    }

    findGuildMember(member: GuildMember | APIInteractionGuildMember | null) : GuildMember | undefined {
        if(!member) return undefined;
        return this.guild.members.cache.find(m => m.id == member.user.id);
    }

    memberHasRole(member: GuildMember | APIInteractionGuildMember | null, rolename: string): boolean {
        if (!member) return false;
        const role = this.guild.roles.cache.find(role => role.name === rolename);
        if (!role) return false;
        let gmember = this.findGuildMember(member);
        if(!gmember) return false;
        return !!gmember.roles.cache.find(r => r.id === role.id);
    }

    memberHasAnyRole(member: GuildMember | APIInteractionGuildMember | null, rolenames: string[]): boolean {
        for (const rolename in rolenames) {
            if(this.memberHasRole(member, rolename)) {
                return true;
            }
        }
        return false;
    }
    memberAssignRole(member: GuildMember | APIInteractionGuildMember | null, rolename: string): void {
        if (!member) return;
        const role = this.guild.roles.cache.find(role => role.name === rolename);
        if (!role) return;
        let gmember = this.findGuildMember(member);
        if(!gmember) return;
        gmember.roles.add(role).then();
    }

    memberRemoveRole(member: GuildMember | APIInteractionGuildMember | null, rolename: string): void {
        if (!member) return;
        const role = this.guild.roles.cache.find(role => role.name === rolename);
        if (!role) return;
        let gmember = this.findGuildMember(member);
        if(!gmember) return;
        if(this.memberHasRole(gmember, rolename))
            gmember.roles.remove(role).then();
    }



}