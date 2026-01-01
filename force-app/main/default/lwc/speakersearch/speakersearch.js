import { LightningElement, track } from 'lwc';
import searchSpeakers from '@salesforce/apex/SpeakerController.searchSpeakers';

export default class SpeakerSearch extends LightningElement {
    @track speakers = [];
    name = '';
    speciality = '';

    specialityOptions = [
        { label: 'All', value: '' },
        { label: 'Apex', value: 'Apex' },
        { label: 'LWC', value: 'LWC' },
        { label: 'Integrations', value: 'Integrations' },
        { label: 'Architecture', value: 'Architecture' }
    ];

    handleNameChange(e) {
        this.name = e.target.value;
    }
    handleSpecialityChange(e) {
        this.speciality = e.detail.value;
    }

    async handleSearch() {
        try {
            const result = await searchSpeakers({ name: this.name, speciality: this.speciality });
            // ensure reactivity by new array ref
            this.speakers = [...result];
        } catch (error) {
            // optional: toast error
            // eslint-disable-next-line no-console
            console.error('Search error', error);
        }
    }

    handleRowBook(event) {
        const selectedSpeaker = event.detail; // { Id, Name, Email__c, Bio__c, Speciality__c }
        this.dispatchEvent(new CustomEvent('speakerselected', { detail: selectedSpeaker }));
    }
}