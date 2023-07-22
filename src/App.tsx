import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;
