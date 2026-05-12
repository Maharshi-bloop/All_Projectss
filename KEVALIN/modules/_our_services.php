<?php if (get_row_layout() == 'our_services'): 
    $section_heading = get_sub_field('section_heading');
    $shortcode = get_sub_field('shortcode');
?>
<?php echo do_shortcode($shortcode); ?>
<?php endif; ?>