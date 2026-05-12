<?php
if (get_row_layout() == 'client_testimonials_layout'):

    $title = get_sub_field('title');
    $description = get_sub_field('description');
    $slides = get_sub_field('slides');
?>

    <section class="clientTesti">
        <div class="container">
            <div class="clientTestiInner">
                <div class="row">
                    <?php if ($title || $description): ?>
                        <div class="col-3 col-xxl-3 col-1024-12 ">
                            <div class="clientTestiTitle">
                                <?php if ($title): ?>
                                    <h2 class="secondaryBannerHeading" data-aos="slide-up" data-aos-duration="300" ><?php echo strip_tags($title, '<br>'); ?></h2>
                                <?php endif; ?>
                                <?php if ($description): ?>
                                    <span class="secondaryDescription" data-aos="slide-up" data-aos-duration="300" data-aos-delay="100"><?php echo strip_tags($description, '<br>'); ?></span>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if ($slides): ?>
                        <div class="col-3 col-xxl-3 col-1024-6">
                            <div class="testiImageSwiper">
                                <div class="swiper">
                                    <div class="swiper-wrapper">
                                        <?php foreach ($slides as $slide): ?>
                                            <?php if ($slide['image']): ?>
                                                <div class="swiper-slide">
                                                    <div class="slideImage" data-aos="zoom-in" data-aos-duration="300">
                                                        <img src="<?php echo esc_url($slide['image']['url']); ?>" alt="<?php echo esc_attr($slide['image']['alt']); ?>">
                                                    </div>
                                                </div>
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-5 col-xxl-5 col-1024-6">
                            <div class="testiContentSwiper">
                                <div class="swiper">
                                    <div class="swiper-wrapper">
                                        <?php foreach ($slides as $slide): ?>
                                            <div class="swiper-slide">
                                                <div class="slideContent">
                                                    <?php if ($slide['description']): ?>
                                                        <span class="secondaryDescription"><?php echo strip_tags($slide['description'], '<br>'); ?></span>
                                                    <?php endif; ?>
                                                    <?php if ($slide['author']): ?>
                                                        <h3 class="secondarySubHeading"><?php echo strip_tags($slide['author']); ?></h3>
                                                    <?php endif; ?>
                                                </div>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                    <div class="swiperControl">
                                        <div class="swiperBtn prevBtn">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/prev-btn.svg" alt="Previous">
                                        </div>
                                        <div class="swiperBtn nextBtn">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/next-btn.svg" alt="Next">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endif; ?>

                </div>
            </div>
        </div>
    </section>
<?php endif; ?>