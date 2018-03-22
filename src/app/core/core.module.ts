import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CsvUtilsService} from './utils/csv-utils.service';
import {VisionKeepAliveService} from "./vision-keepalive.service";

const core = [
  // list of shared components here
];

@NgModule({
  providers: [
    CsvUtilsService,
    VisionKeepAliveService
  ],
  declarations: [
    ...core
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    ...core
  ]
})

export class CoreModule {
}
