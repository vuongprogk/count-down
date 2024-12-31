import Countdown from './Countdown';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black-900 text-gray-300">
      <div className="text-center">
        <Countdown />
      </div>
    </div>
  );
};

export default App;
