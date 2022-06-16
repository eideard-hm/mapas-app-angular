import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, map, filter, switchMap, Observable } from 'rxjs';

import { PlacesService } from '@maps/services';
import { Feature } from '@maps/interfaces/maps.interface';
import { MapService } from '@shared/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit {

  @Input() placeholder: string = 'Search...';
  places: Feature[] = [];
  inputSearch: FormControl = new FormControl('');
  isShowingSearchResult$!: Observable<boolean>;

  constructor(
    private readonly _placesSvc: PlacesService,
    private readonly _mapSvc: MapService
  ) { }

  ngOnInit(): void {
    this.isShowingSearchResult$ = this._mapSvc.isShowingSearchResult$;
    this.getPlacesBySearchTerm();
  }

  getPlacesBySearchTerm() {
    this.inputSearch.valueChanges
      .pipe(
        debounceTime(300),
        map(term => term.trim()),
        distinctUntilChanged(),
        filter(term => term !== ''),

        switchMap((term: string) => this._placesSvc.getPlaceBySearchTerm(term)),
      )
      .subscribe({
        next: (places: Feature[]) => {
          this.places = places;
          this._mapSvc.createMarkersFromPlaces(places)
        },
        error: (e: HttpErrorResponse) => {
          console.error('Ocurrió un error al buscar los lugares', e.message);
          throw new Error("Error al buscar los lugares")
        }
      })
  }
}
