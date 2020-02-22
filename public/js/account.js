console.log("Accounts.js loaded");

// ADD    ****************
$("#add-account").on("click", function (event) {
    event.preventDefault();

    console.log("Entere'd add account button.")
    // make a newAccount obj
    const newAccount = {
        email: $("#inputEmail").val().trim(),
        password: $("#inputPassword").val().trim()
    };

    if (newAccount.email.length > 0 && newAccount.password.length > 0) {
        $.ajax({
            type: "post",
            url: "/signup",
            data: newAccount
        }).then(function (data) {
            console.log("data.message ", data.message)
            window.location.href = "/";
            // if(data.success) window.location.href = "/";
            // else console.log("data.message " , data.message);
        });
    } else {
        console.log("**Please fill out entire form**");
        $("#create-err-msg").empty("").text("**Please fill out entire form**");
    }
});


// UPDATE      **********************
// $("#update-account").on("click", function (event) {
//     event.preventDefault();

//     // capture All changes
//     const changeAccount = {
//         first_name: $("#inputFirst").val().trim(),
//         city: $("#inputCity").val().trim(),
//         state: $("#inputState").val().trim(),
//         email: $("#inputEmail").val().trim(),
//         password: $("#inputPassword").val().trim(),
//         account_id: $("#account-number").attr("data-accountid")
//     };
//     $("#err-msg").empty("");
//     // $("#change-account-modal").modal("show");
//     console.log(changeAccount);

//     if (changeAccount.first_name.length > 0 && changeAccount.city.length > 0 && changeAccount.state.length > 0 && changeAccount.email.length > 0 && changeAccount.password.length > 0 && changeAccount.first_name.length > 0, changeAccount.account_id.length) {
//         $.ajax({
//             type: "PUT",
//             url: "/accounts/" + changeAccount.account_id + "/" + changeAccount.password,
//             data: changeAccount
//         }).then(
//             function () {
//                 console.log("Updated account", changeAccount);
//                 // Reload the page to get the updated list
//                 location.reload();
//             }
//         );

//     } else {
//         console.log("**Please fill out entire form**");
//         $("#update-err-msg").empty("").text("**Please fill out entire form**");
//     }

// });

// DELETE   ***************************************************
// $("#delete-account").on("click", function (event) {
//     event.preventDefault();
//     $("#err-msg").empty("");
//     $("#delete-account-modal").modal("show");
// });

// $("#confirm-delete").on("click", function (event) {
//     const deleteAccount = {
//         account_id: $("#account_id").val().trim(),
//         account_key: $("#account_password").val().trim(),
//     }
//     console.log(deleteAccount);
//     if (deleteAccount.account_id.length > 0 && deleteAccount.account_key.length > 0) {
//         $.ajax("/accounts/" + deleteAccount.account_id + "/" + deleteAccount.account_key, {
//             type: "DELETE"
//         }).then(
//             function () {
//                 console.log("deleted account", deleteAccount.account_id);
//                 // Reload the page to get the updated list
//                 location.reload();
//             }

//         );
//     } else {
//         console.log("fill out entire form");
//         $("#err-msg").empty("").text("fill out entire form");
//     }

// });