console.log("accounts.js loaded");

// To check if input is null
function isEmpty(value) {
    return value === "";
}

// ADD    ****************
$("#add-account").on("click", function (event) {
    event.preventDefault();
    $("#create-err-msg").empty("");
    $("#err-msg-email").empty("");
    $("#err-msg-password").empty("");
    console.log("Entere'd add account button.")
    const newAccount = {
        email: $("#inputEmail").val().trim(),
        password: $("#inputPassword").val().trim(),
        name: $("#inputName").val().trim(),
        city: $("#inputCity").val().trim(),
        state: $("#inputState").find(":selected").text(),
        preference: $("#inputPreference").find(":selected").text()
    };
    console.log(isEmpty(newAccount.name), isEmpty(newAccount.email), isEmpty(newAccount.password));
    if (!isEmpty(newAccount.name) && !isEmpty(newAccount.email) && !isEmpty(newAccount.password)) {
        $.ajax({
            type: "POST",
            url: "/signup",
            data: newAccount
        }).then(function (data) {
            console.log("data.message ", data.message);
            if (data.message === "email") { $("#err-msg-email").empty("").text("Invalid email form") }
            else if (data.message === "password") { $("#err-msg-password").empty("").text("Password has to be minimum eight characters, at least one letter, one number and one special character") }
            else { $("#err-msg-email").empty("").text(data.message) }
            console.log(data.success);
            // window.location.href = "/";
            if (data.success) window.location.href = "/search";
        });
    } else {
        console.log("**Please fill out the required fields**");
        $("#create-err-msg").empty("").text("**Please fill out the required fields**");
    }
});

// UPDATE      **********************
$("#update-account").on("click", function (event) {
    event.preventDefault();
    $("#update-err-msg").empty("");

    // capture All changes
    const changeAccount = {
        name: $("#inputName").val().trim(),
        city: $("#inputCity").val().trim(),
        state: $("#inputState").find(":selected").text(),
        preference: $("#inputPreference").find(":selected").text(),
        password: $("#inputPassword").val().trim()
    };
    $("#err-msg").empty("");
    // $("#change-account-modal").modal("show");
    console.log(changeAccount);

    // if (changeAccount.first_name.length > 0 && changeAccount.city.length > 0 && changeAccount.state.length > 0 && changeAccount.email.length > 0 && changeAccount.password.length > 0 && changeAccount.first_name.length > 0, changeAccount.account_id.length) {
    //     $.ajax({
    //         type: "PUT",
    //         url: "/accounts/" + changeAccount.account_id + "/" + changeAccount.password,
    //         data: changeAccount
    //     }).then(
    //         function () {
    //             console.log("Updated account", changeAccount);
    //             // Reload the page to get the updated list
    //             location.reload();
    //         }
    //     );

    // } else {
    //     console.log("**Please fill out entire form**");
    //     $("#update-err-msg").empty("").text("**Please fill out entire form**");
    // }

});

// DELETE   ***************************************************
$("#delete-account").on("click", function (event) {
    event.preventDefault();
    console.log($("#account-number").data("accountemail"));
    $("#account_id").val("");
    $("#account_password").val("");
    $("#err-msg-deletion").empty("");
    $("#delete-account-modal").modal("show");
});

$("#confirm-delete").on("click", function (event) {
    const deleteAccount = {
        accountEntered: $("#account_id").val().trim(),
        passwordEntered: $("#account_password").val().trim()
    }
    console.log(deleteAccount);
    if (!isEmpty(deleteAccount.accountEntered) && !isEmpty(deleteAccount.passwordEntered)) {
        if (deleteAccount.accountEntered === $("#account-number").data("accountemail")) {
            $.ajax({
                type: "DELETE",
                url: "/accounts/delete/",
                data: deleteAccount
            }).then(function (data) {
                console.log(data)
                console.log("data.message ", data.message)
                $("#err-msg-deletion").empty("").text(data.message);
                if (data.success) window.location.href = "/";
            });
        } else {
            $("#err-msg-deletion").empty("").text("Invalid email");
        }
    }
    else {
        console.log("fill out entire form");
        $("#err-msg-deletion").empty("").text("Email and password cannot be empty");
    }
});