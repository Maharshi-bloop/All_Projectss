<?php

/**
 * Template Name: Contact Page
 *
 * @package WordPress
 * @subpackage dtheme
 * @since dtheme 1.0
 */

get_header();
?>
<section>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2 class="contact-title">Contact Us</h2>
                <div class="formDesign">
                    <div class="form">
                        <?php
                        echo do_shortcode('[contact-form-7 id="3600663" title="Contact form 1"]');
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php
get_footer();
