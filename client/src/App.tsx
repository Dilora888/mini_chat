import './App.css';
import Account from './components/Account/Account';
import { FetchPostListView } from './components/PostListView/FetchPostListView';

function App() {
  return <div className="app">
    <Account/>
    <FetchPostListView/>
  </div>;
}

export default App;
