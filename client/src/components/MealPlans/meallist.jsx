import React from "react";
import Meal from "./meal";
import { Box, Badge, SimpleGrid, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

export default function MealList({ mealData, selectedDiet }) {
    const nutrients = mealData.nutrients;
  
    // Filter meals based on selected diet
    const filteredMeals = selectedDiet
      ? mealData.meals.filter((meal) => meal.dishTypes.includes(selectedDiet))
      : mealData.meals;
  
  return (
    
    <div>
       <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Heading size='md'>Macros</Heading>
          <Box p='6'>
            <Box display='flex' alignItems='baseline'>
              <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase' ml='2'>
                {nutrients.calories.toFixed(0)} Calories &bull; {nutrients.carbohydrates.toFixed(0)} Carbohydrates  &bull;  {nutrients.fat.toFixed(0)} Fat
              </Box>
            </Box>
          </Box>
        </Box>
      <SimpleGrid spacing={2} templateColumns='repeat(3, 1fr)' alignItems='center'>
       
        {filteredMeals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </SimpleGrid>

      {/* <section className="meals">
      {filteredMeals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </section> */}
    </div>
  );
}