import React, { useState, useEffect } from "react";
import { Box, Badge, Image, Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

export default function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=48b7736632544eb59a2ee7b4b3001af3&includeNutrition=false`
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
      <Box p='5'>
        <Box mt='1' fontWeight='semibold' as='h5' lineHeight='tight' noOfLines={1}>
          <a href={meal.sourceUrl}>{meal.title}</a>
        </Box>
        <Box display='flex' mt='2' alignItems='center' justifyContent='space-evenly' color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>
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