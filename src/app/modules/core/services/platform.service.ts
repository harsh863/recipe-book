import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class PlatformService {
  constructor(@Inject(PLATFORM_ID) public _platformId: Object) {
  }

  isRunningOnBrowser = () => isPlatformBrowser(this._platformId); // return true if code is running on browser.

  isRunningOnServer = () => !isPlatformBrowser(this._platformId);  // return true if code is running on server.
}
