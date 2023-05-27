//set variables
let apiKey = '78cfe3cd7a5b4fcba48601e913f2d073';
let savedSearches = [];

//butten event listener on form
$("#search-form").on("submit", function (event) {
    event.preventDefault();

    //get UPC
    let UPC = $("#UPC-input").val();

//ensure something is entered and it is 10 digits
if (UPC === "" || UPC == null || UPC.trim().length > 10 || isNaN(UPC)) {
    alert("Please enter a valid UPC code.");
    event.preventDefault();
} else {
    //add to search history list and display item
    currentUPCsearch(UPC);
}

    //reset input
    $("#UPC-input").val("");
});

// Will display the current item
let currentUPCsearch = function (UPC) {
    //get data from API
    fetch(`https://api.spoonacular.com/food/products/upc/${UPC}?apiKey=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            //searchHistoryList(itemName)

            let currentItemContainer = $("#display-container");

            //add item name, img, badges, fat, protien, carbs, and calories
            let currentName = $("#item-name");
            currentName.text(response.title);

            let currentImg = $("#item-img");
            let currentImgSrc = response.images[1];
            currentImg.attr("src", `${currentImgSrc}`)

            let currentBadges = $("#item-badges");
            currentBadges.text(response.badges + response.importantBadges);

            let currentFat = $("#item-fat");
            currentFat.text("Total Fat: " + response.nutrition.fat);

            let currentProtein = $("#item-protein");
            currentProtein.text("Total Protein: " + response.nutrition.protein);

            let currentCarbs = $("#item-carbs");
            currentCarbs.text("Total Carbs: " + response.nutrition.carbs);

            let currentCalories = $("#item-calories");
            currentCalories.text("Total Calories: " + response.nutrition.calories);
        })
};