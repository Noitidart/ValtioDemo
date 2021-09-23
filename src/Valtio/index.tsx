import { useMemo } from 'react';

import { proxy, useSnapshot } from 'valtio';

import useRenderCounter from '../useRenderCounter';

interface IMyState {
  counter1: number;
  counter2: number;
}
interface IMyStateProps {
  myStateProxy: IMyState;
}

export default function Valtio() {
  const myStateProxy = useMemo(
    () =>
      proxy<IMyState>({
        counter1: 0,
        counter2: 0
      }),
    []
  );

  return (
    <>
      {useRenderCounter('Scenario')}

      <h1>Selectors not needed for valtio</h1>

      <BothCounters myStateProxy={myStateProxy} />
      <CounterOneValue myStateProxy={myStateProxy} />
      <CounterOneButton myStateProxy={myStateProxy} />
      <CounterTwoValue myStateProxy={myStateProxy} />
      <CounterTwoButton myStateProxy={myStateProxy} />
      <Unrelated />
    </>
  );
}

function BothCounters(props: IMyStateProps) {
  const state = useSnapshot(props.myStateProxy);

  return (
    <div>
      {useRenderCounter('BothCounters')} {state.counter1} | {state.counter2}
    </div>
  );
}

function CounterOneValue(props: IMyStateProps) {
  const state = useSnapshot(props.myStateProxy);

  return (
    <div>
      {useRenderCounter('CounterOneValue')} {state.counter1}
    </div>
  );
}

function CounterTwoValue(props: IMyStateProps) {
  const myState = useSnapshot(props.myStateProxy);

  return (
    <div>
      {useRenderCounter('CounterTwoValue')} {myState.counter2}
    </div>
  );
}

function CounterOneButton(props: IMyStateProps) {
  return (
    <div>
      {useRenderCounter('CounterOneButton')}{' '}
      <button onClick={() => props.myStateProxy.counter1++}>Increment</button>
    </div>
  );
}

function CounterTwoButton(props: IMyStateProps) {
  return (
    <div>
      {useRenderCounter('CounterTwoButton')}{' '}
      <button onClick={() => props.myStateProxy.counter2++}>Increment</button>
    </div>
  );
}

function Unrelated() {
  return <>{useRenderCounter('Unrelated')}</>;
}
