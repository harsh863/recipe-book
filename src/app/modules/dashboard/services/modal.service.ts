import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {skip} from 'rxjs/operators';

@Injectable()
export class ModalService {
  constructor(private _componentFactoryResolver:ComponentFactoryResolver,
              private _appRef: ApplicationRef,
              private _injector: Injector) {
  }

  open(component: any, data?: {key: string, value: any}[]) {
    const componentRef = this._componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this._injector);
    if (data.length > 0) {
      data.forEach(item => {
        componentRef.instance[item.key] = item.value;
      });
    }
    this._appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'overlayDiv';
    overlayDiv.appendChild(domElem);
    document.body.appendChild(overlayDiv);
    this.handleScroll('stop');

    componentRef.instance['onClose'].pipe(skip(1)).subscribe(_ => {
      document.getElementById('overlayDiv').remove();
      this._appRef.detachView(componentRef.hostView);
      componentRef.destroy();
      this.handleScroll()
    });
  }


  handleScroll(action: 'stop' | 'reset' = 'reset') {
    document.body.style.overflow = (action === 'reset' ? 'scroll' : 'hidden');
  }
}
