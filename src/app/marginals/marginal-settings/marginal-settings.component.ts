import {
  Component,
  Output,
  Input,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Boons } from 'src/app/boons';

@Component({
  selector: 'app-marginal-settings',
  templateUrl: './marginal-settings.component.html',
  styleUrls: ['./marginal-settings.component.scss'],
})
export class MarginalSettingsComponent {
  @Output() boonWeights = new EventEmitter<Boons>();
  @Input() boonValues?: any;
  step = true;

  onChanges() {
    if (!this.error) {
      this.boonWeights.emit(this.boonValues);
    }
  }

  get stepValue() {
    return this.step ? 5 : 1;
  }

  get error() {
    return this.boonValues.life +
      this.boonValues.major +
      this.boonValues.moderate +
      this.boonValues.minor +
      this.boonValues.trivial >
      100
      ? true
      : false;
  }
}
