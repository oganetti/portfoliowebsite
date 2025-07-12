// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import MyProjects from './components/MyProjects/MyProjects';
import Technologies from './components/Technologies/Technologies';
import Navigation from './components/Navigation/Navigation';
import Contact from './components/Contact/Contact';
import CV from './components/CV/CV';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<MyProjects />} />
          <Route path="/technologies" element={<Technologies />} />
           <Route path="/contact" element={<Contact />} />
          <Route path="/cv" element={<CV />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;