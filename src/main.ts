import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import Mapboxgl from 'mapbox-gl'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

Mapboxgl.accessToken =
  'pk.eyJ1IjoiZWlkZWFyZC1obSIsImEiOiJjbDRjdjg2aHIwMmM1M2pvYmtjaHY4enY0In0.y54qcZ-L5m-5ZudG-_yJ5g'

if (!navigator.geolocation) {
  alert('El navegador actual no soporta la Geolocalización')
  throw new Error('El navegador no soporta la Geolicalización')
}

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err))
