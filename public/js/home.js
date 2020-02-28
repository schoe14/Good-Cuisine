// console.log("home.js loaded");

// To check if input is null
function isEmpty(value) {
    return value === "";
}

$("#go-home").on("click", function (event) {
    event.preventDefault();
    $("#go-home").animateCss("pulse", function () {
        window.location.href = "/";
    });
});

$("#search-recipe").on("click", function (event) {
    event.preventDefault();
    $("#search-recipe").animateCss("pulse", function () {
        window.location.href = "/search";
    });
});

$("#sign-up").on("click", function (event) {
    event.preventDefault();
    $("#sign-up").animateCss("pulse", function () {
        window.location.href = "/signup";
    });
});

$("#sign-in-modal").on("click", function (event) {
    event.preventDefault();
    $("#email").val("");
    $("#password").val("");
    $("#err-msg").empty("");
    $("#account-info").modal("show");
});

$("#sign-in").on("click", function (event) {
    event.preventDefault();
    const user = {
        email: $("#email").val().trim(),
        password: $("#password").val().trim()
    }

    // console.log("email", user.email);
    if (!isEmpty(user.email) && !isEmpty(user.password)) {
        $.ajax({
            type: "POST",
            url: "/login",
            data: user
        }).then(function (data) {
            // console.log("data.message ", data.message);
            $("#err-msg").empty("").text(data.message);
            if (data === true) window.location.href = "/search";
        });
    } else {
        // console.log("fill out entire form");
        $("#err-msg").empty("").text("Email and password cannot be empty");
    }
});

$("#view-account").on("click", function (event) {
    event.preventDefault();
    $("#view-account").animateCss("pulse", function () {
        $(location).attr("href", "/accounts/view");
    });
});