import { useEffect } from 'react';

import { proxy, useSnapshot } from 'valtio';

import useRenderCounter from '../useRenderCounter';

const stateProxy = proxy({ count: 0 });

function appendButton() {
  const incrementButton = document.createElement('button');
  incrementButton.textContent = 'Increment (Outside)';
  incrementButton.addEventListener('click', () => {
    stateProxy.count++;
  });
  document.body.appendChild(incrementButton);

  const valueButton = document.createElement('button');
  valueButton.textContent = 'Get Value (Outside)';
  valueButton.addEventListener('click', () => {
    alert('Count: ' + stateProxy.count);
  });
  document.body.appendChild(valueButton);
}

export default function ValtioInsideAndOutsideReact() {
  useEffect(() => {
    appendButton();
  }, []);

  return (
    <>
      {useRenderCounter('Scenario')}

      <h1>Valtio inside and outside</h1>

      <GetValueInside />
      <SetValueInside />
      <Unrelated />
    </>
  );
}

function GetValueInside() {
  const state = useSnapshot(stateProxy);

  return (
    <div>
      {useRenderCounter('GetValueInside')} {state.count}
    </div>
  );
}

function SetValueInside() {
  return (
    <div>
      {useRenderCounter('SetValueInside')}{' '}
      <button onClick={() => stateProxy.count++}>Increment (Inside)</button>
    </div>
  );
}

function Unrelated() {
  return <>{useRenderCounter('Unrelated')}</>;
}
