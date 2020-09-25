import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  EmbeddedViewRef,
  ComponentRef
} from '@angular/core';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';

@Injectable()
export class NotificationService {
  constructor(private _componentFactoryResolver:ComponentFactoryResolver,
              private _appRef: ApplicationRef,
              private _injector: Injector) {
  }

  show(message: string, type: 'error' | 'success' | 'warn' | 'info', autoClose = true) {
    const componentRef = this._componentFactoryResolver
      .resolveComponentFactory(SnackbarComponent)
      .create(this._injector);
    componentRef.instance.message = message;
    componentRef.instance.type = type;
    this._appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // this is to create stack of snackbar(s) into view
    const isOverlayAlreadyOpened = !!document.getElementById('notifOverlay');
    if (isOverlayAlreadyOpened) {
      const notifOverlay = document.getElementById('notifOverlay');
      notifOverlay.appendChild(domElem);
    } else {
      const notifOverlay = document.createElement('div');
      notifOverlay.id = 'notifOverlay';
      notifOverlay.appendChild(domElem);
      document.body.appendChild(notifOverlay);
    }

    // below code is to handle the close event of snackbar / trigger autoClose of snackbar
    const timer = setTimeout(_ => {
      if (autoClose) {
        this.closeNotification(componentRef);
      }
    }, 3500);
    componentRef.instance.onClose.subscribe(_ => {
      clearTimeout(timer);
      this.closeNotification(componentRef);
    })
  }

  private closeNotification(componentRef: ComponentRef<SnackbarComponent>) {
    this._appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
