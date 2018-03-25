import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VisionKeepAliveService} from "../../core/vision-keepalive.service";
import {Observable} from "rxjs/Observable";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-vision-orbital',
  templateUrl: './vision-orbital.component.html',
  styleUrls: ['./vision-orbital.component.css']
})
export class VisionOrbitalComponent implements OnInit {

  visionImgS3Url: string;
  visionImgData: any;
  visionTags: string[] = new Array<string>();
  visionLocation: string;

  constructor(private httpClient: HttpClient,
              private sanitizer: DomSanitizer,
              private visionKeepAliveSvc: VisionKeepAliveService) {
  }

  ngOnInit() {
    this.visionKeepAliveSvc.onVisionChange.subscribe(this.handleVisionChanged);
  }

  handleVisionChanged = (newVision: string[]) => {
    if (this.isVisionAvailable(newVision)) {
      let newVisionTags = this.tokenizeTags(newVision[1]);
      this.preloadVisionImg(newVision[0]).subscribe((imgBlob) => {
          this.visionImgS3Url = newVision[0];
          this.visionImgData = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imgBlob));
          this.visionTags = newVisionTags;
          this.visionLocation = newVision[2];
        },
        (err: any) => {
          console.error(err);
        }
      );
    } else {
      this.visionImgS3Url = null;
      this.visionImgData = null;
      this.visionTags = new Array<string>();
      this.visionLocation = null;
    }
  };

  preloadVisionImg(imgS3Url: string): Observable<Blob> {
    return this.httpClient
      .get(imgS3Url, {
        responseType: "blob"
      });
  }

  tokenizeTags(tagStr: string) {
    return tagStr.split(' + ');
  }

  isVisionAvailable(vision: string[]): boolean {
    return vision != null && vision.length === 3;
  }

  get visionImgUrl(): string {
    return this.visionImgS3Url;
  }

}

