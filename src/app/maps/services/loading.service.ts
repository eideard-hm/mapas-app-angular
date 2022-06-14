import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  show(): void {
    this.isLoading$.next(true)
  }

  hidden(): void {
    this.isLoading$.next(false);
  }
}
