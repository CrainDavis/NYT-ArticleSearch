// SET UP VARIABLES
// ===================================================================
var authKey = "2lRid4HN8rWCgrMw5Gw7YYm8Akse5KAa";

var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// URL base
var queryURLbase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// variable to track number of articles
var articleCounter = 0;
// ===================================================================

// FUNCTIONS
// ===================================================================
function runQuery(numArticles, queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(NYTdata) {

        $("#cardSection").empty();

        for (var i = 0; i < numArticles; i++) {
            console.log(NYTdata.response.docs[i].headline.main);
            console.log(NYTdata.response.docs[i].byline.original);
            console.log(NYTdata.response.docs[i].section_name);
            console.log(NYTdata.response.docs[i].pub_date);
            console.log(NYTdata.response.docs[i].web_url);

            // dump to HTML
            var cardSection = $("<div>");
            cardSection.addClass("card");
            cardSection.attr("id", "articleCard-" + i);
            $("#cardSection").append(cardSection);

            // check if content exists before appending
            if (NYTdata.response.docs[i].headline != "null") {
                $("#articleCard-" + i).append("<h2>" + NYTdata.response.docs[i].headline.main + "</h2>").addClass("searchResults");
            }
            if (NYTdata.response.docs[i].byline && NYTdata.response.docs[i].byline.hasOwnProperty("original")) {
                $("#articleCard-" + i).append("<h4>" + NYTdata.response.docs[i].byline.original + "</h4>").addClass("searchResults");
            }

            // attach content to appropriate card
            $("#articleCard-" + i).append("<h6>" + NYTdata.response.docs[i].section_name + "</h6>").addClass("searchResults");
            $("#articleCard-" + i).append("<h6>" + NYTdata.response.docs[i].pub_date + "</h6>").addClass("searchResults");
            $("#articleCard-" + i).append("<a href=" + NYTdata.response.docs[i].web_url + ">" + NYTdata.response.docs[i].web_url + "</a>").addClass("searchResults");
        }
        // logging to console
        console.log(queryURL);
        console.log(numArticles);
        console.log(NYTdata);
    })
}
// ===================================================================

// MAIN PROCESSES
// ===================================================================
$("#searchBtn").on("click", function() {
    event.preventDefault();

    queryTerm = $("#search").val().trim();

    // add in the SEARCH TERM
    var newURL = queryURLbase + "&q=" + queryTerm;

    // get the NUMBER OF RECORDS
    numResults = $("#numRecords").val();

    // get the START YEAR and END YEAR and add to newURL variable
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();

    if (parseInt(startYear)) {
        startYear = startYear + "0101";
        newURL = newURL + "&begin_date=" + startYear;
    }

    if (parseInt(endYear)) {
        endYear = endYear + "1231";
        newURL = newURL + "&end_date=" + endYear;
    }

    // send AJAX call the newly assembled URL
    runQuery(numResults, newURL);
})
// ===================================================================