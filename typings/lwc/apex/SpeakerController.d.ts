declare module "@salesforce/apex/SpeakerController.searchSpeakers" {
  export default function searchSpeakers(param: {name: any, speciality: any}): Promise<any>;
}
declare module "@salesforce/apex/SpeakerController.getAssignmentsForDate" {
  export default function getAssignmentsForDate(param: {speakerId: any, selectedDate: any}): Promise<any>;
}
declare module "@salesforce/apex/SpeakerController.createSessionAndAssignment" {
  export default function createSessionAndAssignment(param: {speakerId: any, sessionDate: any, startTime: any, endTime: any, title: any, level: any}): Promise<any>;
}
