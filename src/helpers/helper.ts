import ChannelHelper from "./channelHelper";
import {Guild} from "discord.js";
import RoleHelper from "./roleHelper";
import MemberHelper from "./memberHelper";

export default class Helper {
    public channelHelper: ChannelHelper;
    public roleHelper: RoleHelper;
    public memberHelper: MemberHelper;

    constructor(guild: Guild) {
        this.channelHelper = new ChannelHelper(guild);
        this.roleHelper = new RoleHelper(guild);
        this.memberHelper = new MemberHelper(guild);
    }

}