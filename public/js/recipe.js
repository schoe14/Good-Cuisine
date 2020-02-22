$(document).ready(function () {
   dietNameArray = [
      {
         dietName: "Balanced",
         dietId: "balanced"
      },
      {
         dietName: "High in Protein",
         dietId: "high-protein"
      },
      {
         dietName: "High in Fiber",
         dietId: "high-fiber"
      },
      {
         dietName: "Low in Fat",
         dietId: "low-fat"
      },
      {
         dietName: "Low in Carbs",
         dietId: "low-carbs"
      },
      {
         dietName: "Low Sodium",
         dietId: "low-sodium"
      }
   ];
   keyWordArray = [
      {
         keyWord: "Chicken",
         keyId: "chicken"
      },
      {
         keyWord: "Beef",
         keyId: "beef"
      }
      {
         keyWord: "Vegetarian",
         keyId: "vegetarian"
      },
      {
         keyWord: "Fish",
         keyId: "fish"
      },
      {
         keyWord: "Salad",
         keyId: "salad"
      },
      {
         keyWord: "Vegan",
         keyId: "vegan"
      }
   ]

   // https://api.edamam.com/search?q=steak&app_id=587fc9a8&app_key=f056ebfd3a725524f2a06d2a64636a39&dietLabels=balanced
   // https://api.edamam.com/search?q=steak&app_id=587fc9a8&app_key=f056ebfd3a725524f2a06d2a64636a39&dietLabels=balanced
   // keeping check box version just in case

   // <input class="diet" type="checkbox" id=${element.dietId} name=${element.dietName} value=${element.dietId}>
   // <label for=${element.dietId}>${element.dietName}</label>
   // <br>

   dietNameArray.forEach(function (element) {
      let dietOptions = /*html*/`
      <div class="custom-control custom-radio custom-control-inline">
         <input type="radio" class="custom-control-input diet" id=${element.dietId} name="dietRadio" value=${element.dietId}>
         <label class="custom-control-label" for=${element.dietId}>${element.dietName}</label>
      </div>
      `
      $('.dietCheckbox').append(dietOptions);

   });

   // cuisineTypeArray.forEach(function (element) {
   //    let cuisineOptions = /*html*/`
   //    <input class="cuisine" type="checkbox" id=${element.cuisineId} name=${element.cuisineName} value=${element.cuisineId}>
   //    <label for=${element.cuisineId}>${element.cuisineName}</label>
   //    <br>
   //    `
   //    $('.cuisineCheck').append(cuisineOptions);

   // });

   $('#checkDiet').click(function () {
      let query = ""
      $('.diet').each(function() {
         if ($(this).is(":checked")) {
            console.log($(this).val());
         }
      });
   });
   $('#checkCuisine').click(function () {
      $('.cuisine').each(function() {
         if ($(this).is(":checked")) {
            console.log($(this).val());
         }
      });
   });


   $('#search').click(function () {

      let cuisine = []
      let diet = []

      $('.cuisine').each(function () {
         if ($(this).is(":checked")) {
            var checkedValue = $(this).val()
            cuisine.push(checkedValue)
         }
      });
      $('.diet').each(function () {
         if ($(this).is(":checked")) {
            var checkedValue = $(this).val()
            diet.push(checkedValue)
         }
      });

      var cuisineType = "";
      cuisine.forEach(function (i) {
         cuisineType += "&cuisineType=" + i
      })

      var dietType = "&dietLabels=" + diet[0];

      let test = "steak"
      let appId = "&app_id=587fc9a8";
      let APIKey = "&app_key=f056ebfd3a725524f2a06d2a64636a39";
      let queryURL = "https://api.edamam.com/search?q=" + test + appId + APIKey + dietType;
      console.log(queryURL)
      $.ajax({
         url: queryURL,
         method: "GET"
      }).then(function (response) {
         console.log(queryURL);
         console.log(response);
      });
   });


});

