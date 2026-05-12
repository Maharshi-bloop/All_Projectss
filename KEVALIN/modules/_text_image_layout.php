<?php if (get_row_layout() == 'text_image_layout'):

    $heading = strip_tags(get_sub_field('heading'), '<br>');
    $description = strip_tags(get_sub_field('description'), '<br>');
    $button_link = get_sub_field('button_link');
    $image = get_sub_field('image');
?>
    <section class="textImageWrapper">
        <div class="container">
            <div class="textImageWrapperInner">
                <div class="row">
                    <div class="col-6 col-xxl-6">
                        <?php if ($heading || $description || $button_text) : ?>
                            <div class="textImageContent">
                                <?php if ($heading) : ?>
                                    <h2 class="sectionHeading" data-aos="slide-up" data-aos-duration="300"><?php echo $heading; ?></h2>
                                <?php endif; ?>

                                <?php if ($description) : ?>
                                    <span class="description" data-aos="slide-up" data-aos-duration="300" data-aos-delay="100"><?php echo $description; ?></span>
                                <?php endif; ?>

                                <?php if ($button_link) : ?>
                                    <a href="<?php echo $button_link['url']; ?>" class="primaryBtn" data-aos="slide-up" data-aos-duration="300" data-aos-delay="200"><?php echo $button_link['title']; ?></a>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                    </div>

                    <?php if ($image) : ?>
                        <div class="col-5 col-xxl-5">
                            <div class="textImageImg" data-aos="slide-right" data-aos-duration="300">
                                <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>">
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>

<?php endif; ?>