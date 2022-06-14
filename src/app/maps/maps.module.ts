import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MapPageComponent } from './pages/map-page/map-page.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';
import { LogoComponent } from './components/logo/logo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
  declarations: [
    MapPageComponent,
    MapViewComponent,
    LoadingComponent,
    BtnMyLocationComponent,
    LogoComponent,
    SearchBarComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    MapPageComponent
  ]
})
export class MapsModule { }
