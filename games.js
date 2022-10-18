/*
 * foods.js
 * Functions to run the web app which gets its data from the foods
 * playerser. The playerser (node express) runs at 45.79.21.82:3002
 */

/*
 * Our only global code: calling main when the DOM loading is complete.
 */
$(pageLoadedMain);

/*
 * Once the DOM has loaded, load food names into nav
 * and add listeners.
 */
function pageLoadedMain() {
    loadGameNamesIntoNav();
}


/*
 * Creates an unordered list of food names from the foods in the database,
 * and places it in the navigation section of the page.
 */
function loadGameNamesIntoNav() {
    console.log("Sending request to names");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("Names callback");
        console.log("Response is " + this.response);
        let rows = JSON.parse( this.response);
        var $foodListing = $("<ul>"); // jQuery node for an unordered list
        rows.forEach( function( row) {
            $aNameItem = $("<li>");   // jQuery node for a list item
            $aNameItem.html( row.name);
            $aNameItem.click( onSelect);
            $foodListing.prepend($aNameItem);
        });
        $("nav").append( $foodListing);
    }

    );
    xhr.open( "GET", "http://45.79.221.107:3040/names");
    xhr.send();
    console.log("Done sending request to names");
} // end loadFoodNamesIntoNav


/*
 * Fills in the information in the main section given the selected food.
 * Called from a click on one of the food names in navigation.
 */
function onSelect() {
    let foodName = $(this).html();
    console.log("onSelect(" + foodName + ")" );
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("Select callback");
        console.log("Response is " + this.response);
        let foodInfos = JSON.parse( this.response);
        let foodInfo = foodInfos[0]; // only get the first row
        $("#name").val( foodInfo.name);
        $("#players").val( foodInfo.size);
        $("#studio").html(foodInfo.sizeunit);
        $("#date").val( foodInfo.cal);
    }

    );
    xhr.open( "GET", "http://45.79.221.107:3007/data?food=" + foodName);
    xhr.send();
    console.log("Done sending request to data?food=" + foodName);
}
