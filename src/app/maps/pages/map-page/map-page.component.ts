import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { GeolocationService } from '@shared/services/geolocation.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit  {

  constructor(
    private readonly _geolocationSvc: GeolocationService,
    private readonly title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Map Page');
  }

  get isUserLocationReady(): boolean{
    return this._geolocationSvc.isUserLocationReady
  }
}
