// Functions related to handling login and storing cookies on local machine
var leftUserX;
var middleUserX;
var rightUserX;
var passwdX;

// Generic cookie manipulation
function createCookie(name, value, days)
{
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

// read cookies
function readCookie(name)
{
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name)
{
    createCookie(name, "", -1);
}

function checkLogin()
{
    if ( $("#username").val() === "" || $("#password").val() === "" )
    {        
        $("#loginText").html("Please fill in all fields...");
        $("#loginText").addClass("loginError");
        $("#spinner").hide();
        return false;
    }

    $.ajax(
    {
        url: "common/userLogin.php",
        beforeSend: function (){
            $("#spinner").show();
            $("#loginButton").attr("disabled", true);
        },
        complete: function (){
            $("#spinner").hide();
            $("#loginButton").attr("disabled", false);
        },
        type: "POST",
        dataType: "json",
        async: true,
        data: { 
            "username": $("#username").val(),
            "password": $("#password").val()
        },
        success: function(msg)
        {
            if( msg.status === "Success")
            {
                if ( $("#rememberMe").is(':checked') )
                {
                    createCookie("rememberMe", "yes", 180);
                    createCookie("savedName", $("#username").val(), 180);
                }
                else
                {
                    eraseCookie("rememberMe");
                    eraseCookie("savedName");
                }
                if ( $("#username").val() === "admin" )
                {
                    window.location = "admincontrol.php";
                } else
                window.location = "index.php";
            }
            else
            {
                $("#loginText").html("OOps...Error logging in");
                $("#loginText").addClass("loginError");
            }
            return true;  
        },
        error: function(msg)
        {
           $("#loginText").html("Error logging in.  Please try again later.");
           return false;
        }
    });  
    return true;
}

function resetUserLayout()
{
    var loginWindowWidth = $(window).width();
    var userWidth = $("#user1div").width();
    var passwdWidth = $("#passwordSlider").width();
    var userSpacing = 20;
    var animateMove = 20;
    
    leftUserX = loginWindowWidth/2 - userWidth - userWidth/2 - userSpacing;
    middleUserX = loginWindowWidth/2 - userWidth/2;
    rightUserX = loginWindowWidth/2 + userWidth/2 + userSpacing;
    passwdX = loginWindowWidth/2 - passwdWidth/2;
    
    // alert("loginWindowWidth=" + loginWindowWidth + " userWidth" + userWidth + " userSpacing=" + userSpacing + " leftUserX=" + leftUserX + " middleUserX=" + middleUserX + " rightUserX=" + rightUserX);
    // $("#user1div").animate({ "left": leftUserX+"px;" }, "slow" );
    $("#user1div").hide();
    $("#user2div").hide();
    $("#user3div").hide();
    $("#user1div").css({ left: leftUserX });
    $("#user2div").css({ left: middleUserX });
    $("#user3div").css({ left: rightUserX });
    $("#passwordSlider").css({ left: passwdX });
    $("#user1div").fadeIn({queue: false, duration: 'slow'});
    $("#user2div").fadeIn({queue: false, duration: 'slow'});
    $("#user3div").fadeIn({queue: false, duration: 'slow'});
    
    $("#user1div").animate({ "left": "-="+animateMove+"px" }, "slow");
    $("#user3div").animate({ "left": "+="+animateMove+"px" }, "slow");
}

function selectUser(user)
{
    var animateMove = 20;
    if ( user === "user1" )
    {
        $("#username").val("user1");
        $("#user2div").fadeOut({queue: false, duration: 'slow'});
        $("#user3div").fadeOut({queue: false, duration: 'slow'});        
        $("#user1div").animate({left: middleUserX }, "slow");
        $("#passwordSlider").fadeIn({queue: false, duration: 'slow'});
        $("#passwordSlider").animate({ "top": "+="+animateMove+"px" }, "slow");
//        $('#user1').off('mouseenter mouseleave');
//        $("#user1").addClass("user1-hover");
    } else
    if ( user === "user2" )
    {
        $("#user2").addClass("user2-hover");
        $("#username").val("user2");
        $("#user1div").fadeOut({queue: false, duration: 'slow'});
        $("#user3div").fadeOut({queue: false, duration: 'slow'});        
        $("#passwordSlider").fadeIn({queue: false, duration: 'slow'});
        $("#passwordSlider").animate({ "top": "+="+animateMove+"px" }, "slow");
    } else
    if ( user === "user3" )
    {
        $("#user3").addClass("user-hover");
        $("#username").val("admin");
        $("#user1div").fadeOut({queue: false, duration: 'slow'});
        $("#user2div").fadeOut({queue: false, duration: 'slow'});        
        $("#user3div").animate({left: middleUserX }, "slow");
        $("#passwordSlider").fadeIn({queue: false, duration: 'slow'});
        $("#passwordSlider").animate({ "top": "+="+animateMove+"px" }, "slow");
    }
    $("#password").focus();
}

// What to do when the document is ready (for all windows)
$(document).ready(function()
{   
    var animateMove = 20;
    // setup window
    $("#spinner").hide();
    $("#loginButton").button();
    $("#loginform").submit(function()
    {
       checkLogin();
       return false;
    });
    
    $("#cancelButton").button();
    $("#cancelButton").button().on('click', function() {
        $("#passwordSlider").fadeOut({queue: false, duration: 'slow'});
        $("#passwordSlider").animate({ "top": "-="+animateMove+"px" }, "slow");
        resetUserLayout();
    });
    
    var saveName = readCookie("rememberMe");
    var savedName = readCookie("savedName");
    if (saveName === "yes" && savedName)
    {
        $("#rememberMe").prop('checked', true);
        $("#username").val(savedName);
        $("#password").focus();
    }
    else
    {
        $("#RememberMe").prop('checked', false);
    }    
    
    $("#passwordSlider").hide();
    
    // Add hover and click behaviour for users...
    $("#user1").addClass("user1");
    $("#user1").hover( function() {$(this).addClass("user1-hover");}, function() {$(this).removeClass("user1-hover"); });
    $("#user1").click( function() {selectUser("user1");});
    $("#user2").addClass("user2");
    $("#user2").hover( function() {$(this).addClass("user2-hover");}, function() {$(this).removeClass("user2-hover"); });
    $("#user2").click( function() {selectUser("user2");});
    $("#user3").addClass("user3");
    $("#user3").hover( function() {$(this).addClass("user3-hover");}, function() {$(this).removeClass("user3-hover"); });
    $("#user3").click( function() {selectUser("user3");});
    resetUserLayout();
    
});