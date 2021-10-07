import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  afuConfig = {
    uploadAPI: {
      url:"https://example-file-upload-api"
    }
};
}
