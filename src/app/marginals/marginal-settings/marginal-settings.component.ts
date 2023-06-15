import { Component, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Boons } from 'src/app/boons';

@Component({
  selector: 'app-marginal-settings',
  templateUrl: './marginal-settings.component.html',
  styleUrls: ['./marginal-settings.component.scss'],
})
export class MarginalSettingsComponent {
  @Output() boonWeights = new EventEmitter<Boons>();

  boonsValues: Boons = {
    trivial: 35,
    minor: 50,
    moderate: 10,
    major: 5,
    life: 0,
    amount: 40,
  };

  step = true;

  onChanges() {
    this.boonWeights.emit(this.boonsValues);
  }

  get stepValue() {
    return this.step ? 5 : 1;
  }

  get error() {
    return this.boonsValues.life +
      this.boonsValues.major +
      this.boonsValues.moderate +
      this.boonsValues.minor +
      this.boonsValues.trivial >
      100
      ? true
      : false;
  }
}
