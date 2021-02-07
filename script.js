const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button')
const foodImage = document.getElementById('food-image');
const foodName = document.getElementById('food-name');
const ingredientTitle = document.getElementById('ingredient-header');
const ingredientsList = document.getElementById('ingredients-list');
const ingredient1 = document.getElementById('ingredient1');
const ingredient2 = document.getElementById('ingredient2');
const ingredient3 = document.getElementById('ingredient3');
const ingredient4 = document.getElementById('ingredient4');
const ingredient5 = document.getElementById('ingredient5');

let allData;
searchButton.addEventListener('click', function() {
    const foodName = searchBox.value;
    const foodItems = document.getElementById('food-list');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(response => response.json())
        .then(data => {
            allData = data.meals;
            data.meals.map(x => {
                // Creating div to show the food matched with searched keyword
                const div = document.createElement("div");
                div.className = "col-md-4 food-cart";
                div.id = `${x.idMeal}`;

                div.onclick = () => foodIngredient(x.idMeal);
                const foodName = document.createElement("h4");
                const foodImage = document.createElement('img');
                foodImage.src = `${x.strMealThumb}`;
                const captureFoodName = document.createTextNode(`${x.strMeal}`);

                foodName.appendChild(captureFoodName);
                div.appendChild(foodImage);
                div.appendChild(foodName);

                return foodItems.appendChild(div);
            })
        })
    searchBox.value = '';
})
const foodIngredient = id => {
    ingredientsList.style.display = 'block';
    foodImage.style.display = 'block';
    allData.find(x => {
        if (x.idMeal === id) {
            foodImage.src = x.strMealThumb;
            foodName.innerText = x.strMeal;
            ingredientTitle.innerText = 'Ingredients';

            ingredient1.innerText = x.strIngredient1;
            ingredient2.innerText = x.strIngredient2;
            ingredient3.innerText = x.strIngredient3;
            ingredient4.innerText = x.strIngredient4;
            ingredient5.innerText = x.strIngredient5;
        }
    })
}