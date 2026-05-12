jQuery(document).ready(function($){
    let page = 1;
    let loading = false;
    let currentCat = $('#edu-filter li.active').data('cat') || 0;
    let noMorePosts = false;

    // Initial Load
    loadPosts();

    // Category Filter
    $(document).on('click', '#edu-filter li', function(e){
        e.preventDefault();
        currentCat = $(this).data('cat');
        page = 1;
        noMorePosts = false;
        $('#edu-posts').html('');

        // Remove active from all li, add to clicked li
        $('#edu-filter li').removeClass('active');
        $(this).addClass('active');

        loadPosts();
    });

    // Load More Button
    $(document).on('click', '#edu-loadmore-btn', function(e){
        e.preventDefault();
        if(!loading && !noMorePosts){
            page++;
            loadPosts();
        }
    });

    // Infinite Scroll
    $(window).on('scroll', function(){
        if(!loading && !noMorePosts){
            if($(window).scrollTop() + $(window).height() >= $(document).height() - 200){
                page++;
                loadPosts();
            }
        }
    });

    function loadPosts(){
        loading = true;
        $('.edu-loader').show();

        $.ajax({
            url: edu_ajax.ajaxurl,
            type: 'POST',
            data: {
                action: 'load_education_posts',
                page: page,
                cat: currentCat
            },
            success: function(response){
                if(response.trim() !== ''){
                    $('#edu-posts').append(response);

                    // Show Load More button only if posts exist
                    $('#edu-loadmore-btn').show();
                } else {
                    noMorePosts = true;
                    $('#edu-loadmore-btn').hide();
                }
                $('.edu-loader').hide();
                loading = false;
            }
        });
    }
});
