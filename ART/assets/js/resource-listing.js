jQuery(document).ready(function ($) {
  let loading = false;

  let currentPage = 1;

  let currentPostType = $(".resourceFilter.active").data("post-type");

  /*
    |--------------------------------------------------------------------------
    | Filter Resource
    |--------------------------------------------------------------------------
    */

  $(".resourceFilter").on("click", function (e) {
    e.preventDefault();

    if (loading) {
      return;
    }

    let postType = $(this).data("post-type");

    currentPostType = postType;

    currentPage = 1;

    $(".resourceFilterList li").removeClass("active");

    $(this).parent().addClass("active");

    /*
        Reset Listing
        */

    loadResources(postType, currentPage, false, true);

    /*
        Scroll To Listing
        */

    $("html, body").animate(
      {
        scrollTop: $(".resourceWrapper").offset().top - 100,
      },
      500,
    );
  });

  /*
    |--------------------------------------------------------------------------
    | Infinite Scroll
    |--------------------------------------------------------------------------
    */
  $(window).on("scroll", function () {
    if (loading) {
      return;
    }

    let scrollPosition = $(window).scrollTop() + $(window).height();

    let documentHeight = $(document).height();

    if (scrollPosition >= documentHeight - 300) {
      currentPage++;
      loadResources(currentPostType, currentPage, true);
    }
  });

  /*
    |--------------------------------------------------------------------------
    | AJAX Function
    |--------------------------------------------------------------------------
    */

  function loadResources(postType, page, append = false, tabChange = false) {
    loading = true;

    /*
        Tab Change Processing
        */
    if (tabChange) {
      $(".resourceListingRow").addClass("resourceProcessing");
    }

    $(".resourceLoader").show().text("Loading...");

    $.ajax({
      type: "POST",
      url: resource_ajax.ajax_url,
      data: {
        action: "art_resource_filter",
        nonce: resource_ajax.nonce,
        post_type: postType,
        page: page,
      },

      beforeSend: function () {
        if (tabChange) {
          $(".resourceListingRow").html("");
        }
      },

      success: function (response) {
        if (response.success) {
          if (append) {
            $(".resourceListingRow").append(response.data.html);
          } else {
            $(".resourceListingRow").html(response.data.html);
          }

          /*
                    Stop Infinite Scroll
                    */

          if (page >= response.data.max_page || response.data.max_page === 0) {
            $(window).off("scroll.resource");
          }
        }
      },

      complete: function () {
        loading = false;

        $(".resourceLoader").hide();

        $(".resourceListingRow").removeClass("resourceProcessing");
      },

      error: function (xhr) {
        console.log(xhr.responseText);

        loading = false;

        $(".resourceLoader").hide();

        $(".resourceListingRow").removeClass("resourceProcessing");
      },
    });
  }
});
