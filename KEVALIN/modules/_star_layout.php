<?php if (get_row_layout() == 'star_layout'): ?>
    <section class="starCol">
        <div class="container">
            <div class="starColInner">
                <div class="row">
                    <?php if (have_rows('star_boxes')): ?>
                        <?php
                        $delay = "0";
                         while (have_rows('star_boxes')): the_row();
                            $star_icon = get_sub_field('star_icon');
                            $star_heading = get_sub_field('star_heading');
                            $star_description = get_sub_field('star_description');
                        ?>
                            <?php if ($star_icon || $star_heading || $star_description): ?>
                                <div class="col-4 col-xxl-4 col-md-6">
                                    <div class="starBox" data-aos="slide-up" data-aos-duration="300" data-aos-delay="<?php echo $delay?>">
                                        <?php if ($star_icon): ?>
                                            <div class="starIcon">
                                                <img src="<?php echo $star_icon['url']; ?>" alt="<?php echo $star_icon['alt']; ?>">
                                            </div>
                                        <?php endif; ?>

                                        <div class="starContent">
                                            <?php if ($star_heading): ?>
                                                <h3 class="subHeading"><?php echo strip_tags($star_heading, '<br>'); ?></h3>
                                            <?php endif; ?>

                                            <?php if ($star_description): ?>
                                                <span class="description"><?php echo strip_tags($star_description, '<br>'); ?></span>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>
                        <?php
                         $delay += 100;
                     endwhile; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>
<?php endif; ?>