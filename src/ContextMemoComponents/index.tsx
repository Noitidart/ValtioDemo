import {
  createContext,
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

import useRenderCounter from '../useRenderCounter';

export default function ContextMemoComponents() {
  return (
    <>
      {useRenderCounter('Scenario')}

      <h1>Context - memo components</h1>

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
    <>
      {useRenderCounter('BothCounters')}
      <BothCountersMemo
        counter1={myState.counter1}
        counter2={myState.counter2}
      />
    </>
  );
}

const BothCountersMemo = memo(function BothCountersMemo(
  props: Pick<IMyState, 'counter1' | 'counter2'>
) {
  return (
    <div>
      {useRenderCounter('BothCountersMemo')} {props.counter1} | {props.counter2}
    </div>
  );
});

function CounterOneValue() {
  const myState = useMyState();

  return (
    <>
      {useRenderCounter('CounterOneValue')}
      <CounterOneValueMemo counter1={myState.counter1} />
    </>
  );
}

const CounterOneValueMemo = memo(function CounterOneValueMemo(
  props: Pick<IMyState, 'counter1'>
) {
  return (
    <div>
      {useRenderCounter('CounterOneValueMemo')} {props.counter1}
    </div>
  );
});

function CounterTwoValue() {
  const myState = useMyState();

  return (
    <>
      {useRenderCounter('CounterTwoValue')}
      <CounterTwoValueMemo counter2={myState.counter2} />
    </>
  );
}

const CounterTwoValueMemo = memo(function CounterTwoValueMemo(
  props: Pick<IMyState, 'counter2'>
) {
  return (
    <div>
      {useRenderCounter('CounterTwoValueMemo')} {props.counter2}
    </div>
  );
});

function CounterOneButton() {
  const myState = useMyState();
  return (
    <>
      {useRenderCounter('CounterOneButton')}{' '}
      <CounterOneButtonMemo setCounter1={myState.setCounter1} />
    </>
  );
}

const CounterOneButtonMemo = memo(function CounterOneButtonMemo(
  props: Pick<IMyState, 'setCounter1'>
) {
  return (
    <div>
      {useRenderCounter('CounterOneButtonMemo')}{' '}
      <button onClick={() => props.setCounter1(prev => prev + 1)}>
        Increment
      </button>
    </div>
  );
});

function CounterTwoButton() {
  const myState = useMyState();
  return (
    <>
      {useRenderCounter('CounterTwoButton')}{' '}
      <CounterTwoButtonMemo setCounter2={myState.setCounter2} />
    </>
  );
}

const CounterTwoButtonMemo = memo(function CounterTwoButtonMemo(
  props: Pick<IMyState, 'setCounter2'>
) {
  return (
    <div>
      {useRenderCounter('CounterTwoButtonMemo')}{' '}
      <button onClick={() => props.setCounter2(prev => prev + 1)}>
        Increment
      </button>
    </div>
  );
});

function Unrelated() {
  return <>{useRenderCounter('Unrelated')}</>;
}

interface IMyState {
  counter1: number;
  counter2: number;
  setCounter1: Dispatch<SetStateAction<number>>;
  setCounter2: Dispatch<SetStateAction<number>>;
}

const MyStateContext = createContext<IMyState | undefined>(undefined);
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
