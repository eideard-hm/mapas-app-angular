import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Feature } from '@maps/interfaces/maps.interface';
import { LoadingService } from '@maps/services';
import { GeolocationService, MapService } from '@shared/services';
import { DirectionsResponse } from '@maps/interfaces/directions.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnInit {

  @Input() searchTerm: string = ''
  @Input() places: Feature[] = []

  isLoadingPlaces$!: Observable<boolean>
  selectedId: string = ''

  constructor(
    private readonly _loadingSvc: LoadingService,
    private readonly _mapSvc: MapService,
    private readonly _geolocation: GeolocationService
  ) { }

  ngOnInit(): void {
    this.isLoadingPlaces$ = this._loadingSvc.isLoading$;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id
    const [lng, lat] = place.center
    this._mapSvc.flyTo([lng, lat])
  }

  getDirections(place: Feature) {
    if (!this._geolocation.userLocation) throw new Error("No se ha podido detectar la geolocalización del usuario.");

    const start: [number, number] = this._geolocation.userLocation;
    const end: [number, number] = place.center as [number, number];
    this._mapSvc.getRouteBetweenTwoPoint(start, end)
      .subscribe(({ routes }: DirectionsResponse) => this._mapSvc.drawPolyline(routes[0]))
  }

}
