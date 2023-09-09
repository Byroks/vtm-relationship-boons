import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Boons } from 'src/app/boons';
import { QueryService } from 'src/app/services/query-service.service';

@Component({
  selector: 'app-marginal-settings',
  templateUrl: './marginal-settings.component.html',
  styleUrls: ['./marginal-settings.component.scss'],
})
export class MarginalSettingsComponent {
  @Output() boonWeights = new EventEmitter<Boons>();
  @Input() boonValues?: Boons;
  @Output() connectionWeights = new EventEmitter<Map<string, number>>();
  @Input() connectionValues: Map<string, number> = new Map<string, number>();
  step = true;
  public showDistribution = true;
  public newConnection = '';

  constructor(private queryService: QueryService) {}

  onChanges(key?: string, value: number = 0) {
    if (key) {
      this.connectionValues.set(key, value);
      console.log(value);
    }
    if (!this.error) {
      this.connectionWeights.emit(this.connectionValues);
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
    return `${value + 50}` + '%';
  }

  public switchView() {
    this.showDistribution = !this.showDistribution;
  }

  public addConnection() {
    if (this.newConnection !== '') {
      this.connectionValues.set(this.newConnection, 0);
      this.newConnection = '';
      this.connectionWeights.emit(this.connectionValues);
    }
  }

  public deleteConnection(key: string) {
    this.connectionValues.delete(key);
    this.connectionWeights.emit(this.connectionValues);
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
