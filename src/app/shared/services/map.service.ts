import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AnyLayer, AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl'
import { Observable } from 'rxjs';

import { Feature } from '@maps/interfaces/maps.interface'
import { GeolocationService } from './geolocation.service';
import { DirectionsResponse, Route } from '@maps/interfaces/directions.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private apiUrl: string = environment.maxboxApiDirectionsUrl;
  private map!: Map
  private markers: Marker[] = []

  constructor(
    private readonly _http: HttpClient,
    private readonly _geolocationSvc: GeolocationService
  ) { }

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

  createMarkersFromPlaces(places: Feature[]) {
    if (!this.map) throw new Error("El mapa aún no se ha inicializado.");

    this.markers.forEach(marker => marker.remove())
    const newMarkers = [];

    for (const place of places) {
      const [lgn, lat] = place.center;
      const popup = new Popup()
        .setHTML(
          `
          <h6>${place.text_es}</h6>
          <span>${place.place_name_es}</span>
          `
        );
      const marker = new Marker()
        .setLngLat([lgn, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(marker);
    }
    this.markers = newMarkers;

    if (places.length === 0) return;

    // config map limit
    const bound = new LngLatBounds();
    newMarkers.forEach(marker => bound.extend(marker.getLngLat()))
    bound.extend(this._geolocationSvc.userLocation);

    this.map.fitBounds(bound, {
      padding: 100,
      animate: true
    })
  }

  getRouteBetweenTwoPoint(start: [number, number], end: [number, number]): Observable<DirectionsResponse> {
    const params = new HttpParams()
      .set('alternatives', false)
      .set('geometries', 'geojson')
      .set('overview', 'simplified')
      .set('steps', false);

    return this._http.get<DirectionsResponse>(`${this.apiUrl}/${start.join(',')};${end.join(',')}`, { params });
  }

  drawPolyline(route: Route): void {
    console.log({ kms: route.distance / 1000, duration: route.duration / 60 })

    if (!this.map) throw new Error("El mapa no ha sido inicializado!");

    const coords = route.geometry.coordinates[0];
    // const bound = new LngLatBounds();
    // coords.forEach(([lng, lat]: any) => bound.extend([lng, lat]))

    // this.map?.fitBounds(bound, {
    //   padding: 100
    // })

    // draw Polyline
    this.drawLineString(coords)
  }

  drawLineString(coords: any) {

    if(this.map.getLayer('lineStringLayout')) {
      this.map.removeLayer('lineStringLayout');
      this.map.removeSource('lineStringSource');
    }

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    };

    const layerOptions: AnyLayer = {
      id: 'lineStringLayout',
      type: 'line',
      source: 'lineStringSource',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 5
      }
    };

    this.map.addSource('lineStringSource', sourceData);

    this.map.addLayer(layerOptions);
  }
}
