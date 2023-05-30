let apiKey = '78cfe3cd7a5b4fcba48601e913f2d073';

// creates the header text for the recipe search
let recipeBox = $("<div>");
recipeBox.addClass('box center');
recipeBox.text('Search Recipes by Dietary Restrictions');
$("body").append(recipeBox);

// adds the dropdown box with selections
let selectEl = $('<div class="select is-success bulma-control-mixin is-medium"></div>');
let selectDiet = $('<select id="ddl"></select>');
let selectBox = $('<option>Select Diet</option>')
let selectVeg = $('<option>Vegetarian</option>');
let selectVegan = $('<option>Vegan</option>');
let selectPesc = $('<option>Pescetarian</option>');
let selectGluten = $('<option>Gluten Free</option>');
recipeBox.after(selectEl);
$(".select").append(selectDiet);
selectDiet.append(selectBox);
selectDiet.append(selectVeg);
selectDiet.append(selectVegan);
selectDiet.append(selectPesc);
selectDiet.append(selectGluten);

// grabs the value for each dropdown diet selection
let getOptionsVal = $(function (){
    $('#ddl').change(function(){
        let options = $("select option:selected").val();

// API key for searching recipes by diet
let dietOptions = function() {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?diet=${options}&apiKey=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            



        })

}
dietOptions()
})
});



// click on diet and recipe pops up
