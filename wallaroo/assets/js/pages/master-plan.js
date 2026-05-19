// Fancybox Config
$('[data-fancybox="gallery"]').fancybox({
    buttons: [
        "slideShow",
        "thumbs",
        "zoom",
        "fullScreen",
        "share",
        "close"
    ],
    loop: false,
    protect: true
});


$(document).ready(function () {

    // Default select first item
    const firstItem = $('.select-dropdown__list-item').first();
    const firstValue = firstItem.data('value');

    // Set dropdown button HTML
    $('.select-dropdown__button span').html(firstItem.html());
    $('.select-dropdown__button').attr('data-value', firstValue);

    // Active class default
    $('.select-dropdown__list-item').removeClass('active');
    firstItem.addClass('active');

    $('.planShowCaseList').removeClass('active');
    $('.planShowCaseList[data-value="' + firstValue + '"]').addClass('active');

    $('.planStageDetailList').removeClass('active');
    $('.planStageDetailList[data-value="' + firstValue + '"]').addClass('active');


    // Dropdown toggle
    $('.select-dropdown__button').on('click', function (e) {
        e.stopPropagation();
        $('.select-dropdown__list').toggleClass('active');
    });


    // Select item
    $('.select-dropdown__list-item').on('click', function () {

        let itemValue = $(this).data('value');

        // Set selected HTML inside button
        $('.select-dropdown__button span').html($(this).html());

        // Set button data-value
        $('.select-dropdown__button').attr('data-value', itemValue);

        // Active class on dropdown items
        $('.select-dropdown__list-item').removeClass('active');
        $(this).addClass('active');

        // Active showcase
        $('.planShowCaseList').removeClass('active');
        $('.planShowCaseList[data-value="' + itemValue + '"]').addClass('active');

        // Active detail list
        $('.planStageDetailList').removeClass('active');
        $('.planStageDetailList[data-value="' + itemValue + '"]').addClass('active');

        // Close dropdown
        $('.select-dropdown__list').removeClass('active');
    });


    // Prevent close when clicking inside dropdown
    $('.select-dropdown').on('click', function (e) {
        e.stopPropagation();
    });


    // Outside click close
    $(document).on('click', function () {
        $('.select-dropdown__list').removeClass('active');
    });

});