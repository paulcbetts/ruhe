import { Model, notifyFor } from '@whenjs/when';

import { useState } from 'react';
import { lazyForDocument, lazyForQuery } from '../src/when-firebase';
import { useViewModel, useWhen } from '../src/when-react/use-helpers';

import { db } from '../src/firebase';

interface TodoItem {
  title: string;
  description: string;
  completed: boolean;
}

interface EpisodeItem {
  airstamp: string;
  id: number;
  image: { medium?: string; original?: string };
  number: number;
  season: number;
  summary: string;
  url: string;
  name: string;
}

class ViewModel extends Model {
  public foo = 1;
  public todo: TodoItem | null = null;
  public episodes: EpisodeItem[] = [];

  constructor() {
    super();

    notifyFor(this, x => x.foo);

    lazyForDocument(
      this,
      x => x.todo,
      db.collection('todos').doc('kQKMTu5gHOZirGmjgFo2')
    );

    lazyForQuery(
      this,
      x => x.episodes,
      db.collection('game-of-thrones').limit(10000)
    );
  }
}

function Example() {
  const vm = useViewModel(() => new ViewModel());
  const num = useWhen(vm, x => x.foo);
  const desc = useWhen(vm, x => x.todo!.description);
  const episodes = useWhen(vm, x => x.episodes) || [];

  const eps = episodes.map(x => (
    <li key={x.id}>
      <strong>{x.name}</strong> - {x.summary}
    </li>
  ));

  return (
    <div>
      <h2>Todo: {desc}</h2>

      <p>You clicked {num} times</p>
      <button onClick={() => (vm.foo += 1)}>Click me</button>

      <ul>{eps}</ul>
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
