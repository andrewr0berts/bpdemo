// Function to set up user interface

function resizeWindowElements()
{
    // Get dimensions of elements
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var bannerHeight = $(".headerDiv").height();
    var menuHeight = $(".menuDiv").height();
    var mainHeight = $(".mainDiv").height();
    var footerHeight = $(".footerDiv").height();
    
    // Do resizing
    var newMainHeight = windowHeight - footerHeight - bannerHeight - 190;
    $(".mainDiv").height(windowHeight - 125);
    $(".menuDiv").height(windowHeight - 125);
    $(".footerDiv").width(windowWidth - 13);
}

// What to do when the document is ready (for all windows)
$(document).ready(function()
{   
    // Instantiate left menu
    $("#menu-home").click( function() {window.location = "index.php";});
    $("#menu-home").addClass("menu-home-img");
    $("#menu-home").hover( function() {$(this).addClass("menu-home-hover");}, function() {$(this).removeClass("menu-home-hover"); });
    
    $("#menu-admin").click( function() {window.location = "admin.php";});
    $("#menu-admin").addClass("menu-admin-img");
    $("#menu-admin").hover( function() {$(this).addClass("menu-admin-hover");}, function() {$(this).removeClass("menu-admin-hover"); });
    
    $("#menu-logs").click( function() {window.location = "logs.php";});
    $("#menu-logs").addClass("menu-logs-img");
    $("#menu-logs").hover( function() {$(this).addClass("menu-logs-hover");}, function() {$(this).removeClass("menu-logs-hover"); });
    
    $("#menu-new").click( function() {window.location = "create.php";});
    $("#menu-new").addClass("menu-new-img");
    $("#menu-new").hover( function() {$(this).addClass("menu-new-hover");}, function() {$(this).removeClass("menu-new-hover"); });
    
    $("#menu-logout").click( function() {window.location = "logout.php";});
    $("#menu-logout").addClass("menu-logout-img");
    $("#menu-logout").hover( function() {$(this).addClass("menu-logout-hover");}, function() {$(this).removeClass("menu-logout-hover"); });
    
    // Setup navigation menu
    $("#mm_tl").click( function() {window.location = "backups.php";});
    $("#mm_tl").addClass("mm_tl_img");
    $("#mm_tl").hover( function()
    {
        $(this).addClass("mm_tl_img_hover");
        $("#helperText").html("Manage Configuration Backups");
        $("#helperSub").html("<ul><li>View Config Backups</li><li>Backups Audit</li><li>Compare Backup Files</li><li>Scheduling Manager</li></ul>"); 
    }, function()
    {
        $(this).removeClass("mm_tl_img_hover");
        $("#helperText").html("");
        $("#helperSub").html(""); 
    });
    
    $("#mm_tr").click( function() {window.location = "nodalconfig.php";});
    $("#mm_tr").addClass("mm_tr_img");
    $("#mm_tr").hover( function()
    {
        $(this).addClass("mm_tr_img_hover");
        $("#helperText").html("Manage Nodal Configurations");
        $("#helperSub").html("<ul><li>Configure New Node</li><li>Validate Node Configuration</li><li>Scheduling Manager</li></ul>"); 
    }, function()
    {
        $(this).removeClass("mm_tr_img_hover");
        $("#helperText").html("");
        $("#helperSub").html(""); 
    });
    
    $("#mm_bl").click( function() {window.location = "svcconfig.php";});
    $("#mm_bl").addClass("mm_bl_img");
    $("#mm_bl").hover( function()
    {
        $(this).addClass("mm_bl_img_hover");
        $("#helperText").html("Manage Service Configurations");
        $("#helperSub").html("<ul><li>Service Configuration</li><li>Validate Service Configuration</li><li>Service Configuration Audit</li><li>Scheduling Manager</li></ul>"); 
    }, function()
    {
        $(this).removeClass("mm_bl_img_hover");
        $("#helperText").html("");
        $("#helperSub").html(""); 
    });
    
    $("#mm_br").click( function() {window.location = "setup.php";});
    $("#mm_br").addClass("mm_br_img");
    $("#mm_br").hover( function()
    {
        $(this).addClass("mm_br_img_hover");
        $("#helperText").html("CMS Settings");
        $("#helperSub").html("<ul><li>Setup preferences</li><li>Manage Users</li><li>CMS Maintenance</li></ul>"); 
    }, function()
    {
        $(this).removeClass("mm_br_img_hover");
        $("#helperText").html("");
        $("#helperSub").html(""); 
    });
    
    // setup hover for top menu
    $(".hoverme").hover(function(){
    $(this).css("background-color", "#F4F4F4");
    }, function(){
    $(this).css("background-color", "white");
    });
    
    $("#menuHelpSupport").click(function() {
        window.location = "help.php";
    });
    $("#menuContactUs").click(function() {
        window.location = "help.php";
        $("#tabs").tabs( "option", "active", 2 );
    });
    
    resizeWindowElements();
});

// What to do when the window is resized
$(window).resize(resizeWindowElements);