<?php if (get_row_layout() == 'contact_shortcode'): 
    $form_shortcode = get_sub_field('form_shortcode');
?>
<?php echo do_shortcode($form_shortcode); ?>
<?php endif; ?>