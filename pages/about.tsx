import { Model, when, notify } from '@whenjs/when';
import { scan } from 'rxjs/operators';

import { useObservable } from '../src/when-react/use-helpers';

@notify('foo')
class ViewModel extends Model {
  public foo: number;

  constructor() {
    super();
    this.foo = 0;
  }
}

const vm = new ViewModel();

export default function Example() {
  // Declare a new state variable, which we'll call "count"
  const obs = when(vm, x => x.foo).pipe(scan((acc, x) => acc + x, 0));
  const num = useObservable(obs, 0);

  return (
    <div>
      <p>You clicked {num} times</p>
      <button onClick={() => (vm.foo += 1)}>Click me</button>
    </div>
  );
}
