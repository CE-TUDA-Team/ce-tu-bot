import {ButtonInterface, CommandInterface, SelectMenuInterface} from "./interactionInterfaces";
import {SemesterInteraction} from "./semesterInteraction";
import {AnnouncementInteraction} from "./announcementInteraction";
import {ErstiInteraction} from "./erstiInteraction";
import {VertiefungInteraction} from "./vertiefungInteraction";
import {MasterInteraction} from "./masterInteraction";
import {GamingInteraction} from "./gamingInteraction";
import {GesellschaftsspieleInteraction} from "./gesellschaftsspieleInteraction";
import {TeetrinkerInteraction} from "./teetrinkerInteraction";
import Helper from "../helpers/helper";

export default class Interactions {
    public helper: Helper;
    public commands: CommandInterface[];
    public buttons: ButtonInterface[];
    public menus: SelectMenuInterface[];

    constructor(helper: Helper) {
        this.helper = helper;
        this.commands = [
            new SemesterInteraction(this.helper),
            new ErstiInteraction(this.helper),
            new AnnouncementInteraction(this.helper),
            new VertiefungInteraction(this.helper),
            new MasterInteraction(this.helper),
            new GamingInteraction(this.helper),
            new GesellschaftsspieleInteraction(this.helper),
            new TeetrinkerInteraction(this.helper),
        ];
        this.buttons = [
            new AnnouncementInteraction(this.helper),
        ];
        this.menus = [
            new VertiefungInteraction(this.helper),
        ]
    }
}