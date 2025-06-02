// components/Navigation/Navigation.jsx
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">PAGE</Link>
      </div>
      
      <div className="nav-links">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </Link>
        <Link 
          to="/projects" 
          className={location.pathname === '/projects' ? 'active' : ''}
        >
          Projects
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;