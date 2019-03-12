import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';

import {CoreModule} from "./core/core.module";
import {AppComponent} from './app.component';
import {VisionModule} from "./vision/vision.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    NgIdleKeepaliveModule.forRoot(),
    VisionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
