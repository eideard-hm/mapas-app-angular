import { Injectable } from '@angular/core'

import { LngLatLike, Map } from 'mapbox-gl'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: Map

  constructor() { }

  get isMapReady(): boolean {
    return !!this.map
  }

  setMap(map: Map) {
    this.map = map
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) {
      throw new Error("La configuración del mapa aun no esta lista!");
    }
    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }
}
