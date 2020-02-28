$(document).ready(function () {
   dietNameArray = [
      {
         dietName: "Balanced",
         dietId: "&diet=balanced"
      },
      {
         dietName: "High in Protein",
         dietId: "&diet=high-protein"
      },
      {
         dietName: "High in Fiber",
         dietId: "&diet=high-fiber"
      },
      {
         dietName: "Low in Fat",
         dietId: "&diet=low-fat"
      },
      {
         dietName: "Low in Carbs",
         dietId: "&diet=low-carbs"
      },
      {
         dietName: "Low Sodium",
         dietId: "&diet=low-sodium"
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
      },
      {
         keyWord: "Soup",
         keyId: "soup"
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
         keyWord: "Pasta",
         keyId: "pasta"
      }
   ];
   healthLabelsArray = [
      {
         healthLabel: "Vegetarian",
         healthId: "vegetarian"
      },
      {
         healthLabel: "Vegan",
         healthId: "vegan"
      },
      {
         healthLabel: "Paleo",
         healthId: "paleo"
      },
      {
         healthLabel: "Dairy Free",
         healthId: "dairy-free"
      },
      {
         healthLabel: "Gluten Free",
         healthId: "gluten-free"
      },
      {
         healthLabel: "Fat Free",
         healthId: "fat-free"
      },
      {
         healthLabel: "Low Sugar",
         healthId: "low-sugar"
      }
   ];
   calorieAmountArray = [
      {
         calorieDisplay: "Any",
         calorieId: "calorieFour",
         calorieSearch: "&calories=1-5000"
      },
      {
         calorieDisplay: "1 to 200 Calories",
         calorieId: "calorieOne",
         calorieSearch: "&calories=1-200"
      },
      {
         calorieDisplay: "200 to 600 Calories",
         calorieId: "calorieTwo",
         calorieSearch: "&calories=200-600"
      },
      {
         calorieDisplay: "600 to 1000 Calories",
         calorieId: "calorieThree",
         calorieSearch: "&calories=600-1000"
      }
   ]

   keyWordArray.forEach(function (element) {
      let keyWord = /*html*/`
      <div class="custom-control custom-radio custom-control-inline">
         <input type="radio" class="custom-control-input keyWord" id=${element.keyId} name="keyRadio" value=${element.keyId}>
         <label class="custom-control-label" for=${element.keyId}>${element.keyWord}</label>
      </div>
      `
      $('.keyRadio').append(keyWord);

   });

   dietNameArray.forEach(function (element) {
      let dietOptions = /*html*/`
      <div class="custom-control custom-radio custom-control-inline">
         <input type="radio" class="custom-control-input diet" id=${element.dietId} name="dietRadio" value=${element.dietId}>
         <label class="custom-control-label" for=${element.dietId}>${element.dietName}</label>
      </div>
      `
      $('.dietCheckbox').append(dietOptions);

   });

   healthLabelsArray.forEach(function (element) {
      let healthOptions = /*html*/`
      <div class="custom-control custom-checkbox custom-control-inline">
         <input class="health" type="checkbox" id=${element.healthId} name=${element.healthLabel} value=${element.healthId}>
         <label for=${element.healthId}>${element.healthLabel}</label>
         <br>
      <div>
      `
      $('.healthCheck').append(healthOptions);

   });

   calorieAmountArray.forEach(function (element) {
      let calorieAmount = /*html*/`
      <div class="custom-control custom-radio custom-control-inline">
         <input type="radio" class="custom-control-input calorieAmount" id=${element.calorieId} name="calorieRadio" value=${element.calorieSearch}>
         <label class="custom-control-label" for=${element.calorieId}>${element.calorieDisplay}</label>
      </div>
      `
      $('.calorieRadio').append(calorieAmount);

   });


   $('#search').click(function () {

      let key = "";
      let health = [];
      let diet = "";
      let calorie = "";

      $('.keyWord').each(function () {
         if ($(this).is(":checked")) {
            var checkedValue = $(this).val()
            key = checkedValue;
         }
      });
      $('.health').each(function () {
         if ($(this).is(":checked")) {
            var checkedValue = $(this).val()
            health.push(checkedValue);
         }
      });
      $('.diet').each(function () {
         if ($(this).is(":checked")) {
            var checkedValue = $(this).val()
            diet = checkedValue;
         }
      });
      $('.calorieAmount').each(function () {
         if ($(this).is(":checked")) {
            var checkedValue = $(this).val()
            calorie = checkedValue;
         }
      });


      var keyWord = key;
      var healthLabels = "";
      health.forEach(function (i) {
         healthLabels += "&healthLabel=" + i
      });
      var dietType = diet;
      var calorieType = calorie;

      let appId = "&app_id=587fc9a8";
      let APIKey = "&app_key=f056ebfd3a725524f2a06d2a64636a39";
      let queryURL = "https://api.edamam.com/search?q=" + keyWord + appId + APIKey + healthLabels + dietType + calorieType;

      // Add loader before results load
      $("#recipeResults").prepend(`
      <div id="loader">
         <div class="icon"></div>
      </div>
      `);

      // response that parses recipe information to display to page
      function recipeSuccess(response) {
         $('#recipeResults').empty();
         console.log(queryURL);
         console.log(response);

         // creating array to store search results
         const saveArray = [];
         // stores recipe data in array
         for (var i = 0; i < response.hits.length; i++) {
            saveArray.push(response.hits[i].recipe);
         }

         // declaring userid to use to validate if member is signed in
         const userId = $("#userId").data("userid");
         console.log("user id for this saving", userId);

         // maps the results of the search to use in our template literal
         response.hits.map((recipeResult, index) => {
            const {
               image,
               label,
               url,
               calories,
               yield,
               totalTime,
               ingredientLines,
               dietLabels,
               healthLabels
            } = recipeResult.recipe;

            const recipeCardContent = `
               <div class="recipe-image card-img-top" style="background: lightblue url(${image}) no-repeat center/cover";></div>
               <div class="card-body">
                  <h5 class="recipe-name card-title">${label}</h5>
                  <p><a href="${url}" target="_blank" class="recipe-link">View Recipe</a></p>
                  <p>Calories(per serving): <span class="calories">${(calories / yield).toFixed()}</span></p>
                  <p>Total Time: <span class="total-time">${totalTime}</span></p>
                  <p>Ingredients:</p>
                  <ul class="ingredients-list">
                  ${ingredientLines.map(ingredient => (
               `<li>${ingredient}</li>`
            )).join("")}
                  </ul>
                  <p>Diet:</p>
                  <ul class="diet-list">
                  ${dietLabels.map(diets => (
               `<li>${diets}</li>`
            )).join("")}
                  </ul>
                  <p>Health:</p>
                  <ul class="health-list">
                  ${healthLabels.map(healths => (
               `<li>${healths}</li>`
            )).join("")}
                  </ul>
                  <div id=${userId}></div>
                  <button class="btn btn-primary disabled">Save</button>
               </div>
            `;

            let recipeCard = $("<div>")
               .addClass("recipe-card card d-flex flex-row")
               .attr("id", "recipeCard1")
               .html(recipeCardContent);

            $("#loader").empty();

            $("#recipeResults").prepend(recipeCard);

         })


         // if class disabled exists on buttons, open sign up modal
         $('.disabled').click(function () {
            return $("#saveError").modal("show");
         })

         $(".save-recipe-btn").on("click", function (event) {
            event.preventDefault();


         })
      }

      // error function that displays information to user if ajax request fails
      function recipeError(err) {
         if (err) {
            $("#loader").empty();
            $("#ajax-error").modal("show");
         }
      }

      // catches if a user does not select a key word
      if (key === "") {
         $("#loader").empty();
         return $("#key-error").modal("show")
      } else {
         $.ajax({
            url: queryURL,
            method: "GET",
            success: recipeSuccess,
            error: recipeError
         });
      }
   });
});