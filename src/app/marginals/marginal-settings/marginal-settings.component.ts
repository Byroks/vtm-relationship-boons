import {
  Component,
  Output,
  Input,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Boons } from 'src/app/boons';
import { QueryService } from 'src/app/services/query-service.service';

@Component({
  selector: 'app-marginal-settings',
  templateUrl: './marginal-settings.component.html',
  styleUrls: ['./marginal-settings.component.scss'],
})
export class MarginalSettingsComponent {
  @Output() boonWeights = new EventEmitter<Boons>();
  @Input() boonValues?: any;
  step = true;

  constructor(private queryService: QueryService) {}

  onChanges() {
    if (!this.error) {
      this.boonWeights.emit(this.boonValues);
    }
  }

  public resetWeights() {
    this.queryService.getDefaultWeights().subscribe((data) => {
      this.boonValues = data;
    });
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
