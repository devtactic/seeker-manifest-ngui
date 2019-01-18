import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VisionKeepAliveService} from "../../core/vision-keepalive.service";
import {Observable} from "rxjs/Observable";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {AppConfig} from "../../app.config";
import {Keepalive} from "@ng-idle/keepalive";


@Component({
  selector: 'app-vision-orbital',
  templateUrl: './vision-orbital.component.html',
  styleUrls: ['./vision-orbital.component.css']
})
export class VisionOrbitalComponent implements OnInit {

  visionImgS3Url: string;
  visionImgData: any;
  visionTags: string[] = new Array<string>();
  visionTagsPartial: string[] = new Array<string>();
  visionLocation: string;
  tagN: number;
  imgCache: Map<string, Blob> = new Map<string, Blob>();

  constructor(private httpClient: HttpClient,
              private sanitizer: DomSanitizer,
              private visionKeepAliveSvc: VisionKeepAliveService) {
  }

  ngOnInit() {
    // this.visionKeepAliveSvc.onVisionChange.subscribe(this.handleVisionChanged);

    // timeout for now, but should subscribe to event if not using keepAlive ping
    setTimeout(() => {
      this.visionKeepAliveSvc.initialiseVisions();
      this.handleVisionChanged(this.visionKeepAliveSvc.vision);
    }, 3000);
  }

  doVisionChange(newVision: string[]) {
    this.tagN = 0;
    this.visionTagsPartial = new Array<string>();
    const newVisionTags = this.tokenizeTags(newVision[1]);
    this.visionImgS3Url = newVision[0];
    // this.visionImgData = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imgBlob));
    const imgData = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imgCache.get(this.visionImgS3Url)));
    this.visionImgData = imgData;
    this.visionTags = newVisionTags;

    // mock img url for local test data
    // if (~~(Math.random() * 1000000) % 2 === 0) {
    //   this.vision[0] = './assets/testImage01.jpg';
    // } else {
    //   this.vision[0] = './assets/testImage02.jpg';
    // }

    this.scheduleCycleVision(this.getVisionDisplayTime(this.visionTags.length));
    if (newVision.length > 2) {
      this.visionLocation = newVision[2];
    }
    // if we want to append the tags one by one with a delay:
    // setTimeout(() => {
    //   this.appendPartialTags();
    // // }, 1500);
    // }, 250);

    // or to append all tags immediately:
    this.appendAllTags();
  }

  handleVisionChanged = (newVision: string[]) => {
    if (this.isVisionAvailable(newVision)) {
      if (this.imgCache.has(newVision[0])) {
        this.doVisionChange(newVision);
      } else {
        this.preloadVisionImg(newVision[0]).subscribe((imgBlob) => {
            this.imgCache.set(newVision[0], imgBlob);
            this.doVisionChange(newVision)
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    } else {
      this.visionImgS3Url = null;
      this.visionImgData = null;
      this.tagN = 0;
      this.visionTags = new Array<string>();
      this.visionTagsPartial = new Array<string>();
      this.visionLocation = null;
    }
  };

  preloadVisionImg(imgS3Url: string): Observable<Blob> {
    return this.httpClient
      .get(imgS3Url, {
        responseType: "blob"
      });
  }

  scheduleCycleVision(visionDisplayTime: number) {
    setTimeout(() => {
      this.visionKeepAliveSvc.refreshVision();
      this.handleVisionChanged(this.visionKeepAliveSvc.vision);
    }, visionDisplayTime * 150);
  }

  getVisionDisplayTime(visionTagsNum: number): number {
    // return visionTagsNum;
    return 1;
  }

  appendAllTags() {
    this.visionTagsPartial = this.visionTags;
  }

  appendPartialTags() {
    const nextTagAfter = 0.5 / (this.visionTags.length);
    if (this.tagN < this.visionTags.length) {
      setTimeout(() => {
        this.visionTagsPartial.push(this.visionTags[this.tagN])
        this.tagN++;
        this.appendPartialTags();
      }, nextTagAfter * 1000)
    }
  }

  // scheduleCycleVision(visionDisplayTime: number) {
  //   setTimeout(() => {
  //     this.visionKeepAliveSvc.refreshVision();
  //     this.handleVisionChanged(this.visionKeepAliveSvc.vision);
  //   }, visionDisplayTime * 1000);
  // }
  //
  // getVisionDisplayTime(visionTagsNum: number): number {
  //   const marginSecs = 4;
  //   const tagSecs = visionTagsNum / 4;
  //   // const overflowSecs = (visionTagsNum % 4) > 0 ? 1 : 0;
  //   const secsForVision = marginSecs + Math.round(tagSecs);
  //   return secsForVision >=5 ? secsForVision : 5;
  // }
  //
  // appendPartialTags() {
  //   if (this.tagN < this.visionTags.length) {
  //     setTimeout(() => {
  //       this.visionTagsPartial.push(this.visionTags[this.tagN])
  //       this.tagN++;
  //       this.appendPartialTags();
  //     }, 250)
  //   }
  // }

  tokenizeTags(tagStr: string) {
    return tagStr.split(' + ');
  }

  isVisionAvailable(vision: string[]): boolean {
    return vision != null && vision.length >= 2;
  }

}
