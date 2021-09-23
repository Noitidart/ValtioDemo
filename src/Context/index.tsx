import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

import useRenderCounter from '../useRenderCounter';

export default function Context() {
  return (
    <>
      {useRenderCounter('Scenario')}

      <h1>Plain context</h1>

      <MyStateProvider>
        <BothCounters />
        <CounterOneValue />
        <CounterOneButton />
        <CounterTwoValue />
        <CounterTwoButton />
        <Unrelated />
      </MyStateProvider>
    </>
  );
}

function BothCounters() {
  const myState = useMyState();

  return (
    <div>
      {useRenderCounter('BothCounters')} {myState.counter1} | {myState.counter2}
    </div>
  );
}

function CounterOneValue() {
  const myState = useMyState();

  return (
    <div>
      {useRenderCounter('CounterOneValue')} {myState.counter1}
    </div>
  );
}

function CounterTwoValue() {
  const myState = useMyState();

  return (
    <div>
      {useRenderCounter('CounterTwoValue')} {myState.counter2}
    </div>
  );
}

function CounterOneButton() {
  const myState = useMyState();
  return (
    <div>
      {useRenderCounter('CounterOneButton')}{' '}
      <button onClick={() => myState.setCounter1(prev => prev + 1)}>
        Increment
      </button>
    </div>
  );
}

function CounterTwoButton() {
  const myState = useMyState();
  return (
    <div>
      {useRenderCounter('CounterTwoButton')}{' '}
      <button onClick={() => myState.setCounter2(prev => prev + 1)}>
        Increment
      </button>
    </div>
  );
}

function Unrelated() {
  return <>{useRenderCounter('Unrelated')}</>;
}

const MyStateContext = createContext<
  | {
      counter1: number;
      counter2: number;
      setCounter1: Dispatch<SetStateAction<number>>;
      setCounter2: Dispatch<SetStateAction<number>>;
    }
  | undefined
>(undefined);
function MyStateProvider(props: { children: ReactNode }) {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const api = useMemo(
    () => ({ counter1, setCounter1, counter2, setCounter2 }),
    [counter1, setCounter1, counter2, setCounter2]
  );

  return (
    <MyStateContext.Provider value={api}>
      {props.children}
    </MyStateContext.Provider>
  );
}
function useMyState() {
  const context = useContext(MyStateContext);
  if (context === undefined) {
    throw new Error('useMyState must be used within a MyStateProvider');
  }
  return context;
}
