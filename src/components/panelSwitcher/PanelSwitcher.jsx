// components/PanelSwitcher.jsx
import { useNavigate } from 'react-router-dom';

const PanelSwitcher = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const switchPanel = (panel) => {
    if (user && user.role === panel) {
      navigate(`/${panel}`);
    } else {
      alert(`You don't have access to ${panel} panel`);
    }
  };
  
  return (
    <div className="panel-switcher">
      <button onClick={() => switchPanel('patient')}>Patient Panel</button>
      <button onClick={() => switchPanel('doctor')}>Doctor Panel</button>
      <button onClick={() => switchPanel('admin')}>Admin Panel</button>
    </div>
  );
};

export default PanelSwitcher;