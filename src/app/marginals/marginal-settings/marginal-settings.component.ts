import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Boons, Dictionary } from 'src/app/boons';
import { QueryService } from 'src/app/services/query-service.service';

@Component({
  selector: 'app-marginal-settings',
  templateUrl: './marginal-settings.component.html',
  styleUrls: ['./marginal-settings.component.scss'],
})
export class MarginalSettingsComponent {
  @Output() boonWeights = new EventEmitter<Boons>();
  @Input() boonValues?: Boons;
  @Output() connectionWeights = new EventEmitter<Dictionary>();
  @Input() connectionValues?: Dictionary;
  step = true;
  public showDistribution = true;

  constructor(private queryService: QueryService) {}

  onChanges() {
    if (!this.error) {
      this.boonWeights.emit(this.boonValues);
    }
  }

  public resetWeights() {
    if (this.showDistribution) {
      this.queryService.getDefaultBoonWeights().subscribe((data) => {
        this.boonValues = data;
      });
    } else {
      this.queryService.getDefaultConnectionWeights().subscribe((data) => {
        this.connectionValues = data;
      });
    }
  }

  public formatLabel(value: number): string {
    return `${value * 2}`;
  }

  switchView() {
    this.showDistribution = !this.showDistribution;
  }

  get stepValue() {
    return this.step ? 5 : 1;
  }

  get error() {
    return this.boonValues!.life +
      this.boonValues!.major +
      this.boonValues!.moderate +
      this.boonValues!.minor +
      this.boonValues!.trivial >
      100
      ? true
      : false;
  }
}
