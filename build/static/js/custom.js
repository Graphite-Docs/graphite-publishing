/*
===========================================================================
 EXCLUSIVE ON themeforest.net
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Template Name   : NextGen
 Author          : ThemePaa
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Copyright (c) 2017 - 
===========================================================================
*/

(function($){
	"use strict";
	var GEN = {};
	var plugin_track = 'static/plugin/';
	$.fn.exists = function () {
        return this.length > 0;
    };

	/* ---------------------------------------------- /*
	 * Pre load
	/* ---------------------------------------------- */
	GEN.PreLoad = function() {
		document.getElementById("loading").style.display = "none"; 
	}

    /*--------------------
        * Menu Close
    ----------------------*/
    GEN.MenuClose = function(){
      $('.navbar-nav .nav-link').on('click', function() {
       var toggle = $('.navbar-toggler').is(':visible');
       if (toggle) {
         $('.navbar-collapse').collapse('hide');
       }
      });
    }


	/* ---------------------------------------------- /*
	 * Header Fixed
	/* ---------------------------------------------- */
	GEN.HeaderFixd = function() {
		var HscrollTop  = $(window).scrollTop();  
	    if (HscrollTop >= 100) {
	       $('header').addClass('fixed-header');
	    }
	    else {
	       $('header').removeClass('fixed-header');
	    }
	}

	/*--------------------
        * One Page
    ----------------------*/
    GEN.OnePage = function(){
        $('header a[href*="#"]:not([href="#"]), .got-to a[href*="#"]:not([href="#"])').on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
              var target = $(this.hash);
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                  if (target.length) {
                    $('html,body').animate({
                      scrollTop: target.offset().top - 70,
                      }, 1000);
                      return false;
                  }
            }
        });
    }


	/* ---------------------------------------------- /*
	 * Mega Menu
	/* ---------------------------------------------- */

	GEN.MegaMenu = function() {
		var mDropdown = $(".m-dropdown-toggle") 
		mDropdown.on("click", function() {
	        $(this).parent().toggleClass("open-menu-parent");
	        $(this).next('ul').toggleClass("open-menu");
	        $(this).toggleClass("open");
	    });
	}


	/*--------------------
    * Counter JS
    ----------------------*/
	 GEN.Counter = function () {
	  var counter = jQuery(".counter");
	  var $counter = $('.counter');
	  if(counter.length > 0) {  
	      loadScript(plugin_track + 'counter/jquery.countTo.js', function() {
	        $counter.each(function () {
	         var $elem = $(this);                 
	           $elem.appear(function () {
	             $elem.find('.count').countTo({
	             	speed: 2000,
    				refreshInterval: 10
	             });
	          });                  
	        });
	      });
	    }
	  }


    /*--------------------
    * OwlSlider
    ----------------------*/
    GEN.Owl = function () {
      var owlslider = jQuery("div.owl-carousel");
      if(owlslider.length > 0) {  
         loadScript(plugin_track + 'owl-carousel/js/owl.carousel.min.js', function() {
           owlslider.each(function () {
            var $this = $(this),
                $items = ($this.data('items')) ? $this.data('items') : 1,
                $loop = ($this.attr('data-loop')) ? $this.data('loop') : true,
                $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
                $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
                $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
                $autospeed = ($this.attr('data-autospeed')) ? $this.data('autospeed') : 5000,
                $smartspeed = ($this.attr('data-smartspeed')) ? $this.data('smartspeed') : 1000,
                $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
                $CenterSlider = ($this.data('center')) ? $this.data('center') : false,
                $space = ($this.attr('data-space')) ? $this.data('space') : 30;    
           
                $(this).owlCarousel({
                    loop: $loop,
                    items: $items,
                    responsive: {
                      0:{items: $this.data('xx-items') ? $this.data('xx-items') : 1},
                      480:{items: $this.data('xs-items') ? $this.data('xs-items') : 1},
                      768:{items: $this.data('sm-items') ? $this.data('sm-items') : 2},
                      980:{items: $this.data('md-items') ? $this.data('md-items') : 3},
                      1200:{items: $items}
                    },
                    dots: $navdots,
                    autoplayTimeout:$autospeed,
                    smartSpeed: $smartspeed,
                    autoHeight:$autohgt,
                    center:$CenterSlider,
                    margin:$space,
                    nav: $navarrow,
                    navText:["<i class='ti-arrow-left'></i>","<i class='ti-arrow-right'></i>"],
                    autoplay: $autoplay,
                    autoplayHoverPause: true   
                }); 
           }); 
         });
      }
    }

	/* ---------------------------------------------- /*
     * lightbox gallery
    /* ---------------------------------------------- */
    GEN.Gallery = function() {
    	if ($(".lightbox-gallery").exists() || $(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()){
    		loadScript(plugin_track + 'magnific/jquery.magnific-popup.min.js', function() {
    			if($(".lightbox-gallery").exists()){
    				$('.lightbox-gallery').magnificPopup({
				        delegate: '.gallery-link',
				        type: 'image',
				        tLoading: 'Loading image #%curr%...',
				        mainClass: 'mfp-fade',
				        fixedContentPos: true,
				        closeBtnInside: false,
				        gallery: {
				            enabled: true,
				            navigateByImgClick: true,
				            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
				        }
				    });	
    			}
    			if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
		            $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		                  disableOn: 700,
		                  type: 'iframe',
		                  mainClass: 'mfp-fade',
		                  removalDelay: 160,
		                  preloader: false,
		                  fixedContentPos: false
		            });
		        }
    		});
    	}
    }


    /*--------------------
        * Tyoe It
    ----------------------*/
    GEN.VideoBG = function() {
    	if ($(".video-bg").exists()){
		loadScript(plugin_track + 'vide/jquery.vide.min.js', function() {
			});
		}
    }

    /*-----------------------
    * Working Contact form
    -------------------------*/
    GEN.ContactForm = function(){
      $(".contactform").on("submit", function() {
          $(".output_message").text("Loading...");

          var form = $(this);
          $.ajax({
              url: form.attr("action"),
              method: form.attr("method"),
              data: form.serialize(),
              success: function(result) {
                  if (result == "success") {
                      $(".contactform").find(".output_message").addClass("success");
                      $(".output_message").text("Message Sent!");
                  } else {
                      $(".contactform").find(".output_message").addClass("error");
                      $(".output_message").text("Error Sending!");
                  }
              }
          });

          return false;
      });
    }

	

	/* ---------------------------------------------- /*
	 * All Functions
	/* ---------------------------------------------- */
    // loadScript
	var _arr  = {};
	function loadScript(scriptName, callback) {
	    if (!_arr[scriptName]) {
	      _arr[scriptName] = true;
	      var body    = document.getElementsByTagName('body')[0];
	      var script    = document.createElement('script');
	      script.type   = 'text/javascript';
	      script.src    = scriptName;
	      // then bind the event to the callback function
	      // there are several events for cross browser compatibility
	      // script.onreadystatechange = callback;
	      script.onload = callback;
	      // fire the loading
	      body.appendChild(script);
	    } else if (callback) {
	      callback();
	    }
	};

	// Window on Load
	$(window).on("load", function(){
		GEN.PreLoad();
	});
	// Document on Ready
	$(document).on("ready", function(){
		GEN.VideoBG(),
		GEN.HeaderFixd(),
		GEN.OnePage(),
		GEN.Counter(),
		GEN.MenuClose(),
		GEN.Gallery(),
		GEN.MegaMenu(),
		GEN.ContactForm(),
		GEN.Owl();
		
	});

	// Document on Scrool
	$(window).on("scroll", function(){
		GEN.HeaderFixd();
	});

	// Window on Resize
	$(window).on("resize", function(){
	});


})(jQuery);