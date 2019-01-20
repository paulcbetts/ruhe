import { Model, notifyFor } from '@whenjs/when';

import { useState } from 'react';
import {
  lazyForDocument,
  lazyForQuery,
  toData,
  useDocument,
  useQuery,
} from '../src/when-firebase';
import { useViewModel, useWhen } from '../src/when-react/use-helpers';

import {
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
} from '@firebase/firestore-types';
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

function Episode(props: { episode: DocumentSnapshot }) {
  // const ep = useDocument<EpisodeItem>(props.episode.ref, props.episode);
  if (!props.episode) {
    return null;
  }

  const ep = toData<EpisodeItem>(props.episode);
  if (!ep) {
    return null;
  }

  return (
    <li key={ep.id}>
      <strong>{ep.name}</strong> - {ep.summary}
    </li>
  );
}

function Example(props?: { initialEpDocs?: QuerySnapshot }) {
  props = props || {};

  const vm = useViewModel(() => new ViewModel());
  const num = useWhen(vm, x => x.foo);
  const desc = useWhen(vm, x => x.todo!.description);
  const episodes = useWhen(vm, x => x.episodes) || [];
  const epDocs =
    useQuery(db.collection('game-of-thrones').limit(10000)) ||
    props.initialEpDocs;

  const eps = epDocs ? epDocs.docs.map(x => <Episode episode={x} />) : [];

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
