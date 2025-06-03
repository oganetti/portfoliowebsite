// components/Home/Home.jsx
import TextAnimation from '../TextAnimation/TextAnimation';
import SplitTextDemo from '../SplitTextDemo/SplitTextDemo';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="text-animation-container">
        <TextAnimation />
      </div>
       {/* <div className="split-text-section">
          <SplitTextDemo />
        </div> */}
    </div>
  );
};

export default Home;
