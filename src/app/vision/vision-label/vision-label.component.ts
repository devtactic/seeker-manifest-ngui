import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vision-label',
  templateUrl: './vision-label.component.html',
  styleUrls: ['./vision-label.component.css']
})
export class VisionLabelComponent implements OnInit {

  @Input() visionTag: string;

  constructor() {
  }

  ngOnInit() {
  }

}
