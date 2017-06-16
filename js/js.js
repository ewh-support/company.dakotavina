<!-- // Begin

function isTouchDevice() {return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));}
if (isTouchDevice())
{
	document.write('<style type="text/css">');
	document.write('.touchonly, .mouseandtouch {display: block;}');
	document.write('.mouseonly {display: none;}');
	document.write('</style>');
//	alert('isTouchDevice');
}
else
{
	document.write('<style type="text/css">');
	document.write('.touchonly {display: none;}');
	document.write('.mouseonly, .mouseandtouch {display: block;}');
	document.write('</style>');
//	alert('isNOTTouchDevice');
}

var RecaptchaOptions = {theme:'white'};

function initiatetabs(){
	eval("document.getElementById('moviecontent').className='proddetailsoff'");
	eval("document.getElementById('reviewscontent').className='proddetailsoff'");
	eval("document.getElementById('specificationcontent').className='proddetailsoff'");
	eval("document.getElementById('descriptioncontent').className='proddetailson'");
}

var tabon = "description";

function producttabhot(tab){
	if (tabon != "null")
	{
	producttabcold();
	}
	eval("document.getElementById('"+tab+"content').className='proddetailson'");
	eval("document.getElementById('"+tab+"tab').className='tabon'");
	tabon=tab;
}
function producttabcold(){
	eval("document.getElementById('"+tabon+"content').className='proddetailsoff'");
	eval("document.getElementById('"+tabon+"tab').className='taboff'");
}

var contacton = "phone";

function contacthot(contact){
	if (contacton != "null")
	{
		contactcold();
	}
	eval("document.getElementById('button"+contact+"').style.background='#ACAFB8'");
	eval("document.getElementById('contact"+contact+"').style.display='block'");
	eval("document.getElementById('contactpointer').className='contactpointer"+contact+"'");
	contacton=contact;
}
function contactcold(){
	eval("document.getElementById('contact"+contacton+"').style.display='none'");
	eval("document.getElementById('button"+contacton+"').style.background='#D8DAE2'");
}

$(document).ready(function() {

	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
					scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});

	$("body").on("click",".add_to_basket", function(e){	// add an item to the basket
    	var timed_cartmessage;
		var item_id = $(this).attr('id');
			item_id = item_id.substr(5);
		var additemquerystring = $(this).attr('data');
        var SB_Quantity = $("#quant"+item_id+"ity").val();
//        var SB_Option1 = $("#Option1").val();
//        var SB_Option2 = $("#Option2").val();
//        var SB_Option3 = $("#Option3").val();
//        var SB_Personalisation1 = $("#Personalisation1").val();
//        var SB_Personalisation2 = $("#Personalisation2").val();
        $.ajax({
        	type: "GET",
//        	url: "add_to_basket.php?SB_Quantity="+SB_Quantity+"&SB_Option1="+SB_Option1+"&SB_Option2="+SB_Option2+"&SB_Option3="+SB_Option3+"&SB_Personalisation1="+SB_Personalisation1+"&SB_Personalisation2="+SB_Personalisation2+"&"+additemquerystring,             
        	url: "add_to_basket.php?SB_Quantity="+SB_Quantity+"&"+additemquerystring,             
        	dataType: "html",                
        	success: function(response){                    
           	$("#cartmessage").html(response);
			}
    	});
    	$("#cartmessagecontents").hide().slideDown();
			clearTimeout(timed_cartmessage);
			tId=setTimeout(function(){
  			$("#cartmessagecontents").hide();			// hide cartmessagecontents     
		}, 7000);
	});

    $("#show_basket").click(function() {				// shows basket summary
    	$("#show_basket").toggleClass("hide_basket"); 	// toggles background arrow
		$.ajax({
        	type: "GET",
        	url: "../includes/basket_summary.php",             
        	dataType: "html",                
        	success: function(response){                    
           	$("#basket_summary").html(response); 
       		}
    	});
		$("#basket-summary-panel").toggle('slow');  	// toggles display of basket summary panel, slow animation             
	});

    $("#basket-summary-close").click(function() {		// hides basket summary                
		$("#basket-summary-panel").toggle('slow'); 		// toggles display of basket summary panel, slow animation             
    	$("#show_basket").toggleClass("hide_basket"); 	// toggles background arrow
	});

	$("body").on("click","#basket_button", function(e){
		self.location.href="../catalog/basket.php";
	});

	$("body").on("click",".cart-button", function(e){
		self.location.href="../catalog/basket.php";
	});

    $("#show_search").click(function() {				// shows advanced search
    	$("#show_search").toggleClass("hide_search"); 	// toggles background arrow
		$("#advanced-search-panel").toggle('slow');  	// toggles display of advanced search panel, slow animation             
	});

    $("#advanced-search-close").click(function() {		// hides basket summary                
		$("#advanced-search-panel").toggle('slow'); 	// toggles display of advanced search panel, slow animation             
    	$("#show_search").toggleClass("hide_search"); 	// toggles background arrow
	});

	$("body").on("click",".delete_item", function(e){	// deletes an item from the basket
		var sbid = $(this).parent().attr('id');
		$.ajax({
        	type: "GET",
        	url: "../includes/basket_summary.php?delete="+sbid,             
        	dataType: "html",                
        	success: function(response){                    
           	$("#basket_summary").html(response); 
			}
    	});
	});

	$("body").on("click",".update_item", function(e){	// updates an item's basket quantity
		var sbid = $(this).parent().attr('id');
		var qty = $(this).attr('data');
		$.ajax({
        	type: "GET",
        	url: "../includes/basket_summary.php?sbid="+sbid+"&qty="+qty,             
        	dataType: "html",                
        	success: function(response){                    
           	$("#basket_summary").html(response); 
			}
    	});
	});

    var pagelastslash = document.URL.lastIndexOf("/") + 1;
	var pagefilename = document.URL.substr(pagelastslash);
