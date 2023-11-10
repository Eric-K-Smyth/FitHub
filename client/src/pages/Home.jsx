import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import homePageImage from '../../src/assets/images/training-pic.jpg';
import InfoBlocks from '../components/InfoBlocks/index';
import PricingTable from '../components/PricingTable/index';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const [showPricingTable, setShowPricingTable] = useState(false);

  const handlePricingTableToggle = () => {
    setShowPricingTable(!showPricingTable);
  };

  return (
    <main className="main-container">
      <section className="info-section p-5 mb-3">
        <p className='p-5'>We tailor routines to align with your fitness goals. Explore advanced personalization with FitHub Premium.</p>
        
        <button onClick={handlePricingTableToggle} className="btn btn-outline-black">
        {showPricingTable ? "Hide Premium Features" : "Learn more about Premium features"}
        </button>
        
        {showPricingTable && <PricingTable />}
        
      </section>
      <div 
        className="background-image-div" 
        style={{ backgroundImage: `url(${homePageImage})`, 
          backgroundSize: 'cover' 
        }}
      >
        <p className="overlay-text">Build a custom plan that works for you.</p>
      </div>
      <section className="signup-section">
        <p>Invest in Your Future Fitness Goals</p>
          <Link to="/signup" className="btn btn-outline-black">
          Sign Up Today!
          </Link>
      </section>
      <InfoBlocks />
    </main>
  );
};

export default Home;
