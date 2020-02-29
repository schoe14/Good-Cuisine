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
         healthLabel: "Peanut Free",
         healthId: "peanut-free"
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
         healthLabel: "Sugar Conscious",
         healthId: "sugar-conscious"
      }
   ];
   calorieAmountArray = [
      {
         calorieDisplay: "Any",
         calorieId: "calorieFour",
         calorieSearch: "&calories=1-9000"
      },
      {
         calorieDisplay: "1 to 250 Calories",
         calorieId: "calorieOne",
         calorieSearch: "&calories=1-250"
      },
      {
         calorieDisplay: "250 to 700 Calories",
         calorieId: "calorieTwo",
         calorieSearch: "&calories=250-700"
      },
      {
         calorieDisplay: "700 to 1000 Calories",
         calorieId: "calorieThree",
         calorieSearch: "&calories=700-1200"
      }
   ]

   let getID = $('#userId').data("userid");

   $.get("/api/savedRecipes/" + getID, function (data) {

      for (var i = 0; i < data[0].Recipes.length; i++) {
         let recipes = [];
         recipes.push(data[0].Recipes);
         console.log(recipes)
         if (recipes.length === 0) {
            let noRecipes = `<h3 class="results-message mx-5" id="savedRecipesMessage">Nothing saved yet.</h3>`

            $("#savedRecipes").append(noRecipes)
         } else {

            var ingredientArray = recipes[0][i].ingredientLines.split(',');
            var dietArray = recipes[0][i].dietLabels.split(',');
            var healthArray = recipes[0][i].healthLabels.split(',');
            var id = ("recipe" + recipes[0][i].id + "user" + recipes[0][i].UserId);

            let recipeCardContent = `
         <div class="recipe-card card d-flex flex-row" id=${id}>
            <div class="recipe-image card-img-top" style="background: lightblue url(${recipes[0][i].image}) no-repeat center/cover";></div>
               <div class="card-body">
                  <h5 class="recipe-name card-title">${recipes[0][i].label}</h5>
                  <p><a href="${recipes[0][i].url}" target="_blank" class="recipe-link">View Recipe</a></p>
                  <p>Calories(per serving): <span class="calories">${recipes[0][i].calories}</span></p>
                  <p>Total Time: <span class="total-time">${recipes[0][i].totalTime}</span></p>
                  <p>Ingredients:</p>
                  <ul class="ingredients-list">
                  ${ingredientArray.map(ingredient => (
               `<li>${ingredient}</li>`
            )).join("")}
                  </ul>
                  <br>
                  <p>Diet:</p>
                  <ul class="diet-list">
                  ${dietArray.map(diets => (
               `<li>${diets}</li>`
            )).join("")}
                  </ul>
                  <br>
                  <p>Health:</p>
                  <ul class="health-list">
                  ${healthArray.map(healths => (
               `<li>${healths}</li>`
            )).join("")}
                  </ul>
                  <br>
                  <div id=${userId}></div>
                  <button type="button" class="saved-delete btn btn-primary" id=${id} data-recipeid=${recipes[0][i].id}>Delete</button>
               </div>
         </div>
            `;

            $("#savedRecipes").prepend(recipeCardContent);
         }
      }
   });


   $('#savedRecipes').on("click", '.saved-delete', function (event) {

      let deleteId = $(this).data("recipeid");
      var id = "#" + this.id;
      $(id).remove();

      var query = "/api/savedRecipes/" + deleteId;
      $.ajax({
         method: "DELETE",
         url: query
      }).then(function () {
         event.preventDefault();
      });
   });


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
      $('#recipeResults').empty();
      // $('#recipeResults').remove();
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
         healthLabels += "&health=" + i
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

            // searches for value of #userID  
            // displays public or member cards
            const recipeCardContent = `
               <div class="recipe-image card-img-top" style="background: lightblue url(${image}) no-repeat center/cover";></div>
                  <div class="card-body">
                     <h5 class="recipe-name card-title">${label}</h5>
                     <p><a href="${url}" target="_blank" class="recipe-link">View Recipe</a></p>
                     <p>Number of Servings: <span class="yield">${yield}</span></p>
                     <p>Calories(per serving): <span class="calories">${(calories / yield).toFixed()}</span></p>
                     <p>Total Time: <span class="total-time">${totalTime}</span></p>
                     <p>Ingredients:</p>
                     <ul class="ingredients-list">
                        ${ingredientLines.map(ingredient => (
               `<li>${ingredient}</li>`)).join("")}
                     </ul>
                     <br>
                     <p>Diet:</p>
                     <ul class="diet-list">
                        ${dietLabels.map(diets => (
                  `<li>${diets}</li>`)).join("")}
                     </ul>
                     <br>
                     <p>Health:</p>
                     <ul class="health-list">
                        ${healthLabels.map(healths => (
                     `<li>${healths}</li>`)).join("")}
                     </ul>
                     <div id=${userId}></div>
                     <a href="#" id="${index}"class="save-recipe-btn btn btn-primary show-toast">Save</a>
                  </div>
               `;

            //creating recipe card literals
            let recipeCard = $("<div>")
               .addClass("recipe-card card d-flex flex-row")
               .attr("id", "${index}")
               .html(recipeCardContent);

            // 
            recipeCard.find(".save-recipe-btn").on("click", () => submitPost({
               image: image,
               label: label,
               url: url,
               calories: (calories / yield).toFixed(),
               totalTime: totalTime,
               ingredientLines: ingredientLines.join(),
               dietLabels: dietLabels.join(),
               healthLabels: healthLabels.join(),
               userId: userId
            }));

            $("#loader").empty();

            // appends cards to page
            $("#recipeResults").prepend(recipeCard);

         });
         $(".save-recipe-btn").on("click", function (event) {
            event.preventDefault();

            console.log("test")
            let i = this.id;
            $("#" + i).html(`<i class="fas fa-check"></i>`)

            var q = saveArray[i].label.split(' ');

            let recipeCardContent = `
               <div class="recipe-card card d-flex flex-row" id=${i + q[0]}>
                  <div class="recipe-image card-img-top" style="background: lightblue url(${saveArray[i].image}) no-repeat center/cover";></div>
                  <div class="card-body">
                     <h5 class="recipe-name card-title">${saveArray[i].label}</h5>
                     <p><a href="${saveArray[i].url}" target="_blank" class="recipe-link">View Recipe</a></p>
                     <p>Calories(per serving): <span class="calories">${(saveArray[i].calories / saveArray[i].yield).toFixed()}</span></p>
                     <p>Total Time: <span class="total-time">${saveArray[i].totalTime}</span></p>
                     <p>Ingredients:</p>
                     <ul class="ingredients-list">
                     ${saveArray[i].ingredientLines.map(ingredient => (
               `<li>${ingredient}</li>`
            )).join("")}
                        </ul>
                        <br>
                        <p>Diet:</p>
                        <ul class="diet-list">
                        ${saveArray[i].dietLabels.map(diets => (
               `<li>${diets}</li>`
            )).join("")}
                        </ul>
                        <br>
                        <p>Health:</p>
                        <ul class="health-list">
                        ${saveArray[i].healthLabels.map(healths => (
               `<li>${healths}</li>`
            )).join("")}
                        </ul>
                        <div id=${userId}></div>
                        <button type="button" id="${i + q[0]}" class="btn delete-recipe-btn" disabled>Check back soon</button>
                     </div>
                  </div>
                  `;
            // Save cards to saved recipes tab
            $("#savedRecipes").append(recipeCardContent);
         });

         $('#savedRecipes').on("click", '.delete-recipe-btn', function (event) {
            event.preventDefault();
            var id = "#" + this.id;
            $(id).remove();
            let deleteId = $(this).data("recipeid");

            var query = "/api/savedRecipes/" + deleteId;
            $.ajax({
               method: "DELETE",
               url: query
            }).then(function () {
               event.preventDefault();
            });
         });
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

// A function for handling what happens when the a new recipe is saved via "Save" button
function handleRecipeSave(res) {
   console.log(res);
}

// Submits a saved recipe
// Change console.log on line 278 to "submitPost"
function submitPost(recipe) {
   $.post("/api/savedRecipes", recipe, function () {

   });
}