//	alert(pagelastslash);
// 	alert(pagefilename);

    $("#menu-side a").each(function(){
		var linkhref = $(this).attr('href');
    	var linklastslash = linkhref.lastIndexOf("/") + 1;
		var linkfilename = linkhref.substr(linklastslash);
//		alert(linkfilename);
		if (linkfilename == pagefilename)
        {
            $(this).css("background-color", "#DBE5E5");
        }
    });
    $("#mainmenu ul ul a").each(function(){
		var linkhref = $(this).attr('href');
    	var linklastslash = linkhref.lastIndexOf("/") + 1;
		var linkfilename = linkhref.substr(linklastslash);
//		alert(linkfilename);
		if (linkfilename == pagefilename)
        {
            $(this).closest("li").css("background-color", "#DBE5E5");
        }
    });

    $('#menushow').click(function() {
    	$('#mainmenu').slideToggle("slow");
    	$('#menuhide').slideToggle("fast");
    	$('#menushow').slideToggle("fast");
    });

    $('#menuhide').click(function() {
    	$('#mainmenu').slideToggle("slow");
    	$('#menuhide').slideToggle("fast");
    	$('#menushow').slideToggle("fast");
    });

    $('#showmore').click(function() {
    	$('#reveal').slideToggle("slow");
    	$('#showmore').toggle("fast");
    	$('#showless').toggle("slow");
    });

    $('#showless').click(function() {
    	$('#reveal').slideToggle("slow");
    	$('#showless').toggle("fast");
    	$('#showmore').toggle("slow");
    });
    
    $('.adrop').click(function() {
		if ( !$(this).hasClass("adropped") ) {
			$(".dropdown-fullwidth").slideUp();							// closes all dropdown-fullwidth (should just be one to close)
			$(".dropdown-fullwidth").css("left", "-999em");				// hides all dropdown-fullwidth (should just be one to hide)
			$(".adrop").removeClass("adropped");						// remove .adropped from all other .adrop (should just be one to remove)
			$(this).parent().children("div.dropdown-fullwidth").css("left", "0");
			$(this).parent().children("div.dropdown-fullwidth").slideDown();
    		$(this).addClass("adropped");
    	}
	});

    $('.sub-show').click(function() {
		if ( !$(this).hasClass("sub-hide") ) {
			$(this).parent().children("div.dropdown-fullwidth").css("position", "relative");
			$(this).parent().children("div.dropdown-fullwidth").css("left", "0");
			$(this).parent().children("div.dropdown-fullwidth").slideDown();
    		$(this).addClass("sub-hide");
    	}
    	else
    	{
			$(this).parent().children("div.dropdown-fullwidth").slideUp();
			$(this).parent().children("div.dropdown-fullwidth").css("position", "absolute");
			$(this).parent().children("div.dropdown-fullwidth").css("left", "-999em");
			$(this).removeClass("sub-hide");
    	};
	});

    $('.sub-sub-show').click(function() {
		$(".ul-sub-group").slideUp();									// closes all sub-group menus (should just be one to close)
		$(".sub-sub-show").not(this).removeClass("sub-sub-hide");		// remove .sub-sub-hide from all other .sub-sub-show (should just be one to remove)
		if ( !$(this).hasClass("sub-sub-hide") ) {
			$(this).parent().children("ul.ul-sub-group").slideDown();	// show this sub-menu
    		$(this).addClass("sub-sub-hide");							// change this icon to hide
    	}
    	else
    	{
    		$(this).removeClass("sub-sub-hide");						// if necessary, change this icon to back to show
    	};
	});

	$("#territoryselect").change(function(){
		var Territory = $('#territoryselect').val();
		if (Territory != "")
		{
		$.ajax({
        	type: "GET",
        	url: "includes/inc_distributors_list.php?Territory="+Territory,             
        	dataType: "html",                
        	success: function(response){                    
           	$("#distributors-list").html(response);
			}
    	});
    	}
    	else
    	{
    	window.location.replace("our_distributors.php?Territory=");
   		}
	});

	var oldval = $("#territoryselect").val();

	$("#territoryselect").keyup(function(){
  		if(oldval != $("#territoryselect").val())
  		$(this).change();
	});

	$("body").on("click","#worldwidebutton", function(e){
		$.ajax({
        	type: "GET",
        	url: "includes/inc_distributors_map.php?map=worldwide",             
        	dataType: "html",                
        	success: function(response){                    
           	$("#distributorsmap").hide().html(response).fadeIn();
			}
    	});
	});

	$("body").on("click","#europebutton, #europeandistributorslink", function(e){
		$.ajax({
        	type: "GET",
        	url: "includes/inc_distributors_map.php?map=european",             
        	dataType: "html",                
        	success: function(response){                    
           	$("#distributorsmap").hide().html(response).fadeIn();
			}
    	});
	});

	if ($.cookie("messageBox") != "closed") {
    	$("#message-box-open").hide();
		$("#message-box").show();
	}
	else
	{
		$("#message-box").hide();
    	$("#message-box-open").show();
	}

    $("#message-box-open").click(function() {
    	$("#message-box").toggle('slow');
     	$("#message-box-open").toggle('slow');
   		$.cookie("messageBox", "open", {path: '/'});	// unset cookie, no expiry set so expires with session, path set to / so is site-wide irrespective of the folder it is set from.
    });

    $("#message-box-close").click(function() {
    	$("#message-box").toggle('slow');
    	$("#message-box-open").toggle('slow');
    	$.cookie("messageBox", "closed", {path: '/'});	// set cookie, no expiry set so expires with session, path set to / so is site-wide irrespective of the folder it is set from.
    });

	$('.to-top').toTop();

});

