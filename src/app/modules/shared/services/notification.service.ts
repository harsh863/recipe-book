import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  ViewChild,
  ViewContainerRef,
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

  show(message: string, type: 'error' | 'success' | 'warn' ) {
    const componentRef = this._componentFactoryResolver
      .resolveComponentFactory(SnackbarComponent)
      .create(this._injector);
    componentRef.instance.message = message;
    componentRef.instance.type = type;
    this._appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    const timer = setTimeout(_ => {
      this.closeNotification(componentRef);
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
