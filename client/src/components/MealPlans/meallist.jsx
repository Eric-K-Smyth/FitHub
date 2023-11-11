import React from "react";
import Meal from "./meal";
import { Box, SimpleGrid } from '@chakra-ui/react';

export default function MealList({ mealData, selectedDiet }) {
    const nutrients = mealData.nutrients;
  
    // Filter meals based on selected diet
    // const filteredMeals = selectedDiet
    //   ? mealData.meals.filter((meal) => meal.dishTypes.includes(selectedDiet))
    //   : mealData.meals;
  
  const filteredMeals = mealData.meals;
  
  return (
    
    <div>
       <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p="5">
          <Box display='flex' alignItems='baseline'>
            <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='sm' textTransform='uppercase' ml='2'>
            {selectedDiet} &bull; {nutrients.calories.toFixed(0)} Calories &bull; {nutrients.carbohydrates.toFixed(0)} Carbohydrates  &bull;  {nutrients.fat.toFixed(0)} Fat
            </Box>
          </Box>
        </Box>
      <SimpleGrid spacing={2} templateColumns='repeat(3, 1fr)' alignItems='center'>
       
        {filteredMeals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </SimpleGrid>

    </div>
  );
}