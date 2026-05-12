<?php if (get_row_layout() == 'achievement'): ?>
    <?php
    $heading = get_sub_field('achievement_heading');
    $description = get_sub_field('achievement_description');
    $counters = get_sub_field('achievement_counter');
    $achievements = get_sub_field('achievements_list');
    ?>
    <section class="achievement">
        <div class="container">
            <div class="achievementInner">
                <div class="row">

                    <!-- Achievement Content -->
                    <div class="col-6 col-xxl-6">
                        <div class="achievementContent">
                            <?php if ($heading || $description): ?>
                                <div class="achievementTop">
                                    <?php if ($heading): ?>
                                        <h3 class="secondaryBannerHeading" data-aos="slide-up" data-aos-duration="300" data-aos-delay="0"><?php echo strip_tags($heading, '<br>'); ?></h3>
                                    <?php endif; ?>

                                    <?php if ($description): ?>
                                        <span class="secondaryDescription" data-aos="slide-up" data-aos-duration="300" data-aos-delay="100"><?php echo strip_tags($description, '<br>'); ?></span>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>

                            <?php if ($counters): ?>
                                <div class="achievementCount Counter">
                                    <ul>
                                        <?php 
                                        $delay ="0";
                                        foreach ($counters as $counter): ?>
                                            <?php
                                            $count_number = $counter['counter_number'];
                                            $count_label = $counter['counter_label'];
                                            ?>
                                            <?php if ($count_number || $count_label): ?>
                                                <li data-aos="slide-up" data-aos-duration="300" data-aos-delay="<?php echo $delay?>">
                                                    <div class="achievementCountBox">
                                                        <?php if ($count_number): ?>
                                                            <span class="count"><?php echo $count_number; ?></span>
                                                        <?php endif; ?>
                                                        <?php if ($count_label): ?>
                                                            <span><?php echo strip_tags($count_label); ?></span>
                                                        <?php endif; ?>
                                                    </div>
                                                </li>
                                            <?php endif; ?>
                                        <?php
                                        $delay =+ 100;
                                     endforeach; ?>
                                    </ul>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>

                    <!-- Achievement Listing -->
                    <div class="col-6 col-xxl-6">
                        <?php if ($achievements): ?>
                            <div class="achievementListing">
                                <ul>
                                    <?php 
                                    $delay = "0";
                                    foreach ($achievements as $achievement): ?>
                                        <?php
                                        $icon = $achievement['list_icon'];
                                        $list_heading = $achievement['list_heading'];
                                        $list_description = $achievement['list_description'];
                                        ?>
                                        <?php if ($icon || $list_heading || $list_description): ?>
                                            <li data-aos="slide-up" data-aos-duration="300" data-aos-delay="<?php echo $delay?>">
                                                <div class="achievementList">
                                                    <?php if ($icon): ?>
                                                        <div class="achievementListIcon">
                                                            <img src="<?php echo $icon; ?>" alt="">
                                                        </div>
                                                    <?php endif; ?>

                                                    <div class="achievementListText">
                                                        <?php if ($list_heading): ?>
                                                            <h3 class="sectionHeading"><?php echo strip_tags($list_heading, '<br>'); ?></h3>
                                                        <?php endif; ?>

                                                        <?php if ($list_description): ?>
                                                            <span class="secondaryDescription"><?php echo strip_tags($list_description, '<br>'); ?></span>
                                                        <?php endif; ?>
                                                    </div>
                                                </div>
                                            </li>
                                        <?php endif; ?>
                                    <?php
                                    $delay =+ 100;
                                 endforeach; ?>
                                </ul>
                            </div>
                        <?php endif; ?>
                    </div>

                </div>
            </div>
        </div>
    </section>
<?php endif; ?>