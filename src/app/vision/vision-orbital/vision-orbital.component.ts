import {AnimationTransitionEvent, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from "rxjs/Observable";
import {VisionKeepAliveService} from "../../core/vision-keepalive.service";
import {fadeVision} from './animations';

@Component({
  selector: 'app-vision-orbital',
  templateUrl: './vision-orbital.component.html',
  styleUrls: ['./vision-orbital.component.css'],
  animations: fadeVision
})
export class VisionOrbitalComponent implements OnInit {

  visionImgOneS3Url: string;
  visionImgTwoS3Url: string;
  visionImgOneData: any;
  visionImgTwoData: any;
  imgCache: Map<string, Blob> = new Map<string, Blob>();
  stateOne = 'in';
  stateTwo = 'out';
  visionFadeTime = '2500ms';
  visionHoldTime = 20000;
  enableAnimation = false;
  defaultImgBlobBase64Data = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';


  constructor(private httpClient: HttpClient,
              private sanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute,
              private visionKeepAliveSvc: VisionKeepAliveService) {
  }

  ngOnInit() {
    // set transparent tiny img src until seeker images are loaded
    this.visionImgOneData = this.defaultImgBlobBase64Data;
    this.visionImgTwoData = this.defaultImgBlobBase64Data;

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const fadeTimeParam = params['fadeTime'];
      if (fadeTimeParam) {
        this.visionFadeTime = fadeTimeParam + 'ms';
        // console.log('set vision fade time: ' + this.visionFadeTime);
      }
      const holdTimeParam = params['holdTime'];
      if (holdTimeParam) {
        this.visionHoldTime = holdTimeParam;
        // console.log('set vision hold time: ' + this.visionHoldTime + 'ms');
      }
    });

    // timeout for now, but should subscribe to event if not using keepAlive ping
    setTimeout(() => {
      this.visionKeepAliveSvc.initialiseVisions();
      this.handleVisionChanged(this.visionKeepAliveSvc.vision);
    }, 3000);
  }

  handleVisionChanged = (newVision: string[]) => {
    if (this.isVisionAvailable(newVision)) {
      if (this.imgCache.has(newVision[0])) {
        this.startVisionChange(newVision);
      } else {
        this.preloadVisionImg(newVision[0]).subscribe((imgBlob) => {
            this.imgCache.set(newVision[0], imgBlob);
            this.startVisionChange(newVision);
          },
          (err: any) => {
            console.error(err);
          }
        );
      }
    } else {
      console.log('error - no vision available');
      this.visionImgOneS3Url = null;
      this.visionImgOneData = null;
      this.visionImgTwoS3Url = null;
      this.visionImgTwoData = null;
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
    }, visionDisplayTime);
  }

  startVisionChange(newVision: string[]) {
    this.enableAnimation = true;
    if (this.stateOne === 'in' && this.stateTwo === 'out') {
      this.visionImgTwoS3Url = newVision[0];
      this.visionImgTwoData = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imgCache.get(this.visionImgTwoS3Url)));
      // console.log('img2 now: ' + this.visionImgTwoS3Url);
    } else if (this.stateOne === 'out' && this.stateTwo === 'in') {
      this.visionImgOneS3Url = newVision[0];
      this.visionImgOneData = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imgCache.get(this.visionImgOneS3Url)));
      // console.log('img1 now: ' + this.visionImgOneS3Url);
    }
    this.toggleState();
  }

  completeVisionChange() {
    this.scheduleCycleVision(this.visionHoldTime);
  }

  toggleState() {
    this.stateOne = this.stateOne === 'in' ? 'out' : 'in';
    this.stateTwo = this.stateTwo === 'in' ? 'out' : 'in';
  }

  onTransitionStart(event) {
  }

  onTransitionDone(event) {
    if (this.enableAnimation) {
      this.completeVisionChange();
    }
  }

  isVisionAvailable(vision: string[]): boolean {
    return vision != null && vision.length >= 2;
  }

  // doVisionChange(newVision: string[]) {
  //   // this.tagN = 0;
  //   // this.visionTagsPartial = new Array<string>();
  //   // const newVisionTags = this.tokenizeTags(newVision[1]);
  //   this.visionImgS3Url = newVision[0];
  //   // this.visionImgData = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imgBlob));
  //   const imgData = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imgCache.get(this.visionImgS3Url)));
  //   this.visionImgData = imgData;
  //   // this.visionTags = newVisionTags;
  //
  //   // mock img url for local test data
  //   // if (~~(Math.random() * 1000000) % 2 === 0) {
  //   //   this.vision[0] = './assets/testImage01.jpg';
  //   // } else {
  //   //   this.vision[0] = './assets/testImage02.jpg';
  //   // }
  //
  //   this.scheduleCycleVision(1);
  //   // this.scheduleCycleVision(this.getVisionDisplayTime(this.visionTags.length));
  //   // if (newVision.length > 2) {
  //   //   this.visionLocation = newVision[2];
  //   // }
  //   // if we want to append the tags one by one with a delay:
  //   // setTimeout(() => {
  //   //   this.appendPartialTags();
  //   // // }, 1500);
  //   // }, 250);
  //
  //   // or to append all tags immediately:
  //   // this.appendAllTags();
  // }

  // getVisionDisplayTime(visionTagsNum: number): number {
  //   // return visionTagsNum;
  //   return 1;
  // }

  // appendAllTags() {
  //   this.visionTagsPartial = this.visionTags;
  // }

  // appendPartialTags() {
  //   const nextTagAfter = 0.5 / (this.visionTags.length);
  //   if (this.tagN < this.visionTags.length) {
  //     setTimeout(() => {
  //       this.visionTagsPartial.push(this.visionTags[this.tagN])
  //       this.tagN++;
  //       this.appendPartialTags();
  //     }, nextTagAfter * 1000)
  //   }
  // }

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

  // tokenizeTags(tagStr: string) {
  //   return tagStr.split(' + ');
  // }

}
