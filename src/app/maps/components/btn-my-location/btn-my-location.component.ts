import { Component } from '@angular/core'

import { GeolocationService, MapService } from '@shared/services'

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss']
})
export class BtnMyLocationComponent {
  constructor(
    private readonly _geolocationSvc: GeolocationService,
    private readonly _mapSvc: MapService
  ) { }

  goToMyLocation() {
    if (!this._geolocationSvc.isUserLocationReady) {
      alert('No hay ubicación del usuario!')
      throw new Error("No se pudo acceder a la ubicación del usuario!");
    }

    if (!this._mapSvc.isMapReady) {
      alert('El mapa aun no esta listo')
      throw new Error("El mapa aun no esta listo!");
    }

    this._mapSvc.flyTo(this._geolocationSvc.userLocation!);
  }
}
