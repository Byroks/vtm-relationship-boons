import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginalSettingsComponent } from './marginal-settings.component';

describe('MarginalSettingsComponent', () => {
  let component: MarginalSettingsComponent;
  let fixture: ComponentFixture<MarginalSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarginalSettingsComponent]
    });
    fixture = TestBed.createComponent(MarginalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
