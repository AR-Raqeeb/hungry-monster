// Getting all the necessary elements by their id
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button')
const foodImage = document.getElementById('food-image');
const foodName = document.getElementById('food-name');
const ingredientTitle = document.getElementById('ingredient-header');
const ingredientsList = document.getElementById('ingredients-list');
// A global variable to store all data from API
let allData;
// adding event-handler in the search button
searchButton.addEventListener('click', function() {
    const foodName = searchBox.value;
    // making the previous food items invisible when a new search occurs
    const foodItems = document.getElementById('food-list');
    foodItems.innerHTML = '';
    // making the previous ingredient section invisible when a new search occurs
    const ingredientDiv = document.getElementById("ingredient");
    ingredientDiv.style.display = 'none';
    // keeping error message invisible until needed
    document.getElementById("error-message").innerHTML = '';
    // fetching data from API and converting them into JSON
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(response => response.json())
        .then(data => {

            allData = data.meals;
            data.meals.map(allFood => {
                // Creating div to show the food matched with searched keyword
                const div = document.createElement("div");
                div.className = "col-md-4 food-cart";
                div.id = `${allFood.idMeal}`;
                // Enabling onclick functionality for every food card separately
                div.onclick = () => foodIngredient(allFood.idMeal);
                const foodName = document.createElement("h4");
                const foodImage = document.createElement('img');
                foodImage.src = `${allFood.strMealThumb}`;
                const captureFoodName = document.createTextNode(`${allFood.strMeal}`);
                // Appending child into their parent nodes
                foodName.appendChild(captureFoodName);
                div.appendChild(foodImage);
                div.appendChild(foodName);

                return foodItems.appendChild(div);
            })
        })
        // Catching error when the keyword is not matched with the database
        .catch((error) =>
            errorMessage("Sorry! No result found...Please search something else.")
        );
    searchBox.value = '';
})

// Error message function
const errorMessage = error => {
    const errorAlert = document.getElementById("error-message");
    errorAlert.innerText = error;
}

// Working with the food ingredients section that appears when clicked on a food card
const foodIngredient = id => {
    const ingredientDiv = document.getElementById("ingredient");
    ingredientDiv.style.display = 'block';
    ingredientsList.style.display = 'block';
    foodImage.style.display = 'block';

    allData.find(allFood => {
        if (allFood.idMeal === id) {
            // Assigning data into the image and header tags
            foodImage.src = allFood.strMealThumb;
            foodName.innerText = allFood.strMeal;
            ingredientTitle.innerText = 'Ingredients';
            // showing the ingredients for a particular food item
            ingredient1.innerText = allFood.strIngredient1;
            ingredient2.innerText = allFood.strIngredient2;
            ingredient3.innerText = allFood.strIngredient3;
            ingredient4.innerText = allFood.strIngredient4;
            ingredient5.innerText = allFood.strIngredient5;
            ingredient6.innerText = allFood.strIngredient6;
            ingredient7.innerText = allFood.strIngredient7;
        }
    })
}