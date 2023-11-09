import React, { useState, useEffect } from "react";
import MealList from "./meallist";
import { Text } from '@chakra-ui/react';

function MealPlan({ selectedDiet }) {
  const [mealData, setMealData] = useState(null);
  
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=6c9a527c853a44339dfa80363e9f5834&timeFrame=day&diet={selectedDiet}`
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