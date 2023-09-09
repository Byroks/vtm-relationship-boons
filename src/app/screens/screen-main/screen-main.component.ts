import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Boons } from 'src/app/boons';
import { QueryService } from 'src/app/services/query-service.service';

@Component({
  selector: 'app-screen-main',
  templateUrl: './screen-main.component.html',
  styleUrls: ['./screen-main.component.scss'],
})
export class ScreenMainComponent implements OnInit {
  public boonWeights?: Boons;
  public connectionWeights: Map<string, number> = new Map<string, number>();
  public fileName = '';
  public jsonUrl: any;
  public csvUrl: any;
  public newConnection = false;

  private fileContent: any;
  private uploadfile?: File;
  private send = false;

  constructor(private queryService: QueryService, private titleService: Title) {
    this.titleService.setTitle('Boons by Night');
  }

  ngOnInit() {
    this.queryService.getDefaultWeights().subscribe((data) => {
      this.boonWeights = data.boons;
      for (let key in data.connections) {
        this.connectionWeights.set(key, data.connections[key]);
      }
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
          connections: Object.fromEntries(this.connectionWeights),
          newConnection: this.newConnection,
        },
      });
      upload$.subscribe((x) => {
        this.downloadFile(x.csv, true);
        this.downloadFile(x.json, false);
      });
      this.send = true;
    }
  }

  changeBoon(input: any) {
    this.boonWeights = input;
  }

  changeConnection(input: any) {
    this.connectionWeights = input;
  }

  get getSend() {
    return this.send;
  }
}
