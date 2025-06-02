// components/Home/Home.jsx
import TextAnimation from '../TextAnimation/TextAnimation';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="text-animation-container">
        <TextAnimation />
      </div>
    </div>
  );
};

export default Home;