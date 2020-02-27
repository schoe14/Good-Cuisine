$(document).ready(function () {
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
   
      // response that parses recipe information to display to page
      function recipeSuccess(response) {
         console.log(queryURL);
         console.log(response);
   
         // creating array to store search results
         const saveArray = [];
         // stores recipe data in array
         for (var i = 0; i < response.hits.length; i++) {
            saveArray.push(response.hits[i].recipe);
         }
         console.log(saveArray);
   
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
            console.log(index)
   
            // searches for value of #userID  
            // displays public or member cards 
            if (userId === "none") {
   
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
               $("#recipeResults").prepend(recipeCard);
   
            } else {
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
                     <a href="#" 
                     id="${index}"
                     class="save-recipe-btn btn btn-primary"
                     >Save</a>
                  </div>
               `;
   
               //creating recipe card literals
               let recipeCard = $("<div>")
                  .addClass("recipe-card card d-flex flex-row")
                  .attr("id", "recipeCard1")
                  .html(recipeCardContent);
   
   
               // appends cards to page
               $("#recipeResults").prepend(recipeCard);
            }
            // if class disabled exists on buttons, open sign up modal
            $('.disabled').click(function () {
               console.log("test")
               return $("#saveError").modal("show");
            })
         })
         $(".save-recipe-btn").on("click", function (event) {
            event.preventDefault();
   
   
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
})
