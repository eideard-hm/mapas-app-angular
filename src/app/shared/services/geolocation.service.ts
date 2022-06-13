import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  userLocation!: [number, number]

  constructor () {
    this.getCurrentUserLocation();
  }

  get isUserLocationReady (): boolean {
    return !!this.userLocation
  }

  getCurrentUserLocation (): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude]
          resolve(this.userLocation)
        },
        error => {
          alert('No se pudo obtener la gelocalización')
          console.error(error)
          reject('No se puedo obtener la geolocalización.')
        }
      )
    })
  }
}