// cookies accept js

///////////////////////////////////////
// Author: Donatas Stonys            //
// WWW: http://www.BlueWhaleSEO.com  //
// Date: 26 July 2012                //
// Version: 0.9                      //
///////////////////////////////////////

// Asign current date to variable //
var currentDate = new Date();

// Create some DOM elements
var newCookiesWarningDiv = document.createElement("div");

// Retrieving cookie's information
function checkCookie(cookieName) {
	"use strict";
	var cookieValue, cookieStartsAt, cookieEndsAt;

	// Get all coookies in one string
	cookieValue = document.cookie;
	// Check if cookie's name is within that string
	cookieStartsAt = cookieValue.indexOf(" " + cookieName + "=");
	if (cookieStartsAt === -1) {
		cookieStartsAt = cookieValue.indexOf(cookieName + "=");
	}
	if (cookieStartsAt === -1) {
		cookieValue = null;
	} else {
		cookieStartsAt = cookieValue.indexOf("=", cookieStartsAt) + 1;
		cookieEndsAt = cookieValue.indexOf(";", cookieStartsAt);

		if (cookieEndsAt === -1) {
			cookieEndsAt = cookieValue.length;
		}

		// Get and return cookie's value
		cookieValue = unescape(cookieValue.substring(cookieStartsAt, cookieEndsAt));
		return cookieValue;
	}
}

// Cookie setup function
function setCookie(cookieName, cookieValue, cookiePath, cookieExpires) {
	"use strict";

	// Convert characters that are not text or numbers into hexadecimal equivalent of their value in the Latin-1 character set
	cookieValue = escape(cookieValue);

	// If cookie's expire date is not set
	if (cookieExpires === "") {
		// Default expire date is set to 6 after the current date
		currentDate.setMonth(currentDate.getMonth() + 6);
		// Convert a date to a string, according to universal time (same as GMT)
		cookieExpires = currentDate.toUTCString();
	}

	// If cookie's path value has been passed
	if (cookiePath !== "") {
		cookiePath = ";path = " + cookiePath;
	}

	// Add cookie to visitors computer
	document.cookie = cookieName + "=" + cookieValue + ";expires = " + cookieExpires + cookiePath;

	// Call function to get cookie's information
	checkCookie(cookieName);
}

