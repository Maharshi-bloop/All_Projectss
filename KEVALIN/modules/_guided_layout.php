<?php if (get_row_layout() == 'guided_layout') : ?>
    <section class="guided">
        <div class="container">
            <div class="guidedInner">
                <?php
                $guided_heading = get_sub_field('guided_heading');
                if ($guided_heading) : ?>
                    <div class="guidedTop">
                        <h2 class="secondarySecHeading" data-aos="slide-up" data-aos-duration="300"><?php echo strip_tags($guided_heading, '<br>'); ?></h2>
                    </div>
                <?php endif; ?>

                <?php if (have_rows('guided_list')) : ?>
                    <div class="guideListing">
                        <div class="row">
                            <?php
                            $delay = "0";
                             while (have_rows('guided_list')) : the_row(); ?>
                                <?php
                                $guide_number = get_sub_field('guide_number');
                                $guide_description = get_sub_field('guided_description');
                                if ($guide_number || $guide_description) : ?>
                                    <div class="col-4 col-xxl-4">
                                        <div class="guideList" data-aos="slide-up" data-aos-duration="200" data-aos-delay="<?php echo $delay?>">
                                            <?php if ($guide_number) : ?>
                                                <div class="indexNuber">
                                                    <?php echo strip_tags($guide_number); ?>
                                                </div>
                                            <?php endif; ?>

                                            <?php if ($guide_description) : ?>
                                                <div class="guideListContent">
                                                    <span class="secondaryDescription"><?php echo strip_tags($guide_description, '<br>'); ?></span>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                <?php 
                                $delay += 100;
                            endif; ?>
                            <?php endwhile; ?>
                        </div>
                    </div>
                <?php endif; ?>

            </div>
        </div>
    </section>
<?php endif; ?>