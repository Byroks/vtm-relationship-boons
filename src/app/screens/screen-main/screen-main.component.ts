import { Component, OnInit } from '@angular/core';
import { Boons } from 'src/app/boons';
import { QueryService } from 'src/app/services/query-service.service';

@Component({
  selector: 'app-screen-main',
  templateUrl: './screen-main.component.html',
  styleUrls: ['./screen-main.component.scss'],
})
export class ScreenMainComponent implements OnInit {
  public boonWeights?: Boons;
  private file?: File;
  private send = false;
  public fileName = '';

  constructor(private queryService: QueryService) {}

  ngOnInit() {
    this.queryService.getDefaultWeights().subscribe((data) => {
      this.boonWeights = data;
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }
  }

  onSend() {
    if (this.file) {
      const upload$ = this.queryService.postUploadFile(this.file);
      upload$.subscribe();
      this.send = true;
    }
  }

  changeValue(input: Boons) {
    this.boonWeights = input;
  }

  get getSend() {
    return this.send;
  }
}
