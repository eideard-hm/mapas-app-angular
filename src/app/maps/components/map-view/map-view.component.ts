import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core'

import { Map, Marker, Popup } from 'mapbox-gl'

import { GeolocationService } from '@shared/services/geolocation.service'

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef

  constructor (private readonly _geolocationSvc: GeolocationService) {}

  ngAfterViewInit (): void {
    this.initMapboxConfi()
  }

  initMapboxConfi (): void {
    if (!this._geolocationSvc.userLocation) {
      throw new Error('No se puedo acceder a la geolocalización del usuario.')
    }
    // map config to render
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this._geolocationSvc.userLocation,
      zoom: 14 // starting zoom
    })

    // comfig popup
    const popup = new Popup().setHTML(
      `
      <h6>Aquí estoy</h6>
      <span>Estoy en este lugar del mundo</span>
      `
    )

    // config markers
    new Marker({
      color: 'red'
    })
      .setLngLat(this._geolocationSvc.userLocation)
      .setPopup(popup)
      .addTo(map)
  }
}
