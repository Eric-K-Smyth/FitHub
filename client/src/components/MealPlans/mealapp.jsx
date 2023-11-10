import React, { useState } from "react";
import MealList from "./meallist";

function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [selectedDiet, setSelectedDiet] = useState(null);


  function getMealData() {
    let apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=6c9a527c853a44339dfa80363e9f5834&timeFrame=day&targetCalories=${calories}`;
  
    if (selectedDiet) {
      apiUrl += `&diet=${selectedDiet}`;
    }
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  function handleDietChange(e) {
    setSelectedDiet(e.target.value);
  }

  return (
    <div className="App">
      <section className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
         <select onChange={handleDietChange}>
        <option value="">Select Diet</option>
        <option value="vegan">Vegan</option>
        <option value="glutenFree">Gluten Free</option>
        
      </select>
        <button onClick={getMealData}>Get Daily Meal Plan</button>
      </section>
      {mealData && <MealList mealData={mealData} selectedDiet={selectedDiet} />}
    </div>
  );
}

export default App;