import {ButtonInterface, CommandInterface} from "./interactionInterfaces";
import {SemesterInteraction} from "./semesterInteraction";
import {AnnouncementInteraction} from "./announcementInteraction";

export const commands : CommandInterface[] = [
    new SemesterInteraction(),
    new AnnouncementInteraction(),
];
export const buttons : ButtonInterface[] = [
    new AnnouncementInteraction(),
];



