import {ButtonInterface, CommandInterface, SelectMenuInterface} from "./interactionInterfaces";
import {SemesterInteraction} from "./semesterInteraction";
import {AnnouncementInteraction} from "./announcementInteraction";
import {ErstiInteraction} from "./erstiInteraction";
import {VertiefungInteraction} from "./vertiefungInteraction";
import {MasterInteraction} from "./masterInteraction";
import {GamingInteraction} from "./gamingInteraction";
import {GesellschaftsspieleInteraction} from "./gesellschaftsspieleInteraction";
import {TeetrinkerInteraction} from "./teetrinkerInteraction";

export const commands : CommandInterface[] = [
    new SemesterInteraction(),
    new ErstiInteraction(),
    new AnnouncementInteraction(),
    new VertiefungInteraction(),
    new MasterInteraction(),
    new GamingInteraction(),
    new GesellschaftsspieleInteraction(),
    new TeetrinkerInteraction(),
];
export const buttons : ButtonInterface[] = [
    new AnnouncementInteraction(),
];
export const menus : SelectMenuInterface[] =[
    new VertiefungInteraction(),
]