// Check if cookies are allowed by browser //
function checkCookiesEnabled() {
	"use strict";
	// Try to set temporary cookie
	setCookie("TestCookieExist", "Exist", "", "");
	// If temporary cookie has been set, delete it and return true
	if (checkCookie("TestCookieExist") === "Exist") {
		setCookie("TestCookieExist", "Exist", "", "1 Jan 2000 00:00:00");
		return true;
	// If temporary cookie hasn't been set, return false	
	}
	if (checkCookie("TestCookieExist") !== "Exist") {
		return false;
	}
}

// Add HTML form to the website		
function acceptCookies() {
	"use strict";

	document.getElementById("cookiesWarning").appendChild(newCookiesWarningDiv).setAttribute("id", "cookiesWarningActive");
	document.getElementById("cookiesWarningActive").innerHTML = "<div id='cookiesText'><h5>This site uses cookies</h5>We use cookies to make this website function and to give you the best experience on our website and to measure website performance. By continuing we'll assume that you are happy to receive all cookies on this site. </div><div id='readMoreURL'></div><form name='cookieAgreement'><div id='cookieForm'><input type='checkbox' name='agreed' id='agreed' value='Agreed' /><label for='agreed' class='acceptance'>I accept cookies from this site.</label><input type='submit' value='Continue' onclick='getAgreementValue(); return false;' class='button_red' /></div></form>";
	document.getElementById("readMoreURL").innerHTML = "<br /><a href='../privacy.php' title='Privacy and Cookies Information' class='button_small'>Read more...</a>";
}

function acceptCookiesTickBoxWarning() {
	"use strict";

	setCookie("TestCookie", "Yes", "", "1 Jan 2000 00:00:00");
	document.getElementById("cookiesWarning").appendChild(newCookiesWarningDiv).setAttribute("id", "cookiesWarningActive");
	document.getElementById("cookiesWarningActive").innerHTML = "<div id='cookiesText'><h5>This site uses cookies</h5>We use cookies to make this website function and to give you the best experience on our website and to measure website performance. By continuing we'll assume that you are happy to receive all cookies on this site. </div><div id='readMoreURL'></div><form name='cookieAgreement'><div id='cookieForm'><p id='cookiesWarningActiveNotTicked'>You must tick the 'I accept cookies from this site' box to accept. If you continue without changing your settings, we'll assume that you agree to receive all cookies on this website.</p><input type='checkbox' name='agreed' id='agreed' value='Agreed' /><label for='agreed' class='acceptance'>I accept cookies from this site.</label><input type='submit' value='Continue' onclick='getAgreementValue()' class='button_red' /></div></form>";
	document.getElementById("readMoreURL").innerHTML = "<br /><a href='../privacy.php' title='Privacy and Cookies Information' class='button_small'>Read more...</a>";
}

// Check if cookie has been set before //
function checkCookieExist() {
	"use strict";
	// Call function to check if cookies are enabled in browser
	if (checkCookiesEnabled()) {
		// If cookies enabled, check if our cookie has been set before and if yes, leave HTML block empty
		if (checkCookie("TestCookie") === "Yes") {
			document.getElementById("cookiesWarning").innerHTML = "";
		// If our cookie hasn't been set before, call cookies' agreement form to HTML block	
		} else {
			acceptCookies();
		}
	} else {
		// Display warning if cookies are disabled on browser
		document.getElementById("cookiesWarning").appendChild(newCookiesWarningDiv).setAttribute("id", "cookiesWarningActive");
		document.getElementById("cookiesWarningActive").innerHTML = "<div id='cookiesDisabled'><strong>Cookies are disabled. We use cookies to make this website function and to give you the best experience on our website and to measure website performance.</strong><br /> Your browser currently not accepting cookies.</div>";
	}
}

// Get agreement results
function getAgreementValue() {
	"use strict";

	// If agreement box has been checked, set permanent cookie on visitors computer
	if (document.cookieAgreement.agreed.checked) {
		// Hide agreement form
		document.getElementById("cookiesWarning").innerHTML = "";
		setCookie("TestCookie", "Yes", "", "");
	} else {
		// If agreement box hasn't been checked, delete cookie (if exist) and add extra warning to HTML form
		acceptCookiesTickBoxWarning();
	}
}

// end -->