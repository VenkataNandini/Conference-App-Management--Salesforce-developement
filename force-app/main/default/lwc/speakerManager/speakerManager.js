import { LightningElement } from 'lwc';
import BookSession from 'c/booksession';


export default class SpeakerManager extends LightningElement {
    selectedSpeaker = null; // { Id, Name, Email_c__c, Bio_c__c, Speciality_c__c }

    handleSpeakerSelected(event) {
        this.selectedSpeaker = event.detail; // entire speaker record
    }
}