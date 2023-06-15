import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Boons } from 'src/app/boons';

@Component({
  selector: 'app-screen-main',
  templateUrl: './screen-main.component.html',
  styleUrls: ['./screen-main.component.scss'],
})
export class ScreenMainComponent {
  boonWeights?: Boons;

  fileName = '';
  constructor(private http: HttpClient) {}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      const upload$ = this.http.post('/api/thumbnail-upload', formData);
      upload$.subscribe();
    }
  }

  changeValue(input: Boons) {
    this.boonWeights = input;
    console.log(this.boonWeights);
  }
}
