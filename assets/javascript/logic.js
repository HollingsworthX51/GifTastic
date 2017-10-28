// ----- Game Variables ----- //

// Initial array of heroes
var heroArr = ["spiderman", "superman", "wonderwoman", "moonknight", "captain america",
"ironman", "thor", "hank pym", "martian manhunter",
"captain marvel", "doctor fate", "starlord", "human torch",
"adam warlock", "dr strange", "squirrel girl"];


function renderButtons() {

$("#buttonPanel").empty();

// Loop
for (var i = 0; i < heroArr.length; i++) {
//generate a button for each

var button = $("<button>");
button.addClass("heroButton");
button.attr("data-hero", heroArr[i]);
button.text(heroArr[i]);

// Add the button to the HTML
$("#buttonPanel").append(button);
}
}

$("#add-hero").on("click", function(event) {
event.preventDefault();


var hero = $("#hero-input").val().trim();

heroArr.push(hero);
$("#hero-input").val("");

renderButtons();
});

function fetchHeroGifs() {

var heroName = $(this).attr("data-hero");
var heroStr = heroName.split(" ").join("+");

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroStr + 
"&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";

// Make the AJAX call
$.ajax({
method: "GET",
url: queryURL,
})
.done(function( result ) {
// results array
var dataArray = result.data;


$("#gifPanel").empty();
for (var i = 0; i < dataArray.length; i++) {
var newDiv = $("<div>");
newDiv.addClass("heroGif");

var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
newDiv.append(newRating);

var newImg = $("<img>");
newImg.attr("src", dataArray[i].images.fixed_height_still.url);
newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
newImg.attr("data-state", "still");
newDiv.append(newImg);


$("#gifPanel").append(newDiv);
}
});
}


function animateHeroGif() {

var state = $(this).find("img").attr("data-state");

// animate depending on data state
if (state === "still") {
$(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
$(this).find("img").attr("data-state", "animate");
} else {
$(this).find("img").attr("src", $(this).find("img").attr("data-still"));
$(this).find("img").attr("data-state", "still");
}
}

$(document).ready(function() {
renderButtons();
});

$(document).on("click", ".heroButton", fetchHeroGifs);

$(document).on("click", ".heroGif", animateHeroGif);