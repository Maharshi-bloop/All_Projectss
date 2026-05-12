<?php if (get_row_layout() == 'why_choose_section'): ?>
    <?php
    $heading = strip_tags(get_sub_field('heading'), '<br>');
    $description = strip_tags(get_sub_field('description'), '<br>');
    $video_file = get_sub_field('video_file');
    ?>
    <section class="whyChoose">
        <div class="container">
            <div class="whyChooseInner">
                <?php if ($heading || $description): ?>
                    <div class="whyChooseTop">
                        <?php if ($heading): ?>
                            <h3 class="sectionHeading"><?php echo $heading; ?></h3>
                        <?php endif; ?>
                        <?php if ($description): ?>
                            <span class="description"><?php echo $description; ?></span>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <div class="whyChooseContent">
                    <div class="row">
                        <div class="col-6 col-xxl-6">
                            <div class="whyChooseText">
                                <?php if (have_rows('boxes')): ?>
                                    <?php while (have_rows('boxes')): the_row(); ?>
                                        <?php
                                        $sub_heading = strip_tags(get_sub_field('sub_heading'), '<br>');
                                        $sub_description = strip_tags(get_sub_field('sub_description'), '<br>');
                                        ?>
                                        <?php if ($sub_heading || $sub_description): ?>
                                            <div class="QaBox">
                                                <?php if ($sub_heading): ?>
                                                    <h4 class="subHeading"><?php echo $sub_heading; ?></h4>
                                                <?php endif; ?>
                                                <?php if ($sub_description): ?>
                                                    <span class="description"><?php echo $sub_description; ?></span>
                                                <?php endif; ?>
                                            </div>
                                        <?php endif; ?>
                                    <?php endwhile; ?>
                                <?php endif; ?>
                            </div>
                        </div>

                        <?php if ($video_file): ?>
                            <div class="col-5 col-xxl-5">
                                <div class="whyChooseGIf">
                                    <video autoplay loop muted playsinline>
                                        <source src="<?php echo $video_file['url']; ?>" type="video/mp4">
                                    </video>
                                </div>
                            </div>
                        <?php endif; ?>

                    </div>
                </div>
            </div>
        </div>
    </section>
<?php endif; ?>