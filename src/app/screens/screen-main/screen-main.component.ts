import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Boons } from 'src/app/boons';
import { QueryService } from 'src/app/services/query-service.service';

@Component({
  selector: 'app-screen-main',
  templateUrl: './screen-main.component.html',
  styleUrls: ['./screen-main.component.scss'],
})
export class ScreenMainComponent implements OnInit {
  public boonWeights?: Boons;
  public connectionWeights: any;
  public fileName = '';
  public jsonUrl: any;
  public csvUrl: any;

  private fileContent: any;
  private uploadfile?: File;
  private send = false;

  constructor(private queryService: QueryService) {}

  ngOnInit() {
    this.queryService.getDefaultWeights().subscribe((data) => {
      this.boonWeights = data.boons;
      this.connectionWeights = data.connections;
    });
  }

  onFileSelected(event: any) {
    this.uploadfile = event.target.files[0];
    if (this.uploadfile) {
      this.fileName = this.uploadfile.name;
      let fileReader = new FileReader();
      fileReader.readAsText(this.uploadfile);
      fileReader.onload = (e) => {
        this.fileContent = fileReader.result;
      };
    }
  }

  downloadFile(data: any, count: boolean) {
    if (count) {
      const blob = new File([data], 'boons-list.csv');
      this.csvUrl = window.URL.createObjectURL(blob);
    } else {
      const blob = new File([JSON.stringify(data)], this.fileName);
      this.jsonUrl = window.URL.createObjectURL(blob);
    }
  }

  onSend() {
    if (this.uploadfile) {
      const upload$ = this.queryService.postUploadFile({
        file: JSON.parse(this.fileContent),
        weights: {
          boons: this.boonWeights,
          connections: this.connectionWeights,
        },
      });
      upload$.subscribe((x) => {
        this.downloadFile(x.csv, true);
        this.downloadFile(x.json, false);
      });
      this.send = true;
    }
  }

  changeValue(input: any) {
    this.boonWeights = input;
  }

  get getSend() {
    return this.send;
  }
}
