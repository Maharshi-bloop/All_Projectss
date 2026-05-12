<?php
if (get_row_layout() == 'about_banner_layout'):
    $banner_video = get_sub_field('banner_video');
    $banner_heading = get_sub_field('banner_heading');
    $banner_description = get_sub_field('banner_description');
?>

    <section class="banner">
        <?php if ($banner_video): ?>
            <div class="bannerVideo">
                <video autoplay loop muted playsinline>
                    <source src="<?php echo $banner_video; ?>" type="video/mp4">
                </video>
            </div>
        <?php endif; ?>

        <div class="container">
            <div class="bannerInner">
                <div class="bannerContent">
                    <?php if ($banner_heading): ?>
                        <h1 class="sectionHeading" data-aos="slide-up" data-aos-duration="300" data-aos-delay="0"><?php echo strip_tags($banner_heading, '<br>'); ?></h1>
                    <?php endif; ?>

                    <?php if ($banner_description): ?>
                        <span data-aos="slide-up" data-aos-duration="300" data-aos-delay="100"><?php echo strip_tags($banner_description, '<br>'); ?></span>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>

<?php endif; ?>