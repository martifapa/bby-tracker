import PinnedActions from '../features/quickActions/components/PinnedActions';
import LogsContainer from '../features/logs/components/LogsContainer';
import SummaryStatsContainer from '../features/summaryStats/SummaryStats/SummaryStatsContainer';

import { createPortal } from 'react-dom';
import '../common/reset.css';
import '../common/App.css';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  
  const goToStatsPage = () => {
    navigate('/statistics');
  }

  return (
    <>
    {createPortal(
        <div className="overlay"></div>,
        document.body
    )}
    
    <PinnedActions />
    <LogsContainer title='Log history' />
    <SummaryStatsContainer title='Day summary' />
    <button
      className="button"
      onClick={goToStatsPage}
    >Statistics</button>
    </>
  );
}

export default App;
