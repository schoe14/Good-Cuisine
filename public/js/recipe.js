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
   ]

   dietNameArray.forEach(function(element) {
      let dietOptions = /*html*/`
      <input type="checkbox" id=${element.dietId} name=${element.dietName} value=${element.dietId}>
      <label for=${element.id}>${element.dietName}</label>
      <br>
      `
      $('.dietCheckbox').append(dietOptions);

   });

   $("input").click(function () {
      if ($(this).is(":checked")) {
         console.log($(this).val());
      }
      else {
         console.log("Checkbox is unchecked.");
      }
   });
});

