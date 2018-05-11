import {EventEmitter, Injectable} from '@angular/core';
import {Keepalive} from '@ng-idle/keepalive';
import {CsvUtilsService} from "../core/utils/csv-utils.service";


@Injectable()
export class VisionKeepAliveService {

  vision: string[] = null;
  visionIndex: number = 0;
  onVisionChange: EventEmitter<string[]> = new EventEmitter();

  constructor(private csvUtilsSvc: CsvUtilsService,
              private keepAlive: Keepalive) {

    // this.initialiseVisions();
    //
    // this.keepAlive.onPing.subscribe(() => {
    //   this.refreshVision();
    // });

  }

  isCsvDataAvailable(): boolean {
    return this.csvUtilsSvc.csvData !== null && this.csvUtilsSvc.csvData.length > 0;
  }

  initialiseVisions() {
    if (this.isCsvDataAvailable()) {
      this.vision = this.csvUtilsSvc.csvData[this.visionIndex];
    }
  }

  refreshVision() {
    try {
      if (this.isCsvDataAvailable()) {
        this.visionIndex++;
        if (this.visionIndex >= this.csvUtilsSvc.csvData.length) {
          this.visionIndex = 0;
        }
        this.vision = this.csvUtilsSvc.csvData[this.visionIndex];
        this.onVisionChange.emit(this.vision)
      }
    } catch (err) {
      // ignore for now
    }
  }

}
