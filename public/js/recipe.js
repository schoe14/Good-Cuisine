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
   healthLabelsArray= [
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
         calorieDisplay: "1 to 100 Calories",
         calorieId: "calorieOne",
         calorieSearch: "&calories=1-100"
      },
      {
         calorieDisplay: "100 to 300 Calories",
         calorieId: "calorieTwo",
         calorieSearch: "&calories=100-300"
      },
      {
         calorieDisplay: "300 to 600 Calories",
         calorieId: "calorieThree",
         calorieSearch: "&calories=300-600"
      },
      {
         calorieDisplay: "Any",
         calorieId: "calorieFour",
         calorieSearch: "&calories=1-5000"
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

   $('#checkKey').click(function () {
      $('.keyWord').each(function() {
         if ($(this).is(":checked")) {
            console.log($(this).val());
         }
      });
   });
   $('#checkDiet').click(function () {
      $('.diet').each(function() {
         if ($(this).is(":checked")) {
            console.log($(this).val());
         }
      });
   });
   $('#checkHealth').click(function () {
      $('.health').each(function() {
         if ($(this).is(":checked")) {
            console.log($(this).val());
         }
      });
   });


   $('#search').click(function () {

      let key = [];
      let health = [];
      let diet = [];

      $('.keyWord').each(function () {
         if ($(this).is(":checked")) {
            var checkedValue = $(this).val()
            key.push(checkedValue)
         }
      });
      $('.health').each(function () {
         if ($(this).is(":checked")) {
            var checkedValue = $(this).val()
            health.push(checkedValue)
         }
      });
      $('.diet').each(function () {
         if ($(this).is(":checked")) {
            var checkedValue = $(this).val()
            diet.push(checkedValue)
         }
      });

      var keyWord = key[0];
      var healthLabels = "";
      health.forEach(function (i) {
         healthLabels += "&healthLabel=" + i
      })

      var dietType = "&diet=" + diet[0];

      let test = "vegan"
      let appId = "&app_id=587fc9a8";
      let APIKey = "&app_key=f056ebfd3a725524f2a06d2a64636a39";
      let queryURL = "https://api.edamam.com/search?q=" + keyWord + appId + APIKey + healthLabels + dietType;
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

