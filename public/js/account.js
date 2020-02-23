console.log("accounts.js loaded");

// ADD    ****************
$("#add-account").on("click", function (event) {
    event.preventDefault();
    console.log("Entere'd add account button.")
    const newAccount = {
        email: $("#inputEmail").val().trim(),
        password: $("#inputPassword").val().trim(),
        name: $("#inputName").val().trim(),
        city: $("#inputCity").val().trim(),
        state: $("#inputState").find(":selected").text(),
        preference: $("#inputPreference").find(":selected").text()
    };

    if (newAccount.email.length > 0 && newAccount.password.length > 0) {
        $.ajax({
            type: "POST",
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
$("#delete-account").on("click", function (event) {
    event.preventDefault();
    console.log($("#account-number").data("accountemail"));
    $("#err-msg").empty("");
    $("#delete-account-modal").modal("show");
});

$("#confirm-delete").on("click", function (event) {
    const deleteAccount = {
        accountEntered: $("#account_id").val().trim(),
        passwordEntered: $("#account_password").val().trim()
    }
    console.log(deleteAccount);
    if (deleteAccount.accountEntered.length > 0 && deleteAccount.passwordEntered.length > 0) {
        if (deleteAccount.accountEntered === $("#account-number").data("accountemail")) {
            $.ajax({
                type: "DELETE",
                url: "/accounts/delete/",
                data: deleteAccount
            }).then(function (data) {
                console.log(data)
                console.log("data.message ", data.message)
                $("#err-msg").empty("").text(data.message);
                if (data.success) window.location.href = "/";
            });
        } else {
            $("#err-msg").empty("").text("Invalid email");
        }
    }
    else {
        console.log("fill out entire form");
        $("#err-msg").empty("").text("Email and password cannot be empty");
    }
});