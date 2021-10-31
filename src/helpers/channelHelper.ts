import {Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, ThreadChannel} from "discord.js";
import {APIInteractionGuildMember} from "discord-api-types";

export default class ChannelHelper {
    guild: Guild;

    constructor(guild: Guild) {
        this.guild = guild;
    }

    findChannelViaName(name: string | undefined): Channel | undefined {
        return this.guild.channels.cache.find(channel => channel.name === name);
    }

    findChannelViaId(id: string | undefined): Channel | undefined {
        return this.guild.channels.cache.find(channel => channel.id === id);
    }

    findTextChannelViaId(id: string | undefined): TextChannel | ThreadChannel | DMChannel | NewsChannel | undefined {
        let channel = this.findChannelViaId(id);
        if (channel?.isText()) return channel;
        return undefined;
    }

    async findLastMessageOfMemberInChannel(channel_id: string | undefined, member: GuildMember | APIInteractionGuildMember | null): Promise<Message | undefined> {
        let channel = this.findTextChannelViaId(channel_id);
        await channel?.messages.fetch();
        return channel?.messages.cache
            .filter(postMessage => postMessage.author.id == member?.user.id)
            .sort((postMessage1, postMessage2) => postMessage1.createdTimestamp - postMessage2.createdTimestamp)
            .last();
    }

    sendLogMessage(message: string): void {
        console.log(message);
        this.findTextChannelViaId("777301412882939915")?.send({content: '`Log:` '+ message});
    }
}