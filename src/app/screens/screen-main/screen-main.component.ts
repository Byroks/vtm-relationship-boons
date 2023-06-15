import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Boons } from 'src/app/boons';

@Component({
  selector: 'app-screen-main',
  templateUrl: './screen-main.component.html',
  styleUrls: ['./screen-main.component.scss'],
})
export class ScreenMainComponent {
  constructor(private http: HttpClient) {}

  boonWeights?: Boons;
  file?: File;
  send = false;
  fileName = '';

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }
  }

  onSend() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      const upload$ = this.http.post('/api/file-upload', formData);
      upload$.subscribe();
      this.send = true;
    }
  }

  changeValue(input: Boons) {
    this.boonWeights = input;
  }
}
