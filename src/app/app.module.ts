import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { MapsModule } from '@maps/maps.module';
import { PlacesInterceptor } from '@maps/interceptors/places.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    MapsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PlacesInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
