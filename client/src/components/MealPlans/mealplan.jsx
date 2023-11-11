import React, { useState, useEffect } from "react";
import MealList from "./meallist";
import { Text } from '@chakra-ui/react';

function MealPlan({ selectedDiet }) {
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
    <div>
      {mealData && <MealList mealData={mealData} selectedDiet={selectedDiet} />}
    </div>
  );
}

export default MealPlan;