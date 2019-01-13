import { Model } from '@whenjs/when';

import { useState } from 'react';
import { useWhen } from '../src/when-react/use-helpers';

class ViewModel extends Model {
  public foo: number;

  constructor() {
    super();
    this.propertyShouldNotify('foo');

    this.foo = 1;
  }
}

function Example() {
  const [vm] = useState(new ViewModel());
  const num = useWhen(vm, x => x.foo);

  return (
    <div>
      <p>You clicked {num} times</p>
      <button onClick={() => (vm.foo += 1)}>Click me</button>
    </div>
  );
}

export default () => {
  const [clicked, setClick] = useState(false);

  if (clicked) {
    return <div>deaded.</div>;
  }

  return (
    <div>
      <Example />

      <button onClick={() => setClick(true)}>unmount</button>
    </div>
  );
};
