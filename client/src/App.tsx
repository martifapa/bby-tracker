import NavBar from './components/Navbar/NavBar';

import './reset.css';
import './App.css';
import PinnedActions from './components/PinnedActions/PinnedActions';
import LogsContainer from './components/LogsContainer/LogsContainer';

function App() {

  return (
    <>
    <NavBar />
    <PinnedActions />
    <LogsContainer title='Log history' />
    <LogsContainer title='Day summary' />
    <button className="go-to-statistics">Statistics</button>
    </>
  )
}

export default App
