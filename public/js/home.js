console.log("home.js loaded");

// To check if input is null
function isEmpty(value) {
    return value === "";
}

$("#go-home").on("click", function (event) {
    event.preventDefault();
    console.log("hello")
    $("#go-home").animateCss('pulse', function () {
        window.location.href = "/"
    });
});

$("#search-recipe").on("click", function (event) {
    event.preventDefault();
    $("#search-recipe").animateCss('pulse', function () {
        window.location.href = "/search"
    });
});

// $("#view-saved-recipes").on("click", function (event) {
//     event.preventDefault();
//     $("#view-saved-recipes").animateCss('pulse', function () {
//         window.location.href = "/saved-recipes"
//     });
// });

$("#sign-up").on("click", function (event) {
    event.preventDefault();
    $("#sign-up").animateCss('pulse', function () {
        window.location.href = "/signup"
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
    console.log("email", user.email);
    if (!isEmpty(user.email) && !isEmpty(user.password)) {
        $.ajax({
            type: "POST",
            url: "/login",
            data: user
        }).then(function (data) {
            console.log(data);
            console.log("data.message ", data.message);
            $("#err-msg").empty("").text(data.message);
            if (data === true) window.location.href = "/search";
        });
    }
    else {
        console.log("fill out entire form");
        $("#err-msg").empty("").text("Email and password cannot be empty");
    }
    // $.post("/login", user, function (results) {
    //     if (results) {
    //         // $(location).attr('href', '/accounts/view')
    //         $(location).attr('href', '/')
    //     } else {
    //         $("#account-info").modal("close");
    //         alert("oops something went wrong, please try again!");
    //     }
    // })
});

$("#view-account").on("click", function (event) {
    event.preventDefault();
    console.log("hello")
    $("#view-account").animateCss('pulse', function () {
        $(location).attr('href', '/accounts/view')
    });
});