// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  accessToken: 'pk.eyJ1IjoiZWlkZWFyZC1obSIsImEiOiJjbDRjdjg2aHIwMmM1M2pvYmtjaHY4enY0In0.y54qcZ-L5m-5ZudG-_yJ5g',
  maxboxApiGeolocationUrl: `https://api.mapbox.com/geocoding/v5/mapbox.places`,
  maxboxApiDirectionsUrl: 'https://api.mapbox.com/directions/v5/mapbox/driving'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
