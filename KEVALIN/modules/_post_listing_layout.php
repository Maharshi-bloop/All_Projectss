<?php if (get_row_layout() == 'post_listing_layout'): ?>
    <section class="postWrapper">
        <div class="container">
            <div class="postWrapperInner">
                <div class="postWrapperTop">
                    <div class="row">
                        <?php
                        $heading = get_sub_field('heading');
                        $description = get_sub_field('description');
                        $button_link = get_sub_field('button_link');
                        ?>
                        <div class="col-6 col-xxl-6">
                            <?php if ($heading || $description): ?>
                                <div class="postWrapperTitle">
                                    <?php if ($heading): ?><h3 class="secondarySecHeading" data-aos="slide-up" data-aos-duration="300"><?php echo strip_tags($heading, '<br>'); ?></h3><?php endif; ?>
                                    <?php if ($description): ?><span class="description" data-aos="slide-up" data-aos-duration="300" data-aos-delay="100"><?php echo strip_tags($description, '<br>'); ?></span><?php endif; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                        <div class="col-6 col-xxl-6">
                            <?php if ($button_link): ?>
                                <div class="postTopCta">
                                    <a href="<?php echo $button_link['url']; ?>" class="primaryBtn" data-aos="slide-up" data-aos-duration="300" data-aos-delay="100" target="<?php echo $button_link['target']; ?>">
                                        <?php echo $button_link['title']; ?>
                                    </a>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                <div class="postListing">
                    <div class="row">
                        <?php
                        $query = new WP_Query([
                            'post_type' => 'post',
                            'posts_per_page' => 3
                        ]);

                        if ($query->have_posts()):
                            $delay = "0";
                            while ($query->have_posts()): $query->the_post();
                                $category = get_the_category();
                                $category_name = !empty($category) ? $category[0]->name : '';
                        ?>
                                <div class="col-4 col-xxl-4">
                                    <a href=" <?php the_permalink(); ?>" class="postList" data-aos="slide-up" data-aos-duration="300" data-aos-delay="<?php echo $delay ?>">
                                        <?php if (has_post_thumbnail()): ?>

                                            <div class="postImage">
                                                <?php the_post_thumbnail('full'); ?>
                                            </div>

                                        <?php endif; ?>
                                        <div class="postContent">
                                            <div class="postText">
                                                <?php if ($category_name): ?><strong class="primaryDescription"><?php echo $category_name; ?></strong><?php endif; ?>
                                                <h4 class="titleText"><?php echo strip_tags(get_the_title(), '<br>'); ?></h4>
                                                <span class="description"><?php echo strip_tags(get_the_excerpt(), '<br>'); ?></span>
                                            </div>
                                            <span class="primaryLink">
                                                Read more
                                            </span>
                                        </div>
                                    </a>
                                </div>
                        <?php
                                $delay += 100;
                            endwhile;
                            wp_reset_postdata();
                        endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
<?php endif; ?>