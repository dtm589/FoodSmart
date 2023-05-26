//set variables
let apiKey = '78cfe3cd7a5b4fcba48601e913f2d073';
let savedSearches = [];

//butten event listener on form
$("#search-form").on("submit", function (event) {
    event.preventDefault();

    //get UPC
    let UPC = $("#UPC-input").val();
    //ensure something is entered and it is 10 digits, AND ONLY DIGITS
    if (UPC === "" || UPC.length !== 12) {
        let errorDisplay = $('<div class="notification">Please enter a UPC code with 12 digits.<button class="delete"></button></div>');
        $("form").after(errorDisplay);        

    } else {
        //add to search history list and display item
        currentUPCsearch(UPC);
    }
    
    // deletes notification
    $(".delete").on("click", function(){
        console.log("buttonClicked")
        $(".notification").remove();
    });

    //reset input
    $("#UPC-input").val("");
});



//make a list of searched cities
let searchHistoryList = function (itemName) {

    //no duplicate 
    $('.past-search:contains("' + UPC + '")').remove();

    //create entry with item name
    let serachHistoryEntry = $("<h5>");
    serachHistoryEntry.text(itemName);

    //create container for each entry
    let searchEntryContainer = $("<div>")

    //append entry to container, and container to search history container
    searchEntryContainer.append(serachHistoryEntry);
    let searchHistoryContainerEl = $("# "); //NEED TO ADD THE ID OF THE CONTAINER IN THE HTML
    searchHistoryContainerEl.append(searchEntryContainer);

    if (savedSearches.length > 0) {
        let previousSavedSearches = localStorage.getItem("savedSearches");
        savedSearches = JSON.parse(previousSavedSearches);
    }

    //add searched item to array of searches
    savedSearches.push(itemName);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
}

//load saved history entries into the container

// Will display the current item
let currentUPCsearch = function (UPC) {
    //get data from API
    fetch(`https://api.spoonacular.com/food/products/upc/${UPC}?apiKey=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            //add item name, img, badges, fat, protien, carbs, and calories
            let currentName = $("#item-name");
            currentName.text(response.title);
            let itemName = currentName.val();

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

            searchHistoryList(itemName)
        })
};