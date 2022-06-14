import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, map, filter, Subject, switchMap } from 'rxjs';

import { PlacesService } from '@maps/services';
import { Feature } from '@maps/interfaces/maps.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder: string = 'Search...';

  places: Feature[] = []
  debounce: Subject<string> = new Subject<string>();

  constructor(private readonly _placesSvc: PlacesService) { }

  ngOnInit(): void {
    this.getPlacesBySearchTerm()
  }

  getPlacesBySearchTerm() {
    this.debounce
      .pipe(
        debounceTime(300),
        map(term => term.trim()),
        distinctUntilChanged(),
        filter(term => term !== ''),

        switchMap((term: string) => this._placesSvc.getPlaceBySearchTerm(term)),
      )
      .subscribe((places: Feature[]) => this.places = places)
  }

  onInputChanged(term: string) {
    this.debounce.next(term)
  }

}
