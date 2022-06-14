import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { GeolocationService } from '@shared/services/geolocation.service';
import { Feature } from '@maps/interfaces/maps.interface';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {

  isLoadingPlaces: boolean = false;
  places: Feature[] = []

  constructor(
    private readonly _geolocationSvc: GeolocationService,
    private readonly title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Map Page');
  }

  get isUserLocationReady(): boolean {
    return this._geolocationSvc.isUserLocationReady
  }
}
