import { LightningElement, api } from 'lwc';

export default class SpeakerList extends LightningElement {
    @api speakers = [];

    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Email', fieldName: 'Email__c', type: 'email' },
        { label: 'Speciality', fieldName: 'Speciality__c', type: 'text' },
        {
            type: 'action',
            typeAttributes: { rowActions: [{ label: 'Book Session', name: 'book' }] }
        }
    ];

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'book') {
            // Emit to parent
            this.dispatchEvent(new CustomEvent('book', { detail: row }));
        }
    }
}