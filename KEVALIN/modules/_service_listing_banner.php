<?php if (get_row_layout() == 'service_listing_banner'): ?>
    <?php
    $heading = strip_tags(get_sub_field('heading'), '<br>');
    $description = strip_tags(get_sub_field('description'), '<br>');
    $we_offer_heading = strip_tags(get_sub_field('we_offer_heading'), '<br>');
    $we_offer_description = get_sub_field('we_offer_description');
    ?>
    <section class="serviceListingBanner">
        <div class="container">
            <div class="serviceListingBannerInner">

                <?php if ($heading || $description): ?>
                    <div class="serviceListingBannerTop text-center">
                        <?php if ($heading): ?>
                            <h2 class="secondaryBannerHeading"><?php echo $heading; ?></h2>
                        <?php endif; ?>
                        <?php if ($description): ?>
                            <span class="description"><?php echo $description; ?></span>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <?php if ($we_offer_heading || have_rows('we_offer_list')): ?>
                    <div class="weOffer">
                        <?php if ($we_offer_heading): ?>
                            <h3 class="secondarySecHeading text-center"><?php echo $we_offer_heading; ?></h3>
                        <?php endif; ?>

                        <?php if ($we_offer_description): ?>
                            <div class="weOfferUl">
                            <?php echo $we_offer_description; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

            </div>
        </div>
    </section>
<?php endif; ?>