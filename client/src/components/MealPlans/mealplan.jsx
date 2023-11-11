import React, { useState, useEffect } from "react";
import MealList from "./meallist";
import { Box, Text } from '@chakra-ui/react';

function MealPlan({ selectedDiet, title }) {
  const [mealData, setMealData] = useState(null);
  
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=48b7736632544eb59a2ee7b4b3001af3&timeFrame=day&diet=${selectedDiet}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    
      <Box mt='10px' mb='10px'>
        <Text align="left" color={'gray.700'} fontWeight={600} fontSize={'lg'}  mb="2">
            {title}
        </Text>
        {mealData && <MealList mealData={mealData} selectedDiet={selectedDiet} />}
      </Box>
    
  );
}

export default MealPlan;