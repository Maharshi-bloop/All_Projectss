<?php

/**
 * Template Name: Home Page
 *
 * @package WordPress
 * @subpackage dtheme
 * @since dtheme 1.0
 */

get_header();
?>
<section class="banner">
    <div class="bannerVideo">
        <video autoplay loop muted playsinline poster="<?php echo get_template_directory_uri(); ?>/assets/images/banner-poster.png">
            <source src="<?php echo get_template_directory_uri(); ?>/assets/images/banner-video.mp4" type="video/mp4">
        </video>
    </div>
    <div class="container">
        <div class="bannerInner">
            <div class="bannerContent">
                <h1 class="bannerHeading">Compassionate Care
                    for Addiction, Recovery,
                    and Renewed Well-Being</h1>
                <span>Frisco Psychiatrist</span>
                <div class="btnWrapper">
                    <div class="bannerBtn">
                        <a href="#" class="primaryBtn">Book Appointment</a>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="starCol">
    <div class="container">
        <div class="starColInner">
            <div class="row">
                <div class="col-xxl-4">
                    <div class="starBox">
                        <div class="starIcon">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/heart-icon.svg" alt="">
                        </div>
                        <div class="starContent">
                            <h3 class="subHeading">Comprehensive Care</h3>
                            <span class="description">Tailored plans from diagnosis to recovery, ensuring
                                structured support for your long-term well-being.</span>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-4">
                    <div class="starBox">
                        <div class="starIcon">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/star-icon.svg" alt="">
                        </div>
                        <div class="starContent">
                            <h3 class="subHeading">Experienced Professionals</h3>
                            <span class="description">Expert-led care by Dr. Jain, a board-certified
                                psychiatrist specializing in addiction and general psychiatry.</span>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-4">
                    <div class="starBox">
                        <div class="starIcon">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hand-shake-icon.svg" alt="">
                        </div>
                        <div class="starContent">
                            <h3 class="subHeading">Personalized Approach</h3>
                            <span class="description">Focused care designed for you, offering guidance and
                                treatment aligned with your unique needs.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="imageExTextWrapper">
    <div class="container">
        <div class="imageExTextWrapperInner">
            <div class="row">
                <div class="col-xxl-5">
                    <div class="imageExTextImg">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/kevalin-member-image.png" alt="kevalin-member-image">
                    </div>
                </div>
                <div class="col-xxl-6">
                    <div class="imageExTextContent Counter">
                        <h2 class="sectionHeading">Committed to Excellence
                            in Mental Health Care
                        </h2>
                        <span class="description">Kevalin Psychiatry offers a compassionate, results-driven
                            approach to mental health. With a focus on addiction, substance abuse, anxiety,
                            depression, and bipolar disorders, we’re dedicated to helping our patients
                            achieve their best lives.</span>

                        <ul>
                            <li>
                                <div class="careResult">
                                    <div class="count">99</div>
                                    <span class="description">Our patients report a high satisfaction rate,
                                        reflecting the compassionate, attentive care they receive.</span>
                                </div>
                            </li>
                            <li>
                                <div class="careResult">
                                    <div class="count">15</div>
                                    <span class="description">With over 15 years of experience, Dr. Jain
                                        brings a depth of knowledge and commitment to supporting individuals
                                        on their mental health journeys.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="journeyList">
    <div class="container">
        <div class="journeyListInner">
            <div class="journeyListTop">
                <h2 class="sectionHeading">Your Journey to Wellness, Supported Every Step of the Way</h2>
                <span class="description">We believe that mental health care should be compassionate,
                    comprehensive, and tailored to each individual. Our range of services is designed to
                    address a variety of mental health needs, providing you with the support, tools, and
                    expertise to thrive.</span>
            </div>
            <div class="journeyUl">
                <ul>
                    <li>
                        <div class="journeyli">
                            <div class="row">
                                <div class="col-xxl-5 col-md-12">
                                    <div class="journeyliTitle">
                                        <div class="journeyliIcon">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/addiction-icon.png" alt="">
                                        </div>
                                        <h3 class="secondarySubHeading">Addiction and Substance Abuse
                                            Recovery</h3>
                                    </div>

                                </div>
                                <div class="col-xxl-6 col-md-12">
                                    <div class="journeyliContent">
                                        <span class="secondaryDescription">A comprehensive, non-judgmental
                                            approach
                                            to overcoming substance use disorders and drug addiction,
                                            empowering you with the tools for long-term recovery and
                                            resilience. <a href="#" class="secondaryLink">Learn
                                                more</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="journeyli">
                            <div class="row">
                                <div class="col-xxl-5 col-md-12">
                                    <div class="journeyliTitle">
                                        <div class="journeyliIcon">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/comprehnsive-care.png" alt="">
                                        </div>
                                        <h3 class="secondarySubHeading">Comprehensive Psychiatric Care</h3>
                                    </div>

                                </div>
                                <div class="col-xxl-6 col-md-12">
                                    <div class="journeyliContent">
                                        <span class="secondaryDescription">A thorough, personalized approach
                                            to understanding and managing your unique mental health
                                            challenges, focused on your overall well-being. <a href="#"
                                                class="secondaryLink">Learn more</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="journeyli">
                            <div class="row">
                                <div class="col-xxl-5 col-md-12">
                                    <div class="journeyliTitle">
                                        <div class="journeyliIcon">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/bipolar-support.png" alt="">
                                        </div>
                                        <h3 class="secondarySubHeading">Bipolar Disorder Support</h3>
                                    </div>

                                </div>
                                <div class="col-xxl-6 col-md-12">
                                    <div class="journeyliContent">
                                        <span class="secondaryDescription">Specialized care to help you
                                            navigate the highs and lows, achieve emotional stability, and
                                            reclaim balance in your life. <a href="#"
                                                class="secondaryLink">Learn more</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="journeyli">
                            <div class="row">
                                <div class="col-xxl-5 col-md-12">
                                    <div class="journeyliTitle">
                                        <div class="journeyliIcon">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/depression-treatment.png" alt="">
                                        </div>
                                        <h3 class="secondarySubHeading">Depression Treatment</h3>
                                    </div>

                                </div>
                                <div class="col-xxl-6 col-md-12">
                                    <div class="journeyliContent">
                                        <span class="secondaryDescription">Evidence-based therapies and
                                            compassionate care to guide you through difficult times and
                                            bring hope, energy, and meaning back to your days. <a href="#"
                                                class="secondaryLink">Learn more</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="journeyli">
                            <div class="row">
                                <div class="col-xxl-5 col-md-12">
                                    <div class="journeyliTitle">
                                        <div class="journeyliIcon">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/anxiety-management.png" alt="">
                                        </div>
                                        <h3 class="secondarySubHeading">Anxiety Management</h3>
                                    </div>

                                </div>
                                <div class="col-xxl-6 col-md-12">
                                    <div class="journeyliContent">
                                        <span class="secondaryDescription">Proven strategies to reduce
                                            overwhelming worry and fear, helping you find calm and
                                            confidence in daily life. <a href="#" class="secondaryLink">Learn more</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section class="textImageWrapper">
    <div class="container">
        <div class="textImageWrapperInner">
            <div class="row">
                <div class="row">
                    <div class="col-xxl-6">
                        <div class="textImageContent">
                            <h2 class="sectionHeading">Meet the Doctor</h2>
                            <span class="description">Dr. Ivanshu N. Jain, MD, is a board-certified
                                psychiatrist with a fellowship in addiction psychiatry and a specialized
                                focus on substance abuse treatment. His experience spans roles as an
                                attending psychiatrist, clinical assistant professor, and researcher. Known
                                for his empathetic approach, Dr. Jain focuses on helping patients navigate
                                complex mental health conditions, including addiction, bipolar disorder, and
                                depression. His commitment to personalized care ensures that every patient
                                receives the guidance and treatment they need to thrive.</span>
                            <a href="#" class="primaryBtn">Know More</a>
                        </div>
                    </div>
                    <div class="col-xxl-5">
                        <div class="textImageImg">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/doctor-image.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section class="clientTesti">
    <div class="container">
        <div class="clientTestiInner">
            <div class="row">
                <div class="col-xxl-3">
                    <div class="clientTestiTitle">
                        <h2 class="secondaryBannerHeading">Stories of
                            Healing
                            and Hope</h2>
                        <span class="secondaryDescription">100+ Positive Reviews from
                            Patients Across Texas</span>
                    </div>
                </div>
                <div class="col-xxl-3">
                    <div class="testiImageSwiper">
                        <div class="swiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="slideImage">
                                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/testi-1.png" alt="">
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="slideImage">
                                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/testi-1.png" alt="">
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="slideImage">
                                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/testi-1.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-5">
                    <div class="testiContentSwiper">
                        <div class="swiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="slideContent">
                                        <span class="secondaryDescription">Dr. Ivanshu N. Jain, MD, is a
                                            board-certified psychiatrist with a fellowship in addiction
                                            psychiatry and a specialized focus on substance abuse treatment.
                                            His experience spans roles as an attending psychiatrist,
                                            clinical assistant professor, and researcher. Known for his
                                            empathetic approach, Dr. Jain focuses on helping patients
                                            navigate complex mental health conditions, including addiction,
                                            bipolar disorder, and depression. His commitment to personalized
                                            care ensures that every patient receives the guidance and
                                            treatment they need to thrive.</span>
                                        <h3 class="secondarySubHeading">Candice Wu</h3>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="slideContent">
                                        <span class="secondaryDescription">Dr. Ivanshu N. Jain, MD, is a
                                            board-certified psychiatrist with a fellowship in addiction
                                            psychiatry and a specialized focus on substance abuse treatment.
                                            His experience spans roles as </span>
                                        <h3 class="secondarySubHeading">Candice Wu</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="swiperControl">
                                <div class="swiperBtn prevBtn">
                                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/prev-btn.svg" alt="">
                                </div>
                                <div class="swiperBtn nextBtn">
                                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/next-btn.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section class="postWrapper">
    <div class="container">
        <div class="postWrapperInner">
            <div class="postWrapperTop">
                <div class="row">
                    <div class="col-xxl-6">
                        <div class="postWrapperTitle">
                            <h3 class="secondarySecHeading">Insights and Inspiration for Your Mental
                                Wellness
                                Journey</h3>
                            <span class="description">Explore expert advice, stories, and resources to
                                support you
                                on your path to mental health. </span>
                        </div>
                    </div>
                    <div class="col-xxl-6">
                        <div class="postTopCta">
                            <a href="#" class="primaryBtn">
                                View All Posts
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="postListing">
                <div class="row">
                    <div class="col-xxl-4">
                        <div class="postList">
                            <div class="postImage">
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/depression-post.png" alt="">
                            </div>
                            <div class="postContent">
                                <div class="postText">
                                    <strong class="primaryDescription">Depression</strong>
                                    <h4 class="titleText">Understanding Depression:
                                        Signs, Symptoms, and Support</h4>
                                    <span class="description">Learn how to identify the signs of depression,
                                        understand its impact, and find ways to seek support and
                                        relief.</span>
                                </div>
                                <a href="#" class="primaryLink">
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-4">
                        <div class="postList">
                            <div class="postImage">
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/anxiety-post.png" alt="">
                            </div>
                            <div class="postContent">
                                <div class="postText">
                                    <strong class="primaryDescription">Anxiety</strong>
                                    <h4 class="titleText">Practical Tips for 
                                        Managing Anxiety Every Day</h4>
                                    <span class="description">Discover practical strategies to help manage
                                        anxiety, reduce stress and bring calm to your daily routine.</span>
                                </div>
                                <a href="#" class="primaryLink">
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-4">
                        <div class="postList">
                            <div class="postImage">
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/mental-health-post.png" alt="">
                            </div>
                            <div class="postContent">
                                <div class="postText">
                                    <strong class="primaryDescription">Mental Health Awareness</strong>
                                    <h4 class="titleText">Breaking the Stigma:
                                        Why Mental Health Care Matters</h4>
                                    <span class="description">Understanding the importance of mental health
                                        care and ways to combat stigma, encouraging open and supportive
                                        conversations.</span>
                                </div>
                                <a href="#" class="primaryLink">
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php
get_footer();
