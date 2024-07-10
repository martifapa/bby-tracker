import NavBar from '../common/components/Navbar/NavBar';

import '../common/reset.css';
import '../common/App.css';
import PinnedActions from '../features/quickActions/PinnedActions/PinnedActions';
import LogsContainer from '../common/components/LogsContainer/LogsContainer';

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
