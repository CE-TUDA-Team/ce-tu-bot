import {ButtonInterface, CommandInterface, SelectMenuInterface} from "./interactionInterfaces";
import {SemesterInteraction} from "./semesterInteraction";
import {AnnouncementInteraction} from "./announcementInteraction";
import {ErstiInteraction} from "./erstiInteraction";
import {VertiefungInteraction} from "./vertiefungInteraction";
import {MasterInteraction} from "./masterInteraction";

export const commands : CommandInterface[] = [
    new SemesterInteraction(),
    new ErstiInteraction(),
    new AnnouncementInteraction(),
    new VertiefungInteraction(),
    new MasterInteraction()
];
export const buttons : ButtonInterface[] = [
    new AnnouncementInteraction(),
];
export const menus : SelectMenuInterface[] =[
    new VertiefungInteraction(),
]


