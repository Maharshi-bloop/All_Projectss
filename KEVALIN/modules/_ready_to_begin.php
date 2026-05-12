<?php if (get_row_layout() == 'ready_to_begin'): ?>
    <?php
    $heading = get_sub_field('ready_heading');
    $description = get_sub_field('ready_description');
    $button_link = get_sub_field('ready_button_link');
    ?>
    <section class="readyToBegin">
        <div class="container">
            <div class="readyToBeginInner text-center">
                <?php if ($heading): ?>
                    <h3 class="sectionHeading"><?php echo strip_tags($heading, '<br>'); ?></h3>
                <?php endif; ?>

                <?php if ($description): ?>
                    <span class="description"><?php echo strip_tags($description, '<br>'); ?></span>
                <?php endif; ?>

                <?php if ($button_link): ?>
                    <a href="<?php echo $button_link['url']; ?>" class="primaryBtn">
                        <?php echo $button_link['title']; ?>
                    </a>
                <?php endif; ?>
            </div>
        </div>
    </section>
<?php endif; ?>