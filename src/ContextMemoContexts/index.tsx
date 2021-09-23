import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import useRenderCounter from '../useRenderCounter';

export default function SelectorsNeededContextOptimized() {
  return (
    <>
      {useRenderCounter('Scenario')}

      <h1>Context - memo contexts</h1>

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
  const counter1 = useCounter1Value();
  const counter2 = useCounter2Value();

  return (
    <div>
      {useRenderCounter('BothCounters')} {counter1} | {counter2}
    </div>
  );
}

function CounterOneValue() {
  const counter1 = useCounter1Value();

  return (
    <div>
      {useRenderCounter('CounterOneValue')} {counter1}
    </div>
  );
}

function CounterTwoValue() {
  const counter2 = useCounter2Value();

  return (
    <div>
      {useRenderCounter('CounterTwoValue')} {counter2}
    </div>
  );
}

function CounterOneButton() {
  const setCounter1 = useSetCounter1();

  return (
    <div>
      {useRenderCounter('CounterOneButton')}{' '}
      <button onClick={() => setCounter1(prev => prev + 1)}>Increment</button>
    </div>
  );
}

function CounterTwoButton() {
  const setCounter2 = useSetCounter2();

  return (
    <div>
      {useRenderCounter('CounterTwoButton')}{' '}
      <button onClick={() => setCounter2(prev => prev + 1)}>Increment</button>
    </div>
  );
}

function Unrelated() {
  return <>{useRenderCounter('Unrelated')}</>;
}

const Counter1ValueContext = createContext<number | undefined>(undefined);
const Counter2ValueContext = createContext<number | undefined>(undefined);
const SetCounter1Context = createContext<
  Dispatch<SetStateAction<number>> | undefined
>(undefined);
const SetCounter2Context = createContext<
  Dispatch<SetStateAction<number>> | undefined
>(undefined);
function MyStateProvider(props: { children: ReactNode }) {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  return (
    <Counter1ValueContext.Provider value={counter1}>
      <Counter2ValueContext.Provider value={counter2}>
        <SetCounter1Context.Provider value={setCounter1}>
          <SetCounter2Context.Provider value={setCounter2}>
            {props.children}
          </SetCounter2Context.Provider>
        </SetCounter1Context.Provider>
      </Counter2ValueContext.Provider>
    </Counter1ValueContext.Provider>
  );
}
function useCounter1Value() {
  const context = useContext(Counter1ValueContext);
  if (context === undefined) {
    throw new Error(
      'useCounter1Value must be used within a Counter1ValueContext'
    );
  }
  return context;
}
function useCounter2Value() {
  const context = useContext(Counter2ValueContext);
  if (context === undefined) {
    throw new Error(
      'useCounter2Value must be used within a Counter2ValueContext'
    );
  }
  return context;
}
function useSetCounter1() {
  const context = useContext(SetCounter1Context);
  if (context === undefined) {
    throw new Error('useSetCounter1 must be used within a SetCounter1Context');
  }
  return context;
}
function useSetCounter2() {
  const context = useContext(SetCounter2Context);
  if (context === undefined) {
    throw new Error('useSetCounter2 must be used within a SetCounter2Context');
  }
  return context;
}
