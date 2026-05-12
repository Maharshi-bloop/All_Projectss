<?php if (get_row_layout() == 'services_shortcode'):
    $shortcode = get_sub_field('shortcode');
?>
<?php echo do_shortcode($shortcode); ?>
<?php endif; ?>