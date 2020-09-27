import {Component, OnDestroy} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Component({ selector: '', template: '' })
export abstract class UnsubscribeAbstract implements OnDestroy {
  protected destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
