import {Component, OnInit} from '@angular/core';
import {Keepalive} from '@ng-idle/keepalive';
import {AutoResume, DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {AppConfig} from './app.config';
import {CsvUtilsService} from "./core/utils/csv-utils.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'seeker-manifest-ngui';

  constructor(private csvUtilsSvc: CsvUtilsService,
              private idle: Idle,
              private keepAlive: Keepalive) {
  }

  ngOnInit() {
    this.initialiseIdleService();
  }

  initialiseIdleService() {
    // this.idle.setIdle(AppConfig.idleTime);
    // this.idle.setTimeout(AppConfig.idleTimeout);
    // this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.setAutoResume(AutoResume.notIdle);
    this.keepAlive.interval(AppConfig.keepAlivePing);
    this.idle.watch();
  }

}
