import React, { useState, useEffect } from "react";
import { Box, Badge, Image, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

export default function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=6c9a527c853a44339dfa80363e9f5834&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("error");
      });
  }, [meal.id]);

 // console.log(meal);
  return (

    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={imageUrl} alt='recipe' />

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            Preparation time: {meal.readyInMinutes} minutes &bull; Number of servings: {meal.servings}
          </Box>
        </Box>

        <Box mt='1' fontWeight='semibold' as='h5' lineHeight='tight' noOfLines={1}>
          {meal.title}
        </Box>
        <Box>
          <Box as='span' color='gray.600' fontSize='sm'>
          <a href={meal.sourceUrl}>Go to Recipe</a>
          </Box>
        </Box>
        <Box display='flex' mt='2' alignItems='center' color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>
          <Box as='span' ml='2'>
            Preparation time: {meal.readyInMinutes} minutes
          </Box>
          <Box as='span' mr='2'>
           servings: {meal.servings}
          </Box>
        </Box>

      </Box>
    </Box>

  );
}