
(function ($) {
    "use strict";

    $(window).on('load', function () {
        var preloaderFadeOutTime = 500;
        function hidePreloader() {
            var preloader = $('.br-spinner-wrapper');
            setTimeout(function () {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 500);
        }
        hidePreloader();
    });

    $(window).on('scroll load', function () {
        if ($(".navbar").offset().top > 60) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    $(function () {
        $(document).on('click', 'a.page-scroll', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    $(".navbar-nav li a").on("click", function (event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });

    var imageSliderOne = new Swiper('.image-slider-1', {
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false
        // },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    var videoSliderOne = new Swiper('.video-slider-1', {
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false
        // },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    var imageSliderTwo = new Swiper('.image-slider-2', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
        breakpoints: {
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });


    var textSlider = new Swiper('.text-slider', {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        spaceBetween: 70,
        slidesPerView: 2,
        breakpoints: {
            1199: {
                slidesPerView: 1,
            },
        }
    });


    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function (url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if (!m || !m[1]) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function (url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if (!m || !m[5]) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    $("input, textarea").keyup(function () {
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });


    $("#registrationForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            rformError();
            rsubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            rsubmitForm();
        }
    });

    function rsubmitForm() {
        var name = $("#rname").val();
        var email = $("#remail").val();
        var phone = $("#rphone").val();
        var terms = $("#rterms").val();

        $.ajax({
            type: "POST",
            url: "php/registrationform-process.php",
            data: "name=" + name + "&email=" + email + "&phone=" + phone + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    rformSuccess();
                } else {
                    rformError();
                    rsubmitMSG(false, text);
                }
            }
        });
    }

    function rformSuccess() {
        $("#registrationForm")[0].reset();
        rsubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty');
    }

    function rformError() {
        $("#registrationForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function rsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#rmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    $("#newsletterForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            nformError();
            nsubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            nsubmitForm();
        }
    });

    function nsubmitForm() {
        var email = $("#nemail").val();
        var terms = $("#nterms").val();
        $.ajax({
            type: "POST",
            url: "php/newsletterform-process.php",
            data: "email=" + email + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    nformSuccess();
                } else {
                    nformError();
                    nsubmitMSG(false, text);
                }
            }
        });
    }

    function nformSuccess() {
        $("#newsletterForm")[0].reset();
        nsubmitMSG(true, "Subscribed!");
        $("input").removeClass('notEmpty');
    }

    function nformError() {
        $("#newsletterForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function nsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#nmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            cformError();
            csubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            csubmitForm();
        }
    });

    function csubmitForm() {
        var name = $("#cname").val();
        var phone = $("#cphone").val();
        var message = $("#cmessage").val();
        var terms = $("#cterms").val();
        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data: "name=" + name + "&phone=" + phone + "&message=" + message + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, text);
                }
            }
        });
    }

    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty');
        $("textarea").removeClass('notEmpty');
    }

    function cformError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    $("#privacyForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        var name = $("#pname").val();
        var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();

        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
    }

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty');
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });

    $(".button, a, button").mouseup(function () {
        $(this).blur();
    });

})(jQuery);

