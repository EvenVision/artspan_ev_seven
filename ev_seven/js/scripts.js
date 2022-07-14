(function ($) {
 
	Drupal.behaviors.scripts = {
		attach: function (context, settings) {

			//PAGES Setting min-page-height to cover the viewport
			$(document).ready(function() {
				resizePage();
			});
			$(document).ready(function() {
				// Code to sync event titles:
				$(".node-studio_event-form #edit-title").val($(this).val())
				console.log($(".node-studio_event-form #edit-field-event-name-und-0-value").val());
				$(".node-studio_event-form #edit-field-event-name-und-0-value").change(function(){
					console
					$(".node-studio_event-form #edit-title").val($(this).val())
				});
			})

			$(window).resize(function() {
				resizePage();
			});

			function resizePage() {

				var $content = $(' #zone-content '),
					$otherHeights = $(' #section-footer ').outerHeight() + $(' #section-header ').outerHeight();

				$(' #section-content .zone-wrapper ').not('#zone-content-wrapper').each(function() {
					$otherHeights = ($otherHeights + $(this).outerHeight());
				});

				if ($(' body ').hasClass('admin-menu')) {
					$content.css( 'min-height', 'calc(100vh - ' + $otherHeights + 'px - 29px)' );
				} else {
					$content.css( 'min-height', 'calc(100vh - ' + $otherHeights + 'px)' );
				}
				//console.log($otherHeights);
			};
			//END PAGES



			//ADMIN MENU - DYNAMIC HEIGHT
			var $admBody = $('body.admin-menu');

			$(document).ready(function() { 
				setBodyMargin();
			});

			$(window).resize(function() { 
				setBodyMargin();
			});

			function setBodyMargin() {
				var $adminMenu = $('#admin-menu');
				var $height = $adminMenu.outerHeight();
				var mq = window.matchMedia( "(max-width: 980px)" );

				$height = $adminMenu.outerHeight();
				if ($admBody.is('.ev-admin-loaded') && mq.matches) {
					$admBody.attr('style', 'margin-top: 40px !important');
				} else {
					$admBody.attr('style', 'margin-top: ' + $height + 'px !important');
				}

			};
			//END ADMIN MENU - DYNAMIC HEIGHT



			// RESPONSIVE ADMIN MENU -- Creates the responsive version of the admin menu 
			$(window).load(function() {
				responsiveAdmin();
				$admBody.addClass("ev-admin-loaded");
			});

			$(window).resize(function() {
				responsiveAdmin();
			});

			var CloseButton = $('#admin-close-button');

			function responsiveAdmin() {
				var AdminMenu = $('#admin-menu');
				var CloseButtonMarkup = "<div id='admin-close-button'><span class='close-icon'>+</span></div>";
				var mq = window.matchMedia( "(max-width: 980px)" );

				// wrapping the script in a media query so that it doesn't affect desktop layouts
				if (mq.matches) {

					// Adds a class if the script is running & creates the Close Button
					if (!AdminMenu.hasClass("ev-loaded")) {
						AdminMenu.addClass("ev-loaded");
						AdminMenu.prepend(CloseButtonMarkup);
						var CloseButton = $('#admin-close-button');
					}

					// Toggles the menu open or closed
					if (!$('#admin-close-button').hasClass('blargh-blargh')) {
						$('#admin-close-button').addClass('blargh-blargh');

						$('#admin-close-button').click(function(e) {
							if (AdminMenu.hasClass('admin-menu-open')) {
								AdminMenu.removeClass('admin-menu-open');
							} else {
								AdminMenu.addClass('admin-menu-open');
							}

							// re-sets the body's margin-top rule after changing the dimensions of the admin menu
							setBodyMargin();
						});
					}

					// Create Section Headers that link back to the top level Menu Items
					$('#admin-menu-menu .admin-menu-toolbar-category.expandable').each(function() {

						// Since this fires every time the window is resized, we want to avoid duplicate labels appearing
						if ( !$(this).hasClass('has-label') ) {

							// Creates label
							var MenuHeader = $(this).find('> a');
							var SubMenu = $(this).find('> ul');

							MenuHeader.clone().attr({
								class: "sub-menu-header"
							}).prependTo(SubMenu);

							// Adds indicator that we already added a label
							$(this).addClass('has-label');
						}

					});

					// Toggling the main-sub-menus when clicked
					$('#admin-menu-menu > .admin-menu-toolbar-category.expandable').each(function() {

						if ( !$(this).hasClass('has-trigger') ) {

							MajorTrigger = "<div class='major-trigger'></div>";

							$(this).prepend(MajorTrigger);

							// Adds indicator that we already added a trigger
							$(this).addClass('has-trigger');

						}

					});

					// Opens the main-sub-menu when the trigger is clicked & close all other open main-sub-menus
					if (!$('.major-trigger').hasClass('only-add-these-handlers-once')) {
						$('.major-trigger').click(function() {

								$(this).addClass('only-add-these-handlers-once');
								SubMenu = $(this).parent();

								// toggles the relevant classes
								if (SubMenu.hasClass('cat-open')) {
									SubMenu.removeClass('cat-open');
									SubMenu.find(' ul').removeClass('cat-open');
								} else {
									$('.has-trigger').removeClass('cat-open');
									SubMenu.addClass('cat-open');
								}
							//}

						});

						$('.major-trigger').addClass('only-add-these-handlers-once');
					}

					// Creating sub-sub-sub menu triggers
					$('#admin-menu-menu .admin-menu-toolbar-category.expandable ul ul ul').each(function() {

						// checks if the triggers are there & adds them if missing
						if ( !$(this).hasClass('has-trigger') ) {

							LittleTrigger = "<div class='little-trigger'><span class='trigger-inner'>➤</span></div>";

							$(this).parent().prepend(LittleTrigger);

							// Adds indicator that we already added a trigger
							$(this).addClass('has-trigger');

						}

					});

					// Opens the sub-sub-sub menu when the trigger is clicked
					if (!$('.little-trigger').hasClass('only-add-these-handlers-once')) {
						$('.little-trigger').click(function() {

							var SubSubMenu = $(this)
							var SubSubSubMenu = $(this).find('~ ul');

							// toggles the relevant classes
							if (SubSubSubMenu.hasClass('cat-open')) {
								SubSubMenu.removeClass('cat-open');
								SubSubSubMenu.removeClass('cat-open');
								SubSubSubMenu.find(' ul').removeClass('cat-open');
							} else {
								SubSubMenu.addClass('cat-open');
								SubSubSubMenu.addClass('cat-open');
							}

						});

						$('.little-trigger').addClass('only-add-these-handlers-once');
					}


				}

			}
			// END RESPONSIVE ADMIN MENU

			//Touchscreen Detection -- Add a class to the body if device uses touch instead of a mouse
			var touchBody = $(document.body);
			var touchDevice = 'ontouchstart' in document.documentElement;

			if(touchDevice) {
				touchBody.addClass('touchscreen');
			} else {
 				touchBody.addClass('non-touchscreen');
 			}
 			// End Touchscreen Detection



 			// Browser Detection -- Add a class to the body to correspond to the user's browser
 			// Tests taken from this StackOverflow: http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 			var browserBody = $(document.body);

 			// Opera 8.0+
			var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

			if (isOpera == true) {
				browserBody.addClass('browser-opera');
			}

			// Firefox 1.0+
			var isFirefox = typeof InstallTrigger !== 'undefined';

			if (isFirefox == true) {
				browserBody.addClass('browser-firefox');
			}

			// Safari 3.0+ "[object HTMLElementConstructor]" 
			var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

			if (isSafari == true) {
				browserBody.addClass('broswer-safari');
			}

			// Internet Explorer 6-11
			var isIE = /*@cc_on!@*/false || !!document.documentMode;

			if (isIE == true) {
				browserBody.addClass('browser-ie');
			}

			// Edge 20+
			var isEdge = !isIE && !!window.StyleMedia;

			if (isEdge == true) {
				browserBody.addClass('browser-edge');
			}

			// Chrome 1+
			var isChrome = !!window.chrome && !!window.chrome.webstore;

			if (isChrome == true) {
				browserBody.addClass('browser-chrome');
			}
			// END Browser Detection



			// Conditionally show Images or Text field on Basic Page Edit Screen
			var fieldRows = $('#edit-field-body-content').find('tr');
			var typeSelector = $('.field-name-field-content-type-selector .form-radio');

			$(document).ready(function() {
				updateTypeSelection();
			});

			typeSelector.click(function() {
				updateTypeSelection();
			});

			function updateTypeSelection() {
				fieldRows.each(function() {
					var fieldRow = $(this);
					var type = fieldRow.find('.field-name-field-content-type-selector .form-radio:checked').val();
					var gallery = fieldRow.find('.field-name-field-gallery');
					var textArea = fieldRow.find('.field-name-field-text-general');

					// display the gallery
					if (type == '1') {
						gallery.css('display', 'block');
						textArea.css('display', 'none');
					} 
					// display the text area
					else if (type == '2') {
						gallery.css('display', 'none');
						textArea.css('display', 'block');
					}
					// hide both
					else {
						gallery.css('display', 'none');
						textArea.css('display', 'none');
					}
				});
			}

	 		// END Conditionally show Images or Text field on Basic Page Edit Screen

	 		 //Reset studio event registration selects, when changing which one is selected
	 		$("#edit-field-studioevent-weekend-und").change(function() {
	        	$(".node-studio_event-form .field-type-list-text").each(function() {
	        		if($(this).css("display") === 'none') {
	        			$(this).find("select option").removeAttr("selected");
	        		}
	        	});
        	}); //END reset studio event registration selects, when changing which one is selected


	 		//Pull in custom address data
	        if($(".page-node-edit")) {
	            $("#edit-field-studioevent-studio-street-und-0-value").val($(".views-field-street-address #street_address").text());
	            $("#edit-field-studioevent-studio-zip-und-0-value").val($(".views-field-postal-code #zip_code").text());
	            $("#edit-field-studioevent-studio-cross-und-0-value").val($(".views-field-supplemental-address-1 #cross_street").text());
	            
	            var studio_value = $(".views-field-current-employer #group_studio").text();

	            $('#edit-field-studioevent-contact-und option:contains(' + studio_value + ')').each(function(){
	                if ($(this).text() == studio_value) {
	                    $(this).attr('selected', 'selected');
	                    return false;
	                }
	                return true;
    			});
	        } //END pull in custom address data
		}
	};
 
}(jQuery));
