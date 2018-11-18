$(document).foundation();

(function() {
  // Detect request animation frame
  var load =
    window.requestAnimationFrame ||
    // IE Fallback
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  function slideUp(el) {
    $(el).addClass("is--visible");
    load(slideUp);
  }

  function openSearch() {
    $(".pokedex-section").on("click", function() {
      $(".pokedex-section--back").addClass("is-open");
    });
  }

  function closeSearch() {
    $(".search-close--btn").on("click", function(e) {
      e.stopPropagation();
      console.log("close");
      $(".pokedex-section--back").removeClass("is-open");
      $("#pokeDetails").empty();
      $("#pokeInput").val("");
    });
  }

  function pokeData() {
    var pokeName = $("#pokeInput")
      .val()
      .toLowerCase();
    var pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + pokeName + "/";
    var pokeImage = "http://pokestadium.com/sprites/xy/" + pokeName + ".gif";
    console.log(pokeImage);

    // Get Data from Pokeapi
    $.getJSON(pokeUrl, function(data) {
      //console.log(data);
      //console.log(JSON.stringify(data, null, "  "));
      var pokeID = data.id;
      var pokeName = data.name;
      var pokeType1 = data.types[0].type.name;
      if (data.types.length == 2) {
        var pokeType2 = data.types[1].type.name;
      } else var pokeType2 = null;
      var pokeHeight = data.height;
      var pokeWeight = data.weight;

      $.getJSON(pokeUrl, function(data) {
        //var imageURI = data2.sprites.front_default;
        //console.log(data2);
        //console.log(JSON.stringify(data, null, "  "));
        // console.log("Number: ", pokeID);
        // console.log("Name: ", pokeName);
        // console.log("Type 1: ", pokeType1);
        // console.log("Type 2: ", pokeType2);

        //console.log("Image URI: ", imageURI);
        var li = "";
        li += '<li><img src="' + pokeImage + '">';
        li += "<h1>#" + pokeID + " " + pokeName + "</h1>";
        li += "<h5>Type 1: " + pokeType1 + "</h5>";
        if (pokeType2 != null) {
          li += "<h5>Type 2: " + pokeType2 + "</h5>";
        }
        li += "</li>";
        $("#pokeDetails").empty();

        // append new li to listview
        $("#pokeDetails")
          .append(li)
          .promise()
          .done();
      });
    });
  }

  function pokeSubmit() {
    $(".search-btn").on("click", function() {
      pokeData();
    });
  }

  slideUp(".pokedex-type--card");
  openSearch();
  closeSearch();
  pokeSubmit();
})();
