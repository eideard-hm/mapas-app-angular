import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';

import { AppModule } from './app/app.module';

Mapboxgl.accessToken = environment.accessToken;

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
