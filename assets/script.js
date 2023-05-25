//set variables
let apiKey = '78cfe3cd7a5b4fcba48601e913f2d073';
let savedSearches = [];

//butten event listener on form
$("#search-form").on("submit", function (event) {
    event.preventDefault();

    //get UPC
    let UPC = $("#UPC-input").val();

    //ensure something is entered and it is 10 digits
    if (UPC === "" || UPC == null || UPC.legnth > 10 || UPC.legnth < 10) {
        alert("We need to change this to a notification in Bulma");
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
        .then(function (responce) {
            return responce.json();
        })
        .then(function (responce) {
            //searchHistoryList(itemName)

            let currentItemContainer = $("#display-container");

            //add item name, img, badges, fat, protien, carbs, and calories
            let currentName = $("#item-name");
            currentName.text(responce.title);

            let currentImg = $("#item-img");
            let currentImgSrc = responce.images[1];
            currentImg.attr("src", `${currentImgSrc}`)

            let currentBadges = $("#item-badges");
            currentBadges.text(responce.badges + responce.importantBadges);

            let currentFat = $("#item-fat");
            currentFat.text("Total Fat: " + responce.nutrition.fat);

            let currentProtein = $("#item-protein");
            currentProtein.text("Total Protein: " + responce.nutrition.protein);

            let currentCarbs = $("#item-carbs");
            currentCarbs.text("Total Carbs: " + responce.nutrition.carbs);

            let currentCalories = $("#item-calories");
            currentCalories.text("Total Calories: " + responce.nutrition.calories);
        })
};