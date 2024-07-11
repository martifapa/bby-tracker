import NavBar from '../common/components/Navbar/NavBar';
import PinnedActions from '../features/quickActions/components/PinnedActions';
import LogsContainer from '../features/logs/components/LogsContainer';
import SummaryStatsContainer from '../features/summaryStats/SummaryStats/SummaryStatsContainer';

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
    <SummaryStatsContainer title='Day summary' />
    <button className="go-to-statistics">Statistics</button>
    </>
  );
}

export default App;
