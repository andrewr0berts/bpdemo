var logsTable;
var transactionsTable;
var selectedApp;
var leftVnfCount;
var rightVnfCount;
var configuredEPs;

// service info (save as configuring)
var userLeftEP;
var userAppType;
var userRightEP;
var userLeftEPName;
var userRightEPName;
var userServiceName;
var userServiceApp;
var userServiceAppName;

// get data from DB - End-points, Applications, 
// Refresh site table
function getApps()
{
    console.log("Getting App records");
    $.ajax(
    {
        url: "common/jsonBridge.php",
        beforeSend: function (){
            $("#workingDialog").dialog('open');
        },
        complete: function (){
            $("#workingDialog").dialog('close');
        },
        type: "POST",
        dataType: "json",
        async: true,
        data: { 
            "datatype": "getApps"
        },
        success: function(msg)
        {
            var response = JSON.parse(msg);
            if( response.STATUS === "SUCCESS" )
            {
                $("#applist").empty();   
                
                if ( response.apps !== undefined ) $.each(response.apps, function()
                {
                    console.log("Adding App: " + this["appID"] + " Name: " + this["appName"]);   
                    $("#applist").append("<li class='appy' data-appid='" + this['appID']+"' data-appName='"+this['appName'] +"'><div class='applisticon'>" + this['appName'] + "</div></li>");

                });
                $(".appy").draggable(
                {
                    helper: "clone",
                    appendTo: 'body',
                    zIndex: 999,
                    scope: "apps"
                });
            }
            else
            {
                alert("ERROR1: Failed to get Apps: ");
            }
            return true;  
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            alert('An error occurred... Look at the console');
            $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });  
    return true;
}

// Refresh site table
function getEPs()
{
    console.log("Getting end-point records");
    $.ajax(
    {
        url: "common/jsonBridge.php",
        beforeSend: function (){
            $("#workingDialog").dialog('open');
        },
        complete: function (){
            $("#workingDialog").dialog('close');
        },
        type: "POST",
        dataType: "json",
        async: true,
        data: { 
            "datatype": "getEps"
        },
        success: function(msg)
        {
            var response = JSON.parse(msg);
            if( response.STATUS === "SUCCESS" )
            {
                $("#eplist").empty();   
                if ( response.vals !== undefined ) $.each(response.vals, function()
                {
                    if ( this["useState"] !== "used" )
                    {
                        console.log("Adding Ep: " + this["resourceID"] + " Name: " + this["customerName"] + " Plus: " + this["vnfCapable"]);
                        if ( this['vnfCapable'] === "1" )
                        {
                            $("#eplist").append("<li class='ep' data-eptype='plus' data-epid='"+this['resourceID']+"' data-customerName='"+this['customerName']+"'><div class='ep_name epListEPPlus'>" + this['customerName'] + "</div></li>");
                        } else
                        {
                            $("#eplist").append("<li class='ep' data-eptype='normal' data-epid='"+this['resourceID']+"' data-customerName='"+this['customerName']+"'><div class='ep_name epListEP'>" + this['customerName'] + "</div></li>");
                        }
                    }
                    else
                    {
                        console.log("Skipping (used) Ep: " + this["resourceID"] + " Name: " + this["customerName"] + " Plus: " + this["vnfCapable"]);
                    }
                });
            }
            else
            {
                alert("ERROR1: Failed to get EPs: ");
            }
            $(".ep").draggable(
            {
                helper: "clone",
                appendTo: 'body',
                zIndex: 999,
                scope: "endpoints"
            });
            return true;  
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            alert('An error occurred... Look at the console');
            $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });  
    return true;
}

// create service
function createService()
{
    console.log("Getting end-point records");
    $.ajax(
    {
        url: "common/jsonBridge.php",
        beforeSend: function (){
            $("#workingDialog").dialog('open');
        },
        complete: function (){
            $("#workingDialog").dialog('close');
        },
        type: "POST",
        dataType: "json",
        async: true,
        data: {
            "datatype": "createService",
            "serviceName": userServiceName,
            "serviceType": selectedApp,
            "AppID": userServiceApp,
            "EPA": userLeftEP,
            "EPB": userRightEP
        },
        success: function(msg)
        {
            var response = JSON.parse(msg);
            if( response.STATUS === "SUCCESS" )
            {
                console.log("Created Service Successfully");
                showOk("Successful Create!", "Service '" + userServiceName + "' created successfully");
            }
            else
            {
                warn("Failed to create service", "See logs");
            }
            return true;  
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
//            alert('An error occurred... Look at the console');
            $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    });  
    return true;
}

function addVnfChain(divvy)
{
    if ( divvy === "#leftSvcChain" )
    {
        $(divvy).prepend("<div class='vnf-container-left'><div class='vnf-blank-left'>+</div></div>");
        $(".vnf-blank-left").droppable(
        {
            hoverClass: "vnf-blank-hover",
            tolerance: "pointer",
            scope: "vnfs",
            greedy: true,
            drop: function (event, ui)
            {
                vnfType = $(ui.draggable).attr('data-vnftype');
                console.log("VNF dropped: " + vnfType );            
                $(this).removeClass();
                $(this).html("");
                $(this).addClass("vnf-set-left");

                if ( vnfType === "vepc" ) { $(this).addClass("vnf-vepc"); $("#configEpc").dialog('open'); }
                if ( vnfType === "dpi" ) { $(this).addClass("vnf-dpi"); $("#configDpi").dialog('open'); }
                if ( vnfType === "firewall" ) { $(this).addClass("vnf-firewall"); $("#configFw").dialog('open'); }
                if ( vnfType === "classifier" ) { $(this).addClass("vnf-classifier"); $("#configClassifier").dialog('open'); }
                if ( vnfType === "cloudconnect" ) { $(this).addClass("vnf-cloudconnect"); $("#configCloud").dialog('open'); }
                if ( vnfType === "vr" ) { $(this).addClass("vnf-vr"); $("#configVr").dialog('open'); }                
                $("#leftDArrow").show();
                addVnfChain("#leftSvcChain");
            }
        });
    } else
    {
        $(divvy).append("<div class='vnf-container-right'><div class='vnf-blank'>+</div></div>");
        $(".vnf-blank").droppable(
        {
            hoverClass: "vnf-blank-hover",
            tolerance: "pointer",
            scope: "vnfs",
            greedy: true,
            drop: function (event, ui)
            {
                vnfType = $(ui.draggable).attr('data-vnftype');
                console.log("VNF dropped: " + vnfType );            
                $(this).removeClass();
                $(this).html("");
                $(this).addClass("vnf-set");
                if ( vnfType === "vepc" ) { $(this).addClass("vnf-vepc"); $("#configEpc").dialog('open'); }
                if ( vnfType === "dpi" ) { $(this).addClass("vnf-dpi"); $("#configDpi").dialog('open'); }
                if ( vnfType === "firewall" ) { $(this).addClass("vnf-firewall"); $("#configFw").dialog('open'); }
                if ( vnfType === "classifier" ) { $(this).addClass("vnf-classifier"); $("#configClassifier").dialog('open'); }
                if ( vnfType === "cloudconnect" ) { $(this).addClass("vnf-cloudconnect"); $("#configCloud").dialog('open'); }
                if ( vnfType === "vr" ) { $(this).addClass("vnf-vr"); $("#configVr").dialog('open'); }
                $("#rightDArrow").css('display','block');
//                $("#rightDArrow").show();
                addVnfChain("#rightSvcChain");
            }
        });
    }
}

function showDialogs()
{
    $("#EPDialog").dialog('open');
    $("#AppDialog").dialog('open');
    $("#VNFDialog").dialog('open');
}
function hideDialogs()
{
    $("#EPDialog").dialog('close');
    $("#AppDialog").dialog('close');
    $("#VNFDialog").dialog('close');
}

function resetServiceView()
{
    console.log("Reset service config");
    getEPs();
    getApps();
    
    // clear values
    configuredEPs = 0;
    userLeftEP = -1;
    userRightEP = -1;
    userLeftEPName = "UNSET";
    userRightEPName = "UNSET";
    userServiceName = "UNSET";
    userServiceApp = "UNSET";
    
    // clear end-points
    $("#leftEP").removeClass();
    $("#leftEP").addClass("epUnset");
    $("#leftEP").html("+");
    $("#rightEP").removeClass();
    $("#rightEP").addClass("epUnset");
    $("#rightEP").html("+");
    $("#appholder").removeClass();
    $("#appholder").addClass("appUnset");
    $("#appholder").html("+");
        
    // clear VNF configurations
    $("#leftSvcChain").empty();
    $("#rightSvcChain").empty();
    $("#leftDArrow").hide();
    $("#rightDArrow").hide();
    
    // clear descriptive text
    $("#svcName").val("");
    $("#aendtext").html("(unset - drag an end-point onto service)");
    $("#bendtext").html("(unset - drag an end-point onto service)");
    $("#apptext").html("(unset - drag an App onto service)");
}

function checkConfig()
{
    userServiceName = $("#svcName").val();
    if ( userServiceName === "" || userServiceName === undefined || userServiceName === "UNSET" )
    {
        warn("Config error", " Please enter service name");
        return 0;
    } 
    if ( userServiceApp === "" || userServiceApp === undefined || userServiceApp === "UNSET" )
    {
        warn("Config error", " Please select a server app");
        return 0;
    } 
    if ( userLeftEP === -1 )
    {
        warn("Config error", " Please select Left End Point");
        return 0;
    } 
    if ( userRightEP === -1 )
    {
        warn("Config error", " Please select Right End Point");
        return 0;
    }
    
    // save values to summary UI
    $("#summarySvcName").html(userServiceName);
    $("#summaryAppType").html(userServiceAppName);
    $("#summaryLeftSite").html(userLeftEPName);
    $("#summaryRightSite").html(userRightEPName);
    return 1;
}

// What to do when the document is ready (for all windows)
$(document).ready(function()
{
    // setup window
    $("#apptitle").append("- Create");
    
    setupDialogs();
    setupConfigDialogs();
    resetServiceView();
    
    // buttons
    $("#s1buttonCancel").button();
    $("#s1buttonCancel").click( function() 
    {
        console.log("Cancel service create - go to Home screen");
        window.location = "index.php";
    });
    $("#s2buttonCreate").button();
    $("#s2buttonCreate").click( function() 
    {
        if ( checkConfig() )
        {
            hideDialogs();
            console.log("Create Service");
            $("#creation").accordion("option", "active", 2);
        }
    });
    $("#s2buttonBack").button();
    $("#s2buttonBack").click( function() 
    {
        hideDialogs();
        console.log("Back: Go back to first screen screen");
        $("#creation").accordion("option", "active", 0);
    });
    $("#s2buttonCancel").button();
    $("#s2buttonCancel").click( function() 
    {
        console.log("Cancel service create - go to Home screen");
        window.location = "index.php";
    });
    $("#s2buttonReset").button();
    $("#s2buttonReset").click( function() 
    {
        resetServiceView();
        // close open dialogs and open end-points
        $("#AppDialog").dialog('close');
        $("#VNFDialog").dialog('close');
        $("#EPDialog").dialog('open');
    });
    $("#s3buttonCreate").button();
    $("#s3buttonCreate").click( function() 
    {
        console.log("Create Service");
        createService();
    });
    $("#s3buttonBack").button();
    $("#s3buttonBack").click( function() 
    {
        // showDialogs();
        console.log("Back: Go back to first screen screen");
        $("#creation").accordion("option", "active", 1);
    });
    $("#s3buttonCancel").button();
    $("#s3buttonCancel").click( function() 
    {
        console.log("Cancel service create - go to Home screen");
        window.location = "index.php";
    });
    $("#buttonShowEPs").button();
    $("#buttonShowEPs").click( function() 
    {
        console.log("Show End-points");
        $("#EPDialog").dialog('open');
    });
    $("#buttonShowApps").button();
    $("#buttonShowApps").click( function() 
    {
        console.log("Show Apps");
        $("#AppDialog").dialog('open');
    });
    $("#buttonShowVNFs").button();
    $("#buttonShowVNFs").click( function() 
    {
        console.log("Show VNFs");
        $("#VNFDialog").dialog('open');
    });
    
    // dialog - end-points
    $("#EPDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'End Points',
        buttons: {
          'Close' : function () {
            $(this).dialog('close');
            }
        }
    } );
    
    // dialog - apps
    $("#AppDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'Apps',
        buttons: {
          'Close' : function () {
            $(this).dialog('close');
            }
        }
    } );
    
    // dialog - vnfs
    $("#VNFDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'VNFs',
        buttons: {
          'Close' : function () {
            $(this).dialog('close');
            }
        }
    } );
    
    $("#creation").accordion();
    
    // MBH
    $("#app-mbh").click( function()
    {
        // setup UI for MBH and show tab
        console.log("click on mbh");
        selectedApp = "mbh";
        $("#leftSiteLabel").html("Cell Site");
        $("#leftSiteIcon").removeClass();
//        $("#leftSiteIcon").addClass("siteIcon right siteIconBTS");
        $("#leftSiteIcon").addClass("siteIcon centre siteIconBTS");
        $("#rightSiteLabel").html("EPC Site");
        $("#rightSiteIcon").removeClass();
//        $("#rightSiteIcon").addClass("siteIcon left siteIconEPC");
        $("#rightSiteIcon").addClass("siteIcon centre siteIconEPC");
        $("#creation").accordion("option", "active", 1);
        $("#EPDialog").dialog('open');
    });
    $("#app-mbh").addClass("app-mbh");
    $("#app-mbh").hover( function() {$(this).addClass("app-mbh-hover");}, function() {$(this).removeClass("app-mbh-hover"); });
    
    $("#app-dci").click( function()
    {
        console.log("click on dci");
        selectedApp = "dci";
        warn("WTF!", "This is not yet supported");
    });
    $("#app-dci").addClass("app-dci");
    $("#app-dci").hover( function() {$(this).addClass("app-dci-hover");}, function() {$(this).removeClass("app-dci-hover"); });
    
    // Enterprise connect
    $("#app-entconnect").click( function()
    {
        console.log("click on entconnect");
        selectedApp = "entconnect";
        $("#leftSiteLabel").html("Office");
         $("#leftSiteIcon").removeClass();
        $("#leftSiteIcon").addClass("siteIcon right siteIconOffice");
        $("#rightSiteLabel").html("Data Centre");
         $("#rightSiteIcon").removeClass();
        $("#rightSiteIcon").addClass("siteIcon left siteIconDC");
        $("#rightSiteIcon").addClass("siteIconDC");
        $("#creation").accordion("option", "active", 1);
        $("#EPDialog").dialog('open');
    });
    $("#app-entconnect").addClass("app-entconnect");
    $("#app-entconnect").hover( function() {$(this).addClass("app-entconnect-hover");}, function() {$(this).removeClass("app-entconnect-hover"); });
    
    // Office connect
    $("#app-officeconnect").click( function()
    {
        console.log("click on officeconnect");
        selectedApp = "officeconnect";
        $("#leftSiteLabel").html("Office 1");
        $("#leftSiteIcon").removeClass();
        $("#leftSiteIcon").addClass("siteIcon right siteIconOffice");
        $("#rightSiteLabel").html("Office 2");
        $("#rightSiteIcon").removeClass();
        $("#rightSiteIcon").addClass("siteIcon left siteIconOffice");
        $("#creation").accordion("option", "active", 1);
        $("#EPDialog").dialog('open');
    });
    $("#app-officeconnect").addClass("app-officeconnect");
    $("#app-officeconnect").hover( function() {$(this).addClass("app-officeconnect-hover");}, function() {$(this).removeClass("app-officeconnect-hover"); });
    
    // Cloud connect
    $("#app-cloudconnect").click( function()
    {
        console.log("click on cloudconnect");
        selectedApp = "cloudconnect";
        $("#leftSiteLabel").html("Enterprise");
        $("#leftSiteIcon").removeClass();
        $("#leftSiteIcon").addClass("siteIcon right siteIconOffice");
        $("#rightSiteLabel").html("Cloud Connect");
        $("#rightSiteIcon").removeClass();
        $("#rightSiteIcon").addClass("siteIcon left siteIconDC");
        $("#creation").accordion("option", "active", 1);
        $("#EPDialog").dialog('open');
    });
    $("#app-cloudconnect").addClass("app-cloudconnect");
    $("#app-cloudconnect").hover( function() {$(this).addClass("app-cloudconnect-hover");}, function() {$(this).removeClass("app-cloudconnect-hover"); });
    
    // MBH VPN connect
    $("#app-mbhvpn").click( function()
    {
        console.log("click on mbhvpn");
        selectedApp = "mbhvpn";
        warn("WTF!", "This is not yet supported");
    });
    $("#app-mbhvpn").addClass("app-mbhvpn");
    $("#app-mbhvpn").hover( function() {$(this).addClass("app-mbhvpn-hover");}, function() {$(this).removeClass("app-mbhvpn-hover"); });
    
    console.log("Starting Service Create");
//    getEPs();
//    getApps();
    
    $("#leftSvcChain").sortable();
    $("#rightSvcChain").sortable();
    
    $(".vnfs").draggable(
                {
                    helper: "clone",
                    appendTo: 'body',
                    zIndex: 999,
                    scope: "vnfs"
                });
    
    // setup left EP droppable
    $("#leftEP").droppable(
    {
        hoverClass: "epUnset-hover",
        tolerance: "pointer",
        scope: "endpoints",
        greedy: true,
        drop: function (event, ui)
        {
            console.log("Left EP dropped: " + $(ui.draggable).attr('data-epid') + ", Type: " + $(ui.draggable).attr('data-eptype') );            
            userLeftEP = $(ui.draggable).attr('data-epid');
            userLeftEPName = $(ui.draggable).attr('data-customerName');
            $("#aendtext").html( $(ui.draggable).attr('data-customerName'));
            configuredEPs++;
            if ( configuredEPs === 2 ) { $("#EPDialog").dialog('close'); $("#AppDialog").dialog('open'); }
            if ( $("#svcName").val() === "" )
            {
                if ( userRightEPName !== "UNSET" )
                {
                    $("#svcName").val( userLeftEPName + " to " + userRightEPName );
                }
            }
            if ( $(ui.draggable).attr('data-eptype') === "normal" )
            {
                console.log("NORMAL");
                $(this).removeClass();
                $(this).addClass("right");
                $(this).addClass("epListEPSet right");
            } else
            {
                console.log("PLUS");
                $(this).removeClass();
                $(this).addClass("epListEPPlusSet");
                addVnfChain("#leftSvcChain");
                $("#leftDArrow").show();
            }
            $(this).html("");
            $(ui.draggable).hide();
        }
    });
    
    // setup right EP droppable
    $("#rightEP").droppable(
    {
        hoverClass: "epUnset-hover",
        tolerance: "pointer",
        scope: "endpoints",
        greedy: true,
        drop: function (event, ui)
        {
            console.log("Left EP dropped: " + $(ui.draggable).attr('data-epid') + ", Type: " + $(ui.draggable).attr('data-eptype') );
            userRightEP = $(ui.draggable).attr('data-epid');
            userRightEPName = $(ui.draggable).attr('data-customerName');
            $("#bendtext").html( $(ui.draggable).attr('data-customerName'));
            configuredEPs++;
            if ( configuredEPs === 2 ) { $("#EPDialog").dialog('close'); $("#AppDialog").dialog('open'); }
            if ( $("#svcName").val() === "" )
            {
                if ( userLeftEPName !== "UNSET" )
                {
                    $("#svcName").val( userLeftEPName + " to " + userRightEPName );
                }
            }
            if ( $(ui.draggable).attr('data-eptype') === "normal" )
            {
                console.log("NORMAL");
                $(this).removeClass();
                $(this).addClass("epListEPSet");
            } else
            {
                console.log("PLUS");
                $(this).removeClass();
                $(this).addClass("epListEPPlusSet");
                addVnfChain("#rightSvcChain");
            }
            $(this).html("");
            $(ui.draggable).hide();
        }
    });
    
    // setup app droppable
    $("#appholder").droppable(
    {
        hoverClass: "epUnset-hover",
        tolerance: "pointer",
        scope: "apps",
        greedy: true,
        drop: function (event, ui)
        {
            $("#AppDialog").dialog('close');
            console.log("App dropped: " + $(ui.draggable).attr('data-appid') + ", Name: " + $(ui.draggable).attr('data-appName') );
            userServiceAppName = $(ui.draggable).attr('data-appName');
            $("#apptext").html( $(ui.draggable).attr('data-appName'));
            userServiceApp = $(ui.draggable).attr('data-appid');
            $(this).removeClass();
            $(this).addClass("appSet");
            $(this).html("");
        }
    });
    
});