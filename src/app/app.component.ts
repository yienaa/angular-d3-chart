import { Component } from '@angular/core';
import { rawData } from './resources/unemployment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-d3-chart';
  
  data = rawData;
}
