import { ReactNode, useState } from 'react';

import Context from './Context';
import ContextMemoComponents from './ContextMemoComponents';
import ContextMemoContexts from './ContextMemoContexts';
import useRenderCounter from './useRenderCounter';
import Valtio from './Valtio';
import ValtioInsideAndOutsideReact from './ValtioInsideAndOutsideReact';

export default function App() {
  const [scenario, setScenario] = useState<ReactNode>();

  return (
    <div className="App">
      {useRenderCounter('App')}

      {scenario ? (
        scenario
      ) : (
        <>
          <br />
          <br />

          <button onClick={() => setScenario(<Context />)}>
            Context - plain
          </button>

          <br />
          <br />

          <button onClick={() => setScenario(<ContextMemoContexts />)}>
            Context - with memoed contexts
          </button>

          <br />
          <br />

          <button onClick={() => setScenario(<ContextMemoComponents />)}>
            Context - with memoed components
          </button>

          <br />
          <br />

          <button onClick={() => setScenario(<Valtio />)}>
            Valtio - nothing memoed
          </button>

          <br />
          <br />

          <button onClick={() => setScenario(<ValtioInsideAndOutsideReact />)}>
            Valtio inside and outside of react
          </button>

          <br />
          <br />

          <h3>Pros of Valtio</h3>

          <ul>
            <li>
              Context-less - common ancestor not needed
              <ul>
                <li>
                  Can create at runtime on the fly, does not need transpile time
                  root ("Context - with memoed contexts")
                </li>

                <li>
                  pass around global store safely (across screens/navigators)
                </li>

                <li>
                  or pass as prop for common ancessors (typically if define
                  state within react component, like <code>useState</code>)
                </li>
              </ul>
            </li>

            <li>
              Memoized selectors not needed
              <ul>
                <li>
                  Extra code in wrapping components room for more errors and
                  logic ("Context - with memoed contexts")
                </li>
                <li>
                  After memoed component selects the state, must prop drill from
                  there on. Or wrap again with memoed component to select.
                  (large object selected) ("Context - with memoed contexts")
                </li>

                <li>
                  Allows holding large object{' '}
                  <code>Record&lt;TaskId, TaskState&gt;</code> without having to
                  memoize select slices (re-reselect)
                </li>
              </ul>
            </li>

            <li>
              Can use within react context and outside of it (stays in sync)
            </li>
            <li>Less code</li>
          </ul>
        </>
      )}
    </div>
  );
}
