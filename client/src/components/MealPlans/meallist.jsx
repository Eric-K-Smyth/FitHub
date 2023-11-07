import React from "react";
import Meal from "./meal";

export default function MealList({ mealData, selectedDiet }) {
    const nutrients = mealData.nutrients;
  
    // Filter meals based on selected diet
    const filteredMeals = selectedDiet
      ? mealData.meals.filter((meal) => meal.dishTypes.includes(selectedDiet))
      : mealData.meals;
  
  return (
    <main>
      <section className="nutrients">
        <h1>Macros</h1>
        <ul>
          <li>Calories: {nutrients.calories.toFixed(0)}</li>
          <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
          <li>Fat: {nutrients.fat.toFixed(0)}</li>
          <li>Protein: {nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>

      <section className="meals">
      {filteredMeals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </section>
    </main>
  );
}