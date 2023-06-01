//set variables
let apiKey = '78cfe3cd7a5b4fcba48601e913f2d073';

// add event listener for sumbit button
$("#diets").on("submit", function (event) {
    event.preventDefault();

    //get the value entered in the drop box
    let dietChoice = $("#dietSelect").val(); 

    //call the function to make the api fetch
    currentdietSearch(dietChoice);
})

//make the fetch request with the diet selected
let currentdietSearch = function (dietChoice) {
    //make api hit
    fetch(`https://api.spoonacular.com/mealplanner/generate?timeFrame=day&diet=${dietChoice}&apiKey=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        // dynamically create the 3 recipes names, photos, and url from the responce
        .then(function (response) {

            //recipe 1 info
            let recipeName1 = $("#recipeName1");
            recipeName1.text(response.meals[0].title)

            let recipeImage1 = $("#recipeImage1");
            let recipeImage1ID = response.meals[0].id;
            recipeImage1.attr("src", `https://spoonacular.com/recipeImages/${recipeImage1ID}-312x231.jpg`);

            let recipeURL1 = $("#recipeLink1");
            let recipeURL1Src = response.meals[0].sourceUrl;
            recipeURL1.attr("href", `${recipeURL1Src}`);
            recipeURL1.text(recipeURL1Src);

            //recipe 2 info
            let recipeName2 = $("#recipeName2");
            recipeName2.text(response.meals[1].title)

            let recipeImage2 = $("#recipeImage2");
            let recipeImage2ID = response.meals[1].id;
            recipeImage2.attr("src", `https://spoonacular.com/recipeImages/${recipeImage2ID}-312x231.jpg`);

            let recipeURL2 = $("#recipeLink2");
            let recipeURL2Src = response.meals[1].sourceUrl;
            recipeURL2.attr("href", `${recipeURL2Src}`);
            recipeURL2.text(recipeURL2Src)

            //recipe 3 info
            let recipeName3 = $("#recipeName3");
            recipeName3.text(response.meals[2].title)

            let recipeImage3 = $("#recipeImage3");
            let recipeImage3ID = response.meals[2].id;
            recipeImage3.attr("src", `https://spoonacular.com/recipeImages/${recipeImage3ID}-312x231.jpg`);

            let recipeURL3 = $("#recipeLink3");
            let recipeURL3Src = response.meals[2].sourceUrl;
            recipeURL3.attr("href", `${recipeURL3Src}`);
            recipeURL3.text(recipeURL3Src);
        })

        .catch(function (error) {

        })
};

