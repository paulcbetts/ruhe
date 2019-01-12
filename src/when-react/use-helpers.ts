import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

function useShadyMethodsToFindObservableSource<T>(target: Observable<T>): any {
  let ret: any = target;
  while (ret.source) {
    ret = ret.source;
  }

  return ret;
}

export function useObservable<T>(
  target: Observable<T>,
  initial: T,
  source: any = null
) {
  const [ret, setter] = useState(initial);
  const src = source || useShadyMethodsToFindObservableSource(target);

  useEffect(
    () => {
      console.log('effect!');
      const sub = target.subscribe(x => {
        console.log('next!');
        setter(x);
      });

      return () => {
        console.log('boy bye');
        sub.unsubscribe();
      };
    },
    [src]
  );

  return ret;
}