const defaultLocale = "en";
let locale;
const translationsData = {
    // English translations
    "en": {
        "home": "Home",
        "register": "Register",
        "details": "Details",
        "contact": "Contact",
        "discover": "DISCOVER",
        "tag_line": "First time in Pune..! < br > Smart Schooling Program",
        "testimonials_coming_soon": "More testimonials coming soon",
        "register_using_the_form": "Register Using The Form",
        "register_using_the_form_sub1": "It's easy to register for the course, just fill out the form and click submit. Then you willbe registered for one of the best education academy",
        "register_using_the_form_sub2": "Your information is required to complete the registration",
        "name": "Name",
        "email_address": "Email address",
        "phone_number": "Phone number",
        "feature": "FEATURED IN",
        "key_features": "Key Features",
        "smart_schooling_program": "Smart Schooling Program",
        "personality_development": "Personality Development",
        "ac_classroom": "AC Classrooms",
        "outcome_based_reporting": "Outcome Based Reporting",
        "counselling_and_guidance": "One-to-one Counselling and Guidance",
        "coverage_topics": "Holistic Coverage of Topics",
        "current_affair_classes": "Current Affair classes",
        "expert_faculties": "Senior/Expert faculties",
        "interaction_with_officers": "Interaction with officers",
        "hostel_facility_available": "Hostel Facility available",
        "smart_classroom": "Smart Classroom",
        "bridging_the_gap": "Smart Schooling Program-Bridging the gap",
        "school_academic_syllabus_completion": " School Academic syllabus completion",
        "competitive_exam_coaching_experience": "Expert/Seniors faculties with competitive exam coaching experience",
        "competitive_exams": "Foundation courses for various competitive exams-UPSC (CSE), Banking (RBI, SBI, IBPS, etc.)SSC, MPSC (Group B & C)",
        "reading_habit": "Creating newspaper reading habit (Current affairs classes)",
        "interview_and_soft_skills": "Personality grooming and training for the Interview and Soft skills",
        "learning_new_things": "Instilling inquisitiveness for learning new things",
        "better_growth": "Sowing seeds (Junior college level) early & deep enough for better growth.",
        "individual_level": "Providing targated service tailored at an Individual level",
        "appraisal_report": "360 degree appraisal report (Smart Outcome based reporting)",
        "learning_method_online/offline": "Hybrid learning method-online/offline",
        "grab_early_approach": "Start Early Grab Early approach",
        "MPSC/UPSC_program": "MPSC/UPSC Program",
        "visiting_faculties": "Visiting faculties from Delhi/Expert faculties.",
        "interview_skills_personality_grooming": "Outcome based learning process-test series, interview skills and personality grooming",
        "supporting_servies": "Supporting Servies- Targated based monitoring, Counselling and guidance.",
        "quantitative_values_of_students": "Improving qualitative and quantitative values of students",
        "quantitative_values_like_exam_scores": "Quantitative values like exam scores",
        "conceptual_clarity": "Qualitative values like greater awareness focus, conceptual clarity",
        "whay_brace": "Why Brace Education Academy",
        "whay_brace_1": "Fundamental need in teenage is psychological understanding and providing them the right direction",
        "whay_brace_2": "Crucial time for the kids to provide tailored guidance",
        "whay_brace_3": "Counselling is the bedrock for creating harmonic environment",
        "whay_brace_4": "Understands the need of present generation",
        "to_know_more_about_competitive_exam": "To know more about competitive exams",
        "contact_details": "Contact Details",
        "contact_details1": "For registration enquiry please get in touch using the contact details below. For any enquiry use the form.",
        "your_message": "Your message",
        "about_brace_education": "About Brace Education Academy",
        "about_brace_education1": "Focuses on efficient learning method. It’s a one stop solution for smart education",
        "about_brace_academy": "Brace Education Academy",
        "about1": "About",
        "about2": "",
        "head_office": "Head Office",
        "address1": "3rd Floor, Above Pashankar Honda Showroom, JM Road, Shivajinagar, Pune, Maharashtra 411005",
        "regd_office": "Regd. Office",
        "address2": "Global Port : Pune Banglore Highway Pashan Exit, Baner, Pune, Maharashtra 411045"

    },
    // Marathi translations
    "mr": {
        "home": "मुख्यपृष्ठ",
        "register": "नोंदणी करा",
        "details": "तपशील",
        "contact": "संपर्क",
        "discover": "शोधा",
        "tag_line": "पुण्यात पहिल्यांदाच..!< br>स्मार्ट स्कूलिंग कार्यक्रम",
        "testimonials_coming_soon": "अधिक प्रशस्तिपत्रे लवकरच येत आहेत...",
        "register_using_the_form": "फॉर्म वापरून नोंदणी करा",
        "register_using_the_form_sub1": "कोर्ससाठी नोंदणी करणे सोपे आहे, फक्त फॉर्म भरा आणि सबमिट करा क्लिक करा. मग तुमची नोंदणी सर्वोत्तम शिक्षण अकादमीसाठी केली जाईल",
        "register_using_the_form_sub2": "नोंदणी पूर्ण करण्यासाठी तुमची माहिती आवश्यक आहे",
        "name": "नाव",
        "email_address": "ईमेल",
        "phone_number": "फोन नंबर",
        "your_message": "तुमचा निरोप",
        "feature": "वैशिष्ट्यपूर्ण",
        "key_features": "महत्वाची वैशिष्टे",
        "smart_schooling_program": "स्मार्ट स्कूलिंग कार्यक्रम",
        "personality_development": "व्यक्तिमत्व विकास",
        "ac_classroom": "एसी वर्गखोल्या",
        "outcome_based_reporting": "परिणाम आधारित अहवाल",
        "counselling_and_guidance": "वैयक्तिक समुपदेशन आणि मार्गदर्शन",
        "coverage_topics": "विषयांचे समग्र कव्हरेज",
        "current_affair_classes": "चालू घडामोडींचे वर्ग",
        "expert_faculties": "वरिष्ठ/तज्ञ शिक्षक",
        "interaction_with_officers": "अधिकाऱ्यांशी संवाद",
        "hostel_facility_available": "वसतिगृहाची सुविधा उपलब्ध",
        "smart_classroom": "स्मार्ट वर्ग",
        "bridging_the_gap": "स्मार्ट स्कूलिंग कार्यक्रम - अंतर भरून काढणे",
        "school_academic_syllabus_completion": "शालेय शैक्षणिक अभ्यासक्रम पूर्ण",
        "competitive_exam_coaching_experience": "स्पर्धात्मक परीक्षा प्रशिक्षण अनुभवासह तज्ञ/वरिष्ठ संकाय",
        "competitive_exams": "विविध स्पर्धा परीक्षांसाठी पायाभूत अभ्यासक्रम- UPSC (CSE), बँकिंग (RBI, SBI, IBPS इ.) SSC, MPSC (गट B आणि C)",
        "reading_habit": "वृत्तपत्र वाचनाची सवय निर्माण करणे (चालू घडामोडी वर्ग)",
        "interview_and_soft_skills": "मुलाखत आणि सॉफ्ट स्किल्ससाठी व्यक्तिमत्व विकास आणि प्रशिक्षण",
        "learning_new_things": "नवीन गोष्टी शिकण्यासाठी जिज्ञासा निर्माण करणे",
        "better_growth": "चांगल्या वाढीसाठी बियाणे पेरणे (कनिष्ठ महाविद्यालयीन स्तर) लवकर आणि पुरेसे खोल.",
        "individual_level": "वैयक्तिक स्तरावर तयार केलेली लक्ष्यित सेवा प्रदान करणे",
        "appraisal_report": "360 अंश मूल्यांकन अहवाल (स्मार्ट परिणाम आधारित अहवाल)",
        "learning_method_online/offline": "संकरित शिक्षण पद्धत-ऑनलाइन/ऑफलाइन",
        "grab_early_approach": "लवकर प्रारंभ करा लवकर पकड शिक्षण पध्दत",
        "MPSC/UPSC_program": "MPSC/UPSC कार्यक्रम",
        "visiting_faculties": "दिल्लीतील तज्ञाकडून मार्गदर्शन व भेट",
        "interview_skills_personality_grooming": "परिणाम आधारित शिक्षण प्रक्रिया सराव चाचणी मालिका, मुलाखत कौशल्ये आणि व्यक्तिमत्व विकास",
        "supporting_servies": "सहाय्यक सेवा - लक्षकेंद्रित समुपदेशन आणि मार्गदर्शन",
        "quantitative_values_of_students": "विद्यार्थ्याची गुणात्मक आणि परिमाणात्मक मूल्ये सुधारणे.",
        "quantitative_values_like_exam_scores": "परिमाणवाचक मूल्ये जसे परीक्षेचे गुण",
        "conceptual_clarity": "वैचारिक स्पष्टता यासारखी गुणात्मक मूल्ये",
        "whay_brace": "ब्रेस एज्युकेशन अकादमी का ?",
        "whay_brace_1": "किशोरवयीन मुलांमध्ये मूलभूत गरज म्हणजे मानसिक समज आणि त्यांना योग्य दिशा देणे",
        "whay_brace_2": "मुलांसाठी योग्य मार्गदर्शन प्रदान करण्यासाठी महत्त्वपूर्ण वेळ",
        "whay_brace_3": "समुपदेशन हा सुसंवादी वातावरण निर्माण करण्याचा पाया आहे",
        "whay_brace_4": "सध्याच्या पिढीची गरज समजते",
        "to_know_more_about_competitive_exam": "स्पर्धा परीक्षांबद्दल अधिक जाणून घेण्यासाठी",
        "contact_details": "संपर्कसाठी तपशील",
        "contact_details1": "नोंदणी चौकशीसाठी कृपया खालील संपर्क तपशील वापरून संपर्क साधा. कोणत्याही चौकशीसाठी फॉर्म वापरा.",
        "about_brace_academy": "ब्रेस एज्युकेशन अकादमी",
        "about_brace_education1": "कार्यक्षम शिक्षण पद्धतीवर लक्ष केंद्रित करते. स्मार्ट शिक्षणासाठी हा एक उपाय आहे",
        "about1": "",
        "about2": "बद्दल",
        "head_office": "मुख्य कार्यालय",
        "address1": "3रा मजला, पाषाणकर होंडा शोरूमच्या वर, जेएम रोड, शिवाजीनगर, पुणे, महाराष्ट्र 411005",
        "regd_office": "नोंदणी कार्यालय",
        "address2": "ग्लोबल पोर्ट: पुणे बंगलोर महामार्ग पाषाण एक्झिट, बाणेर, पुणे, महाराष्ट्र ४१११०४५",
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // Translate the page to the default locale
    console.log("test addEventListener")
    setLocale(defaultLocale);
    bindLocaleSwitcher(defaultLocale);
});
// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {
    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    translatePage();
}
// Retrieve translations JSON object for the given
// locale over the network
async function fetchTranslationsFor(newLocale) {
    // const response = await fetch(`/lang/language.json`);
    // return await response.json();
    console.log(newLocale)
    return translationsData[newLocale];

}
// Replace the inner text of each element that has a
// data-i18n-key attribute with the translation corresponding
// to its data-i18n-key
function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}
// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerText = translation;
}
function bindLocaleSwitcher(initialValue) {
    const switcher =
        document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
        // Set the locale to the selected option[value]
        setLocale(e.target.value);
    };

    /* TESTIMONIALS jQuery START */
    /* Demo purposes only */
    $(".hover").mouseleave(
        function () {
            $(this).removeClass("hover");
        }
    );


    /* TESTIMONIALS jQuery END */

}
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}