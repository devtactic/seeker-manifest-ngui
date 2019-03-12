import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {CoreModule} from "../core/core.module";
import {VisionOrbitalComponent} from "./vision-orbital/vision-orbital.component";
import {VisionLabelComponent} from './vision-label/vision-label.component';
import {VisionLocationComponent} from './vision-location/vision-location.component';

@NgModule({
  declarations: [
    VisionLabelComponent,
    VisionOrbitalComponent,
    VisionLocationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    CommonModule
  ],
  providers: [],
  exports: [
    VisionLabelComponent,
    VisionOrbitalComponent,
    VisionLocationComponent
  ]
})

export class VisionModule {
}
