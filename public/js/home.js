console.log("home.js loaded");

$("#search-recipe").on("click", function (event) {
    event.preventDefault();
    $("#search-recipe").animateCss('pulse', function () {
        //callback (things to do after all animations are done)
        window.location.href = "/search"
    });
});

$("#view-saved-recipes").on("click", function (event) {
    event.preventDefault();
    $("#view-saved-recipes").animateCss('pulse', function () {
        window.location.href = "/saved-recipes"
    });
});

$("#sign-up").on("click", function (event) {
    event.preventDefault();
    $("#sign-up").animateCss('pulse', function () {
        window.location.href = "/signup"
    });
});

$("#sign-in-modal").on("click", function (event) {
    event.preventDefault();
    $("#account-info").modal("show");
});

$("#go-home").on("click", function (event) {
    event.preventDefault();
    console.log("hello")
    $("#go-home").animateCss('pulse', function () {
        window.location.href = "/"
    });
});

$("#sign-in").on("click", function (event) {
    event.preventDefault();
    const user = {
        email: $("#email").val().trim(),
        password: $("#password").val().trim()
    }
    $.post("/login", user, function (results) {
        if (results) {
            // $(location).attr('href', '/accounts/view')
            $(location).attr('href', '/')
        } else {
            $("#account-info").modal("close");
            alert("oops something went wrong, please try again!");
        }
    })
});

$("#view-account").on("click", function (event) {
    event.preventDefault();
    console.log("hello")
    $("#view-account").animateCss('pulse', function () {
        $(location).attr('href', '/accounts/view')
    });
});