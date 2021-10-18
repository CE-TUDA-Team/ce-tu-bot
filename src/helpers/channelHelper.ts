import {Channel, DMChannel, Guild, NewsChannel, TextChannel, ThreadChannel} from "discord.js";

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
}