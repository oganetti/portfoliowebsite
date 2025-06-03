// components/Navigation/Navigation.jsx
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
       
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
        <Link 
          to="/technologies" 
          className={location.pathname === '/technologies' ? 'active' : ''}
        >
          Technologies
        </Link>
         <Link 
          to="/contact" 
          className={location.pathname === '/contact' ? 'active' : ''}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;