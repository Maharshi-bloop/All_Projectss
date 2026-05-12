jQuery(function ($) {

    let typingTimer;

    function loadDefaultResources() {
        $('#resources-results').load(
            nhAjax.ajaxurl + '?action=load_default_resources'
        );
    }
    // 🔍 SEARCH ON KEY PRESS
    $('#resource-search').on('keyup', function () {

        clearTimeout(typingTimer);
        let search = $(this).val();

        if (search === '') {
            loadDefaultResources();
            return;
        }
        
        typingTimer = setTimeout(function () {

            $.post(nhAjax.ajaxurl, {
                action: 'filter_resources',
                type: 'all',
                search: search,
                page: 1,
                perpage: 6
            }, function (res) {

                // 🔴 NO SEARCH RESULTS
                if ($.trim(res) === '') {

                    $('#resources-results').html(
                        '<div class="no-result text-center w-100 pt-5 heading4xl">No results found.</div>'
                    );

                    $('.load-more')
                        .text('No Posts')
                        .addClass('disabled')
                        .css({
                            'pointer-events': 'none',
                            'opacity': '0.6'
                        });

                } else {

                    // ✅ SHOW RESULTS
                    $('#resources-results').html(res);

                    $('.load-more')
                        .text('Load More')
                        .removeClass('disabled')
                        .css({
                            'pointer-events': '',
                            'opacity': ''
                        })
                        .data('page', 1);
                }
            });

        }, 400);
    });


    // ➕ LOAD MORE (PER POST TYPE)
    $(document).on('click', '.load-more', function (e) {
        e.preventDefault();

        let btn = $(this);
        let page = parseInt(btn.data('page')) + 1;

        $.post(nhAjax.ajaxurl, {
            action: 'filter_resources',
            type: btn.data('type'),
            page: page,
            perpage: btn.data('perpage'),
            search: $('#resource-search').val()
        }, function (res) {

            // 🚫 NO MORE POSTS
            if ($.trim(res) === '') {
                btn.text('No Posts')
                    .addClass('disabled')
                    .css({
                        'pointer-events': 'none',
                        'opacity': '0.6'
                    });
                return;
            }

            // ✅ APPEND POSTS
            btn.closest('.resourcesResultBox')
                .find('.row')
                .append(res);

            btn.data('page', page);
        });
    });

    $(document).on('click', '.search-clear', function () {
        $('#resource-search').val('');
        loadDefaultResources();
    });
});
