import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vision-location',
  templateUrl: './vision-location.component.html',
  styleUrls: ['./vision-location.component.css']
})
export class VisionLocationComponent implements OnInit {

  @Input() visionLocation: string;

  constructor() {
  }

  ngOnInit() {
  }

}
