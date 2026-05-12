<?php if (get_row_layout() == 'image_text_layout'): ?>
    <section class="imageExTextWrapper">
        <div class="container">
            <div class="imageExTextWrapperInner">
                <div class="row">
                    <?php
                    $image = get_sub_field('image_text_image');
                    $heading = get_sub_field('image_text_heading');
                    $description = get_sub_field('image_text_description');
                    ?>

                    <?php if ($image): ?>
                        <div class="col-5 col-xxl-5 col-xl-6 col-md-12">
                            <div class="imageExTextImg" data-aos="slide-left" data-aos-duration="300">
                                <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>">
                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if ($heading || $description || have_rows('image_text_counters')): ?>
                        <div class="col-6 col-xxl-6 col-md-12">
                            <div class="imageExTextContent Counter">

                                <?php if ($heading): ?>
                                    <h2 class="sectionHeading" data-aos="slide-up" data-aos-duration="300"><?php echo strip_tags($heading, '<br>'); ?></h2>
                                <?php endif; ?>

                                <?php if ($description): ?>
                                    <span class="description" data-aos="slide-up" data-aos-duration="300" data-aos-delay="100"><?php echo strip_tags($description, '<br>'); ?></span>
                                <?php endif; ?>

                                <?php if (have_rows('image_text_counters')): ?>
                                    <ul>
                                        <?php
                                        $delay = "100";
                                        while (have_rows('image_text_counters')): the_row();
                                            $counter_number = get_sub_field('counter_number');
                                            $counter_description = get_sub_field('counter_description');
                                        ?>
                                            <?php if ($counter_number || $counter_description): ?>
                                                <li data-aos="slide-up" data-aos-duration="300" data-aos-delay="<?php echo $delay ?>">
                                                    <div class="careResult">
                                                        <?php if ($counter_number): ?>
                                                            <div class="count"><?php echo $counter_number; ?></div>
                                                        <?php endif; ?>

                                                        <?php if ($counter_description): ?>
                                                            <span class="description"><?php echo strip_tags($counter_description, '<br>'); ?></span>
                                                        <?php endif; ?>
                                                    </div>
                                                </li>
                                            <?php endif; ?>
                                        <?php
                                            $delay += 100;
                                        endwhile; ?>
                                    </ul>
                                <?php endif; ?>

                            </div>
                        </div>
                    <?php endif; ?>

                </div>
            </div>
        </div>
    </section>
<?php endif; ?>