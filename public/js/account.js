console.log("accounts.js loaded");

// To check if input is null
function isEmpty(value) {
    return value === "";
}

// ADD    ****************
$("#add-account").on("click", event => {
    event.preventDefault();
    $("#create-err-msg").empty("");
    $("#err-msg-email").empty("");
    $("#err-msg-password").empty("");

    const newAccount = {
        email: $("#inputEmail").val().trim(),
        password: $("#inputPassword").val().trim(),
        name: $("#inputName").val().trim(),
        city: $("#inputCity").val().trim(),
        state: $("#inputState").find(":selected").text(),
        preference1: $("#inputPreference1").find(":selected").text(),
        preference2: $("#inputPreference2").find(":selected").text()
    };

    console.log(isEmpty(newAccount.name), isEmpty(newAccount.email), isEmpty(newAccount.password));
    if (!isEmpty(newAccount.name) && !isEmpty(newAccount.email) && !isEmpty(newAccount.password)) {
        $.post("/signup", newAccount, data => {
            console.log("data.message ", data.message);
            if (data.message === "email") { $("#err-msg-email").empty("").text("Invalid email form"); }
            else if (data.message === "password") {
                $("#err-msg-password").empty("").text("Password has to be minimum eight characters, at least one letter, one number and one special character");
            } else { $("#err-msg-email").empty("").text(data.message); }
            console.log(data.success);
            if (data.success) window.location.href = "/search";
        });
        // $.ajax({
        //     type: "POST",
        //     url: "/signup",
        //     data: newAccount
        // }).then(function (data) {
        //     console.log("data.message ", data.message);
        //     if (data.message === "email") { $("#err-msg-email").empty("").text("Invalid email form") }
        //     else if (data.message === "password") { $("#err-msg-password").empty("").text("Password has to be minimum eight characters, at least one letter, one number and one special character") }
        //     else { $("#err-msg-email").empty("").text(data.message) }
        //     console.log(data.success);
        //     // window.location.href = "/";
        //     if (data.success) window.location.href = "/search";
        // });
    } else {
        console.log("**Please fill out the required fields**");
        $("#create-err-msg").empty("").text("**Please fill out the required fields**");
    }
});

// UPDATE USER INFORMATION     **********************
$("#update-information").on("click", event => {
    event.preventDefault();
    $("#update-err-msg").empty("");

    // Capture All changes
    const changeAccount = {
        name: $("#inputName").val().trim(),
        city: $("#inputCity").val().trim(),
        state: $("#inputState").find(":selected").text(),
        preference1: $("#inputPreference1").find(":selected").text(),
        preference2: $("#inputPreference2").find(":selected").text(),
    };
    console.log(changeAccount);

    if (!isEmpty(changeAccount.name)) {
        $.ajax({
            type: "PUT",
            url: "/accounts/update/info",
            data: changeAccount
        }).then(function (data) {
            console.log("data.message ", data.message);
            $("#update-err-msg").empty("").text(data.message);
            // Reload the page to get the updated list
            location.reload();
        });
    } else {
        console.log("**Required fields cannot be empty**");
        $("#update-err-msg").empty("").text("**Name field cannot be empty**");
    }
});

// UPDATE PASSWORD     **********************
$("#update-password").on("click", event => {
    event.preventDefault();
    $("#update-err-msg").empty("");
    $("#err-msg-update").empty("");
    $("#current_password").val("");
    $("#new_password").val("");
    $("#update-password-modal").modal("show");
});

$("#confirm-password-update").on("click", event => {
    event.preventDefault();
    const updatePassword = {
        oldPasswordEntered: $("#current_password").val().trim(),
        newPasswordEntered: $("#new_password").val().trim()
    };

    if (!isEmpty(updatePassword.oldPasswordEntered) && !isEmpty(updatePassword.newPasswordEntered)) {
        $.ajax({
            type: "PUT",
            url: "/accounts/update/password",
            data: updatePassword
        }).then(function (data) {
            console.log("data.message ", data.message);
            $("#err-msg-update").empty("").text(data.message);
            if (data.success) window.location.href = "/";
        });
    } else {
        console.log("fill out entire form");
        $("#err-msg-update").empty("").text("Password fields cannot be empty");
    }
});

// DELETE   ***************************************************
$("#delete-account").on("click", event => {
    event.preventDefault();
    console.log($("#account-number").data("accountemail"));
    $("#account_id").val("");
    $("#account_password").val("");
    $("#update-err-msg").empty("");
    $("#err-msg-deletion").empty("");
    $("#delete-account-modal").modal("show");
});

$("#confirm-delete").on("click", event => {
    event.preventDefault();
    const deleteAccount = {
        accountEntered: $("#account_id").val().trim(),
        passwordEntered: $("#account_password").val().trim()
    };

    console.log(deleteAccount.accountEntered);
    if (!isEmpty(deleteAccount.accountEntered) && !isEmpty(deleteAccount.passwordEntered)) {
        if (deleteAccount.accountEntered === $("#account-number").data("accountemail")) {
            $.ajax({
                type: "DELETE",
                url: "/accounts/delete",
                data: deleteAccount
            }).then(function (data) {
                console.log("data.message ", data.message);
                $("#err-msg-deletion").empty("").text(data.message);
                if (data.success) window.location.href = "/";
            });
        } else {
            $("#err-msg-deletion").empty("").text("Invalid email");
        }
    } else {
        console.log("fill out entire form");
        $("#err-msg-deletion").empty("").text("Email and password cannot be empty");
    }
});