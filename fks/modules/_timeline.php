<?php if (get_row_layout() == 'timeline') : ?>

    <?php
    $heading = get_sub_field('heading');
    $description = get_sub_field('description');
    ?>

    <section class="ppTimeLine">
        <div class="container-xl">
            <div class="ppTimeLineInner">
                <div class="row">

                    <?php if ($heading || $description) : ?>
                        <div class="col-lg-6">
                            <div class="ppTimeLineContent">

                                <?php if ($heading) : ?>
                                    <h3 class="heading11xl">
                                        <?php echo strip_tags($heading, '<br>'); ?>
                                    </h3>
                                <?php endif; ?>

                                <?php if ($description) : ?>
                                    <div class="subTextXl">
                                        <?php echo strip_tags($description, '<p><br>'); ?>
                                    </div>
                                <?php endif; ?>

                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if (have_rows('timeline_items')) : ?>
                        <div class="col-lg-4">
                            <div class="timeLineWrapper">
                                <ul>

                                    <span class="default-line"></span>
                                    <span class="draw-line"></span>

                                    <?php while (have_rows('timeline_items')) : the_row();

                                        $icon = get_sub_field('icon');
                                        $title = get_sub_field('title');
                                    ?>

                                        <?php if ($icon || $title) : ?>
                                            <li>

                                                <?php if ($icon) : ?>
                                                    <span class="timeLineIndex">
                                                        <img src="<?php echo $icon['url']; ?>" alt="">
                                                    </span>
                                                <?php endif; ?>

                                                <?php if ($title) : ?>
                                                    <div class="timeLineBox">
                                                        <h4 class="heading7xl">
                                                            <?php echo strip_tags($title, '<br>'); ?>
                                                        </h4>
                                                    </div>
                                                <?php endif; ?>

                                            </li>
                                        <?php endif; ?>

                                    <?php endwhile; ?>

                                </ul>
                            </div>
                        </div>
                    <?php endif; ?>

                </div>
            </div>
        </div>
    </section>

<?php endif; ?>