import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map, Observable } from 'rxjs';

import { Feature, PlacesResponse } from '@maps/interfaces/maps.interface';
import { GeolocationService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private mapboxApiUrl = environment.maxboxApiGeolocationUrl;

  constructor(
    private readonly _http: HttpClient,
    private readonly _geolocationSvc: GeolocationService
  ) { }

  getPlaceBySearchTerm(term: string): Observable<Feature[]> {
    if (!term || term === '') throw new Error("Se debe de enviar un termino de busqueda.");

    if (!this._geolocationSvc.userLocation) throw new Error("No se pudo acceder a la localización.");

    const params = new HttpParams()
      .set('proximity', this._geolocationSvc.userLocation?.join(','))
      .set('limit', 5);

    return this._http.get<PlacesResponse>(`${this.mapboxApiUrl}/${term}.json`, { params })
      .pipe(
        map((res: PlacesResponse): Feature[] => res.features)
      )
  }
}
