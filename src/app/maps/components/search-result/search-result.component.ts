import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Feature } from '@maps/interfaces/maps.interface';
import { LoadingService } from '@maps/services';
import { MapService } from '@shared/services';

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
    private readonly _mapSvc: MapService
  ) { }

  ngOnInit(): void {
    this.isLoadingPlaces$ = this._loadingSvc.isLoading$;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id
    const [lng, lat] = place.center
    this._mapSvc.flyTo([lng, lat])
  }

}
