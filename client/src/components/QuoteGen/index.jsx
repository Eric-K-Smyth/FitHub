import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';

function QuoteComponent() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuote = async (category) => {
      setLoading(true); // Set loading state to true while fetching data
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/quotes?category=${category}`,
          {
            headers: {
              'X-Api-Key': 'VynOTo64Gtut43yD1Vx8kA==xyUgXYxP71liyLTP', // Replace with new API key when needed
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setQuote(data[0].quote); // Update the state with the fetched quote
        } else {
          const errorData = await response.text();
          setError(`Error: ${response.status} - ${errorData}`);
        }
      } catch (error) {
        setError('Request failed: ' + error.message);
      } finally {
        setLoading(false); // Set loading state to false, whether the request succeeds or fails
      }
    };

    fetchQuote('fitness'); // Change the category as needed
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {quote && <Text as='i' fontSize="1.5em" color={'gray.600'}>{quote}</Text>}
      
      {error && <p>{error}</p>}
    </div>
  );
}

export default QuoteComponent;
