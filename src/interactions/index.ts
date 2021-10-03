import {ButtonInterface, CommandInterface, SelectMenuInterface} from "./interactionInterfaces";
import {SemesterInteraction} from "./semesterInteraction";
import {AnnouncementInteraction} from "./announcementInteraction";
import {ErstiInteraction} from "./erstiInteraction";
import {VertiefungInteraction} from "./vertiefungInteraction";

export const commands : CommandInterface[] = [
    new SemesterInteraction(),
    new ErstiInteraction(),
    new AnnouncementInteraction(),
    new VertiefungInteraction(),
];
export const buttons : ButtonInterface[] = [
    new AnnouncementInteraction(),
];
export const menus : SelectMenuInterface[] =[
    new VertiefungInteraction(),
]


