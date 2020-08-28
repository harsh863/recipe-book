import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {BehaviorSubject, combineLatest, noop, Observable, Subject} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

@Injectable()
export class FileUploadService {
  constructor(private _storage: AngularFireStorage) {
  }

  uploadFile(file: File): Observable<{progress: number, is_complete: boolean, file_url?: string}> {
    const filePath = file.name;
    const fileRef = this._storage.ref(filePath);
    let $fileUrlObservable = new BehaviorSubject('');
    const $fileUploadProgressObservable = this._storage.upload(filePath, file)
      .percentageChanges()
      .pipe(finalize(() =>
        fileRef.getDownloadURL().subscribe(url => $fileUrlObservable.next(url))
        ));
    return combineLatest([$fileUploadProgressObservable, $fileUrlObservable]).pipe(map(value => {
      const response = { progress: value[0], is_complete: !!value[1] };
      value[1] ? response['file_url'] = value[1] : noop();
      return response;
    }));
  }
}
