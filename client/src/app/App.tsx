import NavBar from '../common/components/Navbar/NavBar';
import PinnedActions from '../features/quickActions/PinnedActions/PinnedActions';
import LogsContainer from '../features/logs/LogsContainer/LogsContainer';

import { createPortal } from 'react-dom';
import '../common/reset.css';
import '../common/App.css';


function App() {
  return (
    <>
    {createPortal(
        <div className="overlay"></div>,
        document.body
    )}
    <NavBar />
    <PinnedActions />
    <LogsContainer title='Log history' />
    <LogsContainer title='Day summary' />
    <button className="go-to-statistics">Statistics</button>
    </>
  );
}

export default App;
