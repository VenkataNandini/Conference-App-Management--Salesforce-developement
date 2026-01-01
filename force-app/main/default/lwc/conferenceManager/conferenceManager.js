import { LightningElement } from "lwc";

export default class ConferenceManager extends LightningElement {
  selectedSpeakerId;

  handleSpeakerSelect(event) {
    this.selectedSpeakerId = event.detail;
  }
}
