const search = document.getElementById('search-box');
const submit = document.getElementById('search-button')
const foodImage = document.getElementById('food-image');
const foodName = document.getElementById('food-name');
const ingredientTitle = document.getElementById('ingredient-header');
const ingredientsList = document.getElementById('ingredients-list');

let allData;
submit.addEventListener('click', function() {
    const foodName = search.value;
    const foodItems = document.getElementById('food-list');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(response => response.json())
        .then(data => {
            allData = data.meals;
            data.meals.map(x => {
                const div = document.createElement("div");
                div.className = "col-md-4 food-cart";
                div.id = `${x.idMeal}`;

                div.onclick = () => foodIngredient(x.idMeal);
                const foodName = document.createElement("h4");
                const foodImage = document.createElement('img');
                foodImage.src = `${x.strMealThumb}`;
                const node = document.createTextNode(`${x.strMeal}`);
                
                foodName.appendChild(node);
                div.appendChild(foodImage);
                div.appendChild(foodName);
                
                return foodItems.appendChild(div);
            })
        })
})
const foodIngredient = id => {
    allData.find(x => {
        if(x.idMeal === id){
            foodImage.src = x.strMealThumb;
            foodName.innerText = x.strMeal;
            ingredientTitle.innerText = 'Ingredients';
            for(let i = 1; i<=5; i++){
                const ingredient = document.createElement("li");
                const str = "strIngredient";
                //console.log(value);
                ingredient.innerText = x.strIngredient1;
                ingredientsList.appendChild(ingredient);
            }
        }
    })
}