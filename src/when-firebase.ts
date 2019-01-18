import {
  DocumentReference,
  DocumentSnapshot,
  Query,
  QuerySnapshot,
} from '@firebase/firestore-types';

import {
  lazyFor,
  Model,
  propertySelectorToNames,
  PropSelector,
} from '@whenjs/when';

import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

function queryUpdates(query: Query): Observable<QuerySnapshot> {
  return Observable.create(query.onSnapshot.bind(query));
}

function documentUpdates(doc: DocumentReference): Observable<DocumentSnapshot> {
  return Observable.create(doc.onSnapshot.bind(doc));
  /*
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
    */
}

function toData<T>(doc: DocumentSnapshot): T | null {
  if (!doc.exists) {
    return null;
  }

  const data: any = doc.data();
  return data as T;
}

function toDatas<T>(query: QuerySnapshot): T[] {
  return query.docs.reduce((acc: T[], x) => {
    const item = toData<T>(x);
    if (item) {
      acc.push(item);
    }
    return acc;
  }, []);
}

export function lazyForQuery<T extends Model, TProp>(
  target: T,
  prop: PropSelector<T, TProp[]>,
  query: Query
) {
  const [name] = propertySelectorToNames(prop, 1);
  const listener = queryUpdates(query);

  lazyFor(target, prop, () => query.get().then(xs => toDatas<TProp>(xs)));
  target.addTeardown(
    listener.pipe(map(xs => toDatas<TProp>(xs))).subscribe(x => {
      const t: any = target;
      t[name] = x;
    })
  );
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
    listener.pipe(map(x => toData<TProp>(x))).subscribe(x => {
      const t: any = target;
      t[name] = x;
    })
  );
}
