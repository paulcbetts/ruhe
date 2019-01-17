import { DocumentReference, DocumentSnapshot } from '@firebase/firestore-types';

import {
  lazyFor,
  Model,
  propertySelectorToNames,
  PropSelector,
} from '@whenjs/when';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

function documentUpdates(doc: DocumentReference): Observable<DocumentSnapshot> {
  return Observable.create((subj: Observer<DocumentSnapshot>) => {
    const disp = doc.onSnapshot(
      next => {
        console.log('next!');
        subj.next(next);
      },
      e => {
        console.log('error!');
        subj.error(e);
      },
      () => {
        console.log('complete!');
        subj.complete();
      }
    );

    return () => {
      console.log('die');
      disp();
    };
  });
}

function toData<T>(doc: DocumentSnapshot): T | null {
  console.log('new item!');
  if (!doc.exists) {
    return null;
  }

  const data: any = doc.data();
  return data as T;
}

export function lazyForDocument<T extends Model, TProp>(
  target: T,
  prop: PropSelector<T, TProp>,
  doc: DocumentReference
) {
  const [name] = propertySelectorToNames(prop, 1);
  const listener = documentUpdates(doc);

  lazyFor(target, prop, () => doc.get().then(x => toData<TProp>(x)));
  target.addTeardown(
    listener.pipe(map(x => toData<T>(x))).subscribe(x => {
      const t: any = target;
      t[name] = x;
    })
  );
}
