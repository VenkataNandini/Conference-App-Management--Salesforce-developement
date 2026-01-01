import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAssignmentsForDate from '@salesforce/apex/SpeakerController.getAssignmentsForDate';
import createSessionAndAssignment from '@salesforce/apex/SpeakerController.createSessionAndAssignment';

export default class booksession extends LightningElement {
    @api selectedSpeaker; // { Id, Name, ... }
    @track sessionDate;
    @track startTime = '10:00';
    @track endTime = '11:00';

    @track title = 'Conference Session';
    level = 'Beginner';
    levelOptions = [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Intermediate', value: 'Intermediate' },
        { label: 'Advanced', value: 'Advanced' }
    ];

    hasAssignments = false;
    disableCreate = true;

    get hasSelection() {
        return this.selectedSpeaker && this.selectedSpeaker.Id;
    }

    handleDateChange(e) {
        this.sessionDate = e.target.value;
        this.disableCreate = true;
        this.hasAssignments = false;
    }
    handleLevelChange(e) {
        this.level = e.detail.value;
    }
    handleStartChange(e) {
        this.startTime = e.target.value;
    }
    handleEndChange(e) {
        this.endTime = e.target.value;
    }
    handleTitleChange(e) {
        this.title = e.target.value;
    }

    async checkAvailability() {
        try {
            if (!this.hasSelection) {
                this.toast('Select a speaker first', 'warning');
                return;
            }
            if (!this.sessionDate) {
                this.toast('Pick a session date', 'warning');
                return;
            }
            const dateObj = new Date(this.sessionDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (dateObj <= today) {
                this.toast('Date must be in the future', 'error');
                return;
            }
            const resp = await getAssignmentsForDate({
                speakerId: this.selectedSpeaker.Id,
                selectedDate: this.sessionDate
            });
            this.hasAssignments = Array.isArray(resp) && resp.length > 0;
            this.disableCreate = this.hasAssignments;
            if (this.hasAssignments) {
                this.toast('Slot is already booked, try another date', 'error');
            } else {
                this.toast('Speaker is available on this date', 'success');
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            this.toast('Error checking availability', 'error');
        }
    }

    async createAssignment() {
        try {
            const assignId = await createSessionAndAssignment({
                speakerId: this.selectedSpeaker.Id,
                sessionDate: this.sessionDate,
                startTime: this.formatTimeForApex(this.startTime),
                endTime: this.formatTimeForApex(this.endTime),
                title: this.title,
                level: this.level
            });
            this.toast('Assignment created', 'success');
            // Reset create button until next check
            this.disableCreate = true;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            const msg = e?.body?.message || 'Error creating assignment';
            this.toast(msg, 'error');
        }
    }

    timeToServer(htmlTime) {
        // html time "HH:MM[:SS]" -> Apex Time expects "HH:MM:SS.000Z" when sent as string
        if (!htmlTime) return null;
        const parts = htmlTime.split(':');
        const hh = parts[0] || '00';
        const mm = parts[1] || '00';
        const ss = parts[2] ? parts[2].split('.')[0] : '00';
        return `${hh}:${mm}:${ss}.000Z`;
    }

    toast(message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title: 'Info', message, variant }));
    }
     formatTimeForApex(timeValue) {
    if (!timeValue) return null;

    // "10:00" → "10:00:00.000"
    const [hours, minutes] = timeValue.split(':');
    return `${hours}:${minutes}:00.000`;
}


    // ------------------------
    // TOAST
    // ------------------------
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}