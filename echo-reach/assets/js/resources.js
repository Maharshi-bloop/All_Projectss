jQuery(function ($) {

    const firstCat = $('.resourcesListingUl a').first();
    firstCat.addClass('active');

    loadResources(firstCat.data('cat'));

    function loadResources(catID) {
        $.ajax({
            url: ajaxConfig.ajaxUrl,
            type: 'POST',
            data: {
                action: 'filter_resources',
                cat_id: catID
            },
            beforeSend: function () {
                $('#resourcesAjaxResult').html('<p>Loading...</p>');
            },
            success: function (response) {
                $('#resourcesAjaxResult').html(response);
            }
        });
    }

    $('.resourcesListingUl').on('click', 'a', function (e) {
        e.preventDefault();

        $('.resourcesListingUl a').removeClass('active');
        $(this).addClass('active');

        loadResources($(this).data('cat'));
    });
});
