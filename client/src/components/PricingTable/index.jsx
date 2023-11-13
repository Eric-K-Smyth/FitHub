// import React from 'react';
// import './PricingTable.css';

// const features = [
//   { name: '6 Curated Fitness Routines', free: true, premium: true },
//   { name: 'Daily Calendar Tracker', free: true, premium: true },
//   { name: 'Daily Inspiration Quotes', free: true, premium: true },
//   { name: 'Buildable Custom Fitness Routine', free: false, premium: true },
//   { name: 'Multiple Meal Suggestions a Day', free: false, premium: true },
// ];

// const PricingTable = () => {
//   return (
//     <table className="pricing-table">
//       <thead>
//         <tr>
//           <th>Features</th>
//           <th>Free Plan</th>
//           <th>Premium</th>
//         </tr>
//       </thead>
//       <tbody>
//         {features.map(feature => (
//           <tr key={feature.name}>
//             <td>{feature.name}</td>
//             <td>{feature.free ? '✓' : '✗'}</td>
//             <td>{feature.premium ? '✓' : '✗'}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default PricingTable;
import React from 'react';

const FeaturesList = () => {
  return (
    <ul className='list-style'>
      <li className='list-style-type'>Expansive workout database</li>
      <li className='list-style-type'>Detailed instruction and information about workouts</li>
      <li className='list-style-type'>Daily Inspirational quotes</li>
      <li className='list-style-type'>Meal Suggestions to keep you on track</li>
      <li className='list-style-type'>Personalized, buildable routines saved for your reference</li>
    </ul>
  );
};

export default FeaturesList;
