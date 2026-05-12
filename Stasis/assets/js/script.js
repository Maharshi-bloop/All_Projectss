jQuery(document).ready(function ($) {

    /* $('.filterWrapSec > .filterWrapBox').hide();

      $('.filterUl a').click(function (e) {

        e.preventDefault();

        var tab = $(this).data('filter');

        $('.filterUl a').removeClass('active');
        $(this).addClass('active');

        if (tab == 'resources') {

            $('.filterWrapSec > .filterWrapBox').hide();
            $('.filterWrapSec > .filterWrapBox').slice(0, 3).show();

        }

        if (tab == 'news') {

            $('.filterWrapSec > .filterWrapBox').hide();
            $('.filterWrapSec > .filterWrapBox').slice(3, 5).show();

        }

    }); 

    $('.filterUl a[data-filter="resources"]').trigger('click'); */
	
	
});
// Load More Functionality
/*jQuery(document).ready(function ($) {

    $(document).on("click", ".loadMore", function (e) {

        e.preventDefault();
		e.stopPropagation();
		
        var button = $(this);
        var postType = button.data("post");
        var container = button.data("container");
        var offset = parseInt(button.data("offset")) || 0;

        if (button.hasClass("loading")) return;

        button.addClass("loading").text("Loading...");

        $.ajax({
            url: ajax_object.ajax_url,
            type: "POST",
            data: {
                action: "load_more_posts",
                post_type: postType,
                offset: offset
            },
            success: function (response) {

                if (!response || response.trim() === "no_more") {
                    button.hide();
                    return;
                }

                $("#" + container).append(response);

                button.data("offset", offset + 3);
                button.removeClass("loading").text("LOAD MORE");
            }
        });

    });

});*/

jQuery(document).ready(function ($) {
    $(document).on("click", ".loadMore", function(e){
        e.preventDefault();
		console.log("WORKING NOW");

        var button = $(this);

        if (button.hasClass("loading")) return;

        var postType  = button.data("post");
        var container = button.data("container");
        var offset    = parseInt(button.data("offset"), 10) || 0;
        var increment = parseInt(button.data("increment"), 10) || 3;

        button.addClass("loading").text("Loading...");

        $.ajax({
            url: ajax_object.ajax_url,
            type: "POST",
            dataType: "html",
            data: {
                action: "load_more_posts",
                post_type: postType,
                offset: offset
            },
            success: function (response) {
                response = $.trim(response);

                console.log("TYPE:", postType);
                console.log("OFFSET:", offset);
                console.log("RESPONSE:", response);

                if (!response || response === "no_more") {
                    button.hide();
                    return;
                }

                $("#" + container).append(response);
                button.data("offset", offset + increment);
                button.removeClass("loading").text("LOAD MORE");
            },
            error: function (xhr, status, error) {
                console.log("AJAX ERROR:", error);
                console.log(xhr.responseText);
                button.removeClass("loading").text("LOAD MORE");
            }
        });
    });
});