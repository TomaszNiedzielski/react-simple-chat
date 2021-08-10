import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Chat from '../src/index';

const App = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
