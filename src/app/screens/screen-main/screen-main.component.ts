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
  @ViewChild('csvDownload') csvDownload?: ElementRef;
  public boonWeights?: Boons;
  private uploadfile?: File;
  private send = false;
  public fileName = '';
  private fileContent: any;
  public jsonUrl: any;
  public csvUrl: any;
  public toggle = false;

  constructor(private queryService: QueryService) {}

  ngOnInit() {
    this.queryService.getDefaultWeights().subscribe((data) => {
      this.boonWeights = data;
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
        weights: this.boonWeights,
      });
      upload$.subscribe((x) => {
        this.downloadFile(x.csv, true);
        this.downloadFile(x.json, false);
      });
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
