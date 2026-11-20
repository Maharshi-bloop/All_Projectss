$(".tabing-main .tabContainer .tab-content-main:first").addClass("active");
    $(".tabing-main .tab-titles li:first").addClass("active-li")
    $(".tabing-main .tab-titles li a").on("click", function (event) {
        event.preventDefault()
        $(".tabing-main .tab-titles li").removeClass("active-li")
        $(this).parent().addClass("active-li");
        $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
        $($(this).attr('href')).addClass("active");
    })