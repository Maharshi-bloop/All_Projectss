<?php if (get_row_layout() == 'journey_item_layout'): ?>
    <section class="journeyList">
        <div class="container">
            <div class="journeyListInner">
                <?php
                $journey_heading = get_sub_field('journey_heading');
                $journey_description = get_sub_field('journey_description');
                ?>
                <?php if ($journey_heading || $journey_description) : ?>
                    <div class="journeyListTop">
                        <?php if ($journey_heading) : ?>
                            <h2 class="sectionHeading" data-aos="slide-up" data-aos-duration="300"><?php echo strip_tags($journey_heading, '<br>'); ?></h2>
                        <?php endif; ?>
                        <?php if ($journey_description) : ?>
                            <span class="description" data-aos="slide-up" data-aos-duration="300" data-aos-delay="100"><?php echo strip_tags($journey_description, '<br>'); ?></span>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <?php if (have_rows('journey_services')) : ?>
                    <div class="journeyUl">
                        <ul>
                            <?php while (have_rows('journey_services')) : the_row();
                                $service_icon = get_sub_field('service_icon');
                                $service_title = get_sub_field('service_title');
                                $service_description = get_sub_field('service_description');
                                $service_link = get_sub_field('service_link');
                            ?>
                                <li data-aos="slide-up" data-aos-duration="300" data-aos-delay="100">
                                    <div class="journeyli">
                                        <div class="row">
                                            <div class="col-5 col-xxl-5">
                                                <?php if ($service_icon || $service_title) : ?>
                                                    <div class="journeyliTitle">
                                                        <?php if ($service_icon) : ?>
                                                            <div class="journeyliIcon">
                                                                <img src="<?php echo $service_icon['url']; ?>" alt="<?php echo $service_icon['alt']; ?>">
                                                            </div>
                                                        <?php endif; ?>
                                                        <?php if ($service_title) : ?>
                                                            <h3 class="secondarySubHeading"><?php echo strip_tags($service_title, '<br>'); ?></h3>
                                                        <?php endif; ?>
                                                    </div>
                                                <?php endif; ?>
                                            </div>

                                            <div class="col-6 col-xxl-6">
                                                <?php if ($service_description) : ?>
                                                    <div class="journeyliContent">
                                                        <span class="secondaryDescription">
                                                            <?php echo strip_tags($service_description, '<br>'); ?>
                                                            <?php if ($service_link) : ?>
                                                                <a href="<?php echo $service_link['url']; ?>" class="secondaryLink"><?php echo $service_link['title']; ?></a>
                                                            <?php endif; ?>
                                                        </span>
                                                    </div>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            <?php endwhile; ?>
                        </ul>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
<?php endif; ?>