<?php if (get_row_layout() == 'banner_layout'):
    $banner_video = get_sub_field('banner_video');
    $banner_heading = get_sub_field('banner_heading');
    $banner_button = get_sub_field('button_link'); // ACF Link field
?>
    <section class="banner">
        <?php if ($banner_video): ?>
            <div class="bannerVideo">
                <video autoplay loop muted playsinline>
                    <source src="<?php echo $banner_video['url']; ?>" type="video/mp4">
                </video>
            </div>
        <?php endif; ?>

        <div class="container">
            <div class="bannerInner">
                <div class="bannerContent">
                    <?php if ($banner_heading): ?>
                        <h1 class="bannerHeading" data-aos="slide-up" data-aos-duration="300" data-aos-delay="0"><?php echo strip_tags($banner_heading, '<br>'); ?></h1>
                    <?php endif; ?>
                    <!-- <span>Frisco Psychiatrist</span> -->
                    <?php if ($banner_button): ?>
                        <div class="btnWrapper">
                            <div class="bannerBtn" data-aos="slide-up" data-aos-duration="300" data-aos-delay="100" >
                                <a href="<?php echo $banner_button['url']; ?>" class="primaryBtn" <?php if ($banner_button['target']) echo 'target="' . $banner_button['target'] . '"'; ?>>
                                    <?php echo $banner_button['title']; ?>
                                </a>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>
<?php endif; ?>