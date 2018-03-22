import {Component, OnInit} from '@angular/core';
import {VisionKeepAliveService} from "../../core/vision-keepalive.service";


@Component({
  selector: 'app-vision-orbital',
  templateUrl: './vision-orbital.component.html',
  styleUrls: ['./vision-orbital.component.css']
})
export class VisionOrbitalComponent implements OnInit {

  vision: string[];
  visionTags: string[] = new Array<string>();
  visionLocation: string;

  constructor(private visionKeepAliveSvc: VisionKeepAliveService) {
  }

  ngOnInit() {
    this.visionKeepAliveSvc.onVisionChange.subscribe(this.handleVisionChanged);
  }

  handleVisionChanged = (newVision: string[]) => {
    if (newVision !== null && newVision.length === 3) {
      this.vision = newVision;
      this.visionTags = this.tokenizeTags(this.vision[1]);
      this.visionLocation = this.vision[2];
    } else {
      this.vision = null;
      this.visionTags = new Array<string>();
      this.visionLocation = null;
    }
  };

  tokenizeTags(tagStr: string) {
    return tagStr.split(' + ');
  }

  isVisionAvailable(): boolean {
    return this.vision != null && this.vision.length === 3;
  }

  get visionImgUrl(): string {
    if (this.isVisionAvailable()) {
      return this.vision[0];
    } else {
      return '';
    }
  }

}

