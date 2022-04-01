// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from "./interface";

export const environment: IEnvironment = {
  production: false,
  apiKey: 'AIzaSyCkkCRzb5wM8hkpkG47TJfwCHXL9ZaU6dM',
  fbUrl: "https://angular-blog-cf6c4-default-rtdb.asia-southeast1.firebasedatabase.app"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
