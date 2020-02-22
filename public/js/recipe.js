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

   // <input class="diet" type="checkbox" id=${element.dietId} name=${element.dietName} value=${element.dietId}>
   // <label for=${element.dietId}>${element.dietName}</label>
   // <br>

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
      <input class="health" type="checkbox" id=${element.healthId} name=${element.healthLabel} value=${element.healthId}>
      <label for=${element.healthId}>${element.healthLabel}</label>
      <br>
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

   $('#checkKey').click(function () {
      $('.keyWord').each(function () {
         if ($(this).is(":checked")) {
            console.log($(this).val());
         }
         else {
            return console.log("undefined");
         }
      });
   });
   $('#checkDiet').click(function () {
      $('.diet').each(function () {
         if ($(this).is(":checked")) {
            console.log($(this).val());
         }
      });
   });
   $('#checkHealth').click(function () {
      $('.health').each(function () {
         if ($(this).is(":checked")) {
            console.log($(this).val());
         }
      });
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

      let test = "vegan"
      let appId = "&app_id=587fc9a8";
      let APIKey = "&app_key=f056ebfd3a725524f2a06d2a64636a39";
      let queryURL = "https://api.edamam.com/search?q=" + keyWord + appId + APIKey + healthLabels + dietType + calorieType;

      // response that parses recipe information to display to page
      function recipeSuccess(response) {
         console.log(queryURL);
         console.log(response);
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
            <img src="${image}" class="recipe-image card-img-top w-25" alt="recipe-image">
            <div class="card-body">
               <h5 class="recipe-name card-title">${label}</h5>
               <p><a href="${url}" target="_blank" class="recipe-link">View Recipe</a></p>
               <p>Calories(per serving): <span class="calories">${(calories/yield).toFixed()}</span></p>
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
               <a href="#" 
               id="saveRecipe1Btn"
               class="save-recipe-btn btn btn-primary"
               >Save</a>
            </div>
         `;
         const recipeCard = $("<div>")
            .addClass("recipe-card card d-flex flex-row")
            .attr("id", "recipeCard1")
            .html(recipeCardContent);
         recipeCard.find(".save-recipe-btn").on("click", () => console.log({
            image,
            label,
            url,
            calories,
            yield,
            totalTime,
            ingredientLines,
            dietLabels,
            healthLabels
         }));
         $("#recipeResults").append(recipeCard);
         })
      }

      // error function that displays information to user if ajax request fails
      function recipeError(err) {
         if (err) {
            $("#ajax-error").modal("show");
         }
      }

      // catches if a user does not select a key word
      if (key === "") {
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


// A function for handling what happens when the a new recipe is saved via "Save" button
function handleRecipeSave(res) {
   console.log(res);
}

// Submits a saved recipe
// Change console.log on line 278 to "submitPost"
// function submitPost(recipe) {
//    $.post("/api/savedRecipes", JSON.stringify(recipe), function() {

//    });
// }
