import Helper from "../helpers/helper";
import {SnowflakeUtil} from "discord.js";

export async function cleanupLogs(helper: Helper): Promise<void> {
    //TODO Cleanup
    let channel = helper.channelHelper.findTextChannelViaId("777301412882939915");
    let time = Date.now() - 3 * 60 * 60 * 1000;
    const subtime = 30 * 24 * 60 * 60 * 1000; //30 days
    try {
        let messages = await channel?.messages.fetch({
            limit: 50,
            before: SnowflakeUtil.generate(time),
            after: SnowflakeUtil.generate(time - subtime + 60 * 1000)
        });
        if (!messages) return;
        await messages.forEach(message => {
            if (message.author.username === 'CE_Bot' && message.content.includes('`Log:`')) {
                if (!message.deleted && message.deletable && message.id) message.delete();
            }
        });

    } catch (e) {
    }

}