// Global variables
var siteTable;
var appTable;
var epTable;
var selectedData;
var selectedSite;
var selectedApp;
var selectedAction;

// get data from databaase and populate tables
// 
// Refresh site table
function updateSiteList()
{
    console.log("Getting site records");
    $.ajax(
    {
        url: "common/jsonBridge.php",
        beforeSend: function (){
            $("#spinner").show();
            $("#refreshServices").attr("disabled", true);
        },
        complete: function (){
            $("#spinner").hide();
            $("#refreshServices").attr("disabled", false);
        },
        type: "POST",
        dataType: "json",
        async: true,
        data: { 
            "datatype": "getSites"
        },
        success: function(msg)
        {
            var response = JSON.parse(msg);
            if( response.STATUS === "SUCCESS" )
            {
                siteTable.clear();
                
                if ( response.svcs !== undefined ) $.each(response.svcs, function()
                {
                    console.log("Adding sites: " + this["siteID"] + " Type: " + this["addressStreet"]);
                    siteTable.row.add( [ this["siteID"], this["custSiteType"], this["addressStreet"], this["addressCity"], this["addressState"], this["addressPostCode"], this["addressCountry"], this["custSiteName"], this["custSiteNotes"], "999 sdfjkl" ] );
                });
                siteTable.draw();
            }
            else
            {
                alert("ERROR1: Failed to get sites: ");
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

function updateSiteInfo()
{
    console.log("Update site info");
    $.ajax(
    {
        url: "common/jsonBridge.php",
        beforeSend: function (){
            $("#spinner").show();
            $("#refreshServices").attr("disabled", true);
        },
        complete: function (){
            $("#spinner").hide();
            $("#refreshServices").attr("disabled", false);
        },
        type: "POST",
        dataType: "json",
        async: true,
        data: { 
            "datatype": "updateSiteInfo",
            "siteID": selectedSite,
            "addressStreet": $("#siteStreet").val(),
            "addressCity": $("#siteCity").val(),
            "addressState": $("#siteState").val(),
            "addressPostcode": $("#sitePostcode").val(),
            "addressCountry": $("#siteCountry").val(),
            "custSiteName": $("#siteName").val(),
            "custSiteNotes": $("#siteNotes").val(),
            "custSiteType": $("#siteType").val()
        },
        success: function(msg)
        {
            var response = JSON.parse(msg);
            if( response.STATUS === "SUCCESS" )
            {
                console.log("Updated site info");
                updateSiteList();
            }
            else
            {
                console.log("FAILED to update site info");
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

function updateAppInfo()
{
    console.log("Update App info");
    $.ajax(
    {
        url: "common/jsonBridge.php",
        beforeSend: function (){
            $("#spinner").show();
            $("#refreshServices").attr("disabled", true);
        },
        complete: function (){
            $("#spinner").hide();
            $("#refreshServices").attr("disabled", false);
        },
        type: "POST",
        dataType: "json",
        async: true,
        data: { 
            "datatype": "updateAppInfo",
            "appID": selectedApp,
            "appName": $("#appName").val(),
            "appDescription": $("#appDescription").val(),
            "EFCIRTx": $("#EFCIRTx").val(),
            "EFCIRRx": $("#EFCIRRx").val(),
            "AFCIRTx": $("#AFCIRTx").val(),
            "AFCIRRx": $("#AFCIRRx").val(),
            "AFPIRTx": $("#AFPIRTx").val(),
            "AFPIRRx": $("#AFPIRRx").val(),
            "BEPIRTx": $("#BEPIRTx").val(),
            "BEPIRRx": $("#BEPIRRx").val(),
            "protection": $("#protection").val(),
            "latency": $("#latency").val(),
            "packetLoss": $("#packetLoss").val()
        },
        success: function(msg)
        {
            var response = JSON.parse(msg);
            if( response.STATUS === "SUCCESS" )
            {
                console.log("Updated site info");
                updateAppList();
            }
            else
            {
                console.log("FAILED to update site info");
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
function updateAppList()
{
    console.log("Getting App records");
    $.ajax(
    {
        url: "common/jsonBridge.php",
        beforeSend: function (){
            $("#spinner").show();
            $("#refreshServices").attr("disabled", true);
        },
        complete: function (){
            $("#spinner").hide();
            $("#refreshServices").attr("disabled", false);
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
                appTable.clear();
                
                if ( response.apps !== undefined ) $.each(response.apps, function()
                {
                    console.log("Adding App: " + this["appID"] + " Name: " + this["appName"]);
                    appTable.row.add( [ this["appID"], this["appName"], this["appDescription"], this["EFCIRTx"], this["EFCIRRx"], this["AFCIRTx"], this["AFCIRRx"], this["AFPIRTx"], this["AFPIRRx"], this["BEPIRTx"], this["BEPIRRx"], this["protection"], this["latency"], this["packetLoss"] ] );
                });
                appTable.draw();
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
function updateEpList()
{
    console.log("Getting end-point records");
    $.ajax(
    {
        url: "common/jsonBridge.php",
        beforeSend: function (){
            $("#spinner").show();
            $("#refreshServices").attr("disabled", true);
        },
        complete: function (){
            $("#spinner").hide();
            $("#refreshServices").attr("disabled", false);
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
                epTable.clear();
                
                if ( response.vals !== undefined ) $.each(response.vals, function()
                {
                    console.log("Adding Ep: " + this["resourceID"] + " Name: " + this["customerName"]);
                    epTable.row.add( [ this["resourceID"], this["customerName"], this["serviceID"], this["custEPType"], this["custSiteID"], this["vnf_vr"], this["vnf_fw"], this["vnf_cloudconn"], this["vnf_loadbal"], this["vnf_epc"], this["vnf_appclass"], this["vnfCapable"] ] );
                });
                epTable.draw();
            }
            else
            {
                alert("ERROR1: Failed to get EPs: ");
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

// What to do when the document is ready (for all windows)
$(document).ready(function()
{
    // setup window
    $("#apptitle").append("- Admin");
    
    // setup dialogs
    setupDialogs();
    $("#addressDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'Site Information',
        buttons: {
        'Cancel' : function ()
            {
                $(this).dialog('close');
            },
        'Save' : function ()
            {
                if ( selectedAction === "edit" )
                {
                    updateSiteInfo();
                } else
                {
                    deleteSite();
                }   
                $(this).dialog('close');
            }
        }
    } );
    $("#appDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'App information',
        buttons: {
        'Cancel' : function ()
            {
                $(this).dialog('close');
            },
        'Save' : function ()
            {
                updateAppInfo();
                $(this).dialog('close');
            }
        }
    } );
    $("#epDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'End-point information',
        buttons: {
        'Cancel' : function ()
            {
                $(this).dialog('close');
            },
        'Save' : function ()
            {
                updateAppInfo();
                $(this).dialog('close');
            }
        }
    } );
    
    // setup tabs
    $("#tabs").tabs();
    $('#tabs a[href="#tabs-1"]').on('click', function() {
        console.log("selected site tab");
        updateSiteList();
        $("#editSite").button("disable");
        $("#deleteSite").button("disable");
    });
    $('#tabs a[href="#tabs-2"]').on('click', function() {
        console.log("selected app tab");
        updateAppList();
        $("#editApp").button("disable");
        $("#deleteApp").button("disable");
    });
    $('#tabs a[href="#tabs-3"]').on('click', function() {
        console.log("selected ep tab");
        updateEpList();
        $("#editEp").button("disable");
        $("#deleteEp").button("disable");
    });
    
    // setup buttons - Sites
    $("#addSite").button();
    $("#addSite").click( function() 
    {
        console.log("Add Site");
        selectedAction = "add";
        $("#siteName").val("");
        $("#siteStreet").val("");
        $("#siteCity").val("");
        $("#siteState").val("");
        $("#sitePostcode").val("");
        $("#siteCountry").val("");
        $("#siteNotes").html("");
        $("#siteType").val("");
        $("#addressDialog").dialog('open');
    });
    $("#editSite").button();
    $("#editSite").button("disable");
    $("#editSite").click( function() 
    {
        console.log("Edit Site");
        selectedAction = "edit";
        $("#siteName").val(selectedData[7]);
        $("#siteStreet").val(selectedData[2]);
        $("#siteCity").val(selectedData[3]);
        $("#siteState").val(selectedData[4]);
        $("#sitePostcode").val(selectedData[5]);
        $("#siteCountry").val(selectedData[6]);
        $("#siteNotes").val(selectedData[8]);
        $("#siteType").val(selectedData[1]);
        $("#addressDialog").dialog('open');
    });
    $("#deleteSite").button();
    $("#deleteSite").button("disable");
    $("#deleteSite").click( function() 
    {
        console.log("Delete Site with ID " + selectedSite);
        
        if ( !deleteDBRecord("sites", "siteID", selectedSite) )
        {
            console.log("Deleted site");
        } else
        {
            warn("Unable to delete site", "This site might already be associated with an end-point");
            console.log("Failed to delete site from DB");
        }
        $("#deleteSite").button("disable");
        $("#editSite").button("disable");
        updateSiteList();
    });
    
    // setup buttons - Apps
    $("#addApp").button();
    $("#addApp").click( function() 
    {
        console.log("Add App");
    });
    $("#editApp").button();
    $("#editApp").button("disable");
    $("#editApp").click( function() 
    {
        //        0 appID
        //        1 appName
        //        2 appDescription
        //        3 EFCIRTx
        //        4 EFCIRRx
        //        5 AFCIRTx
        //        6 AFCIRRx
        //        7 AFPIRTx
        //        8 AFPIRRx
        //        9 BEPIRTx
        //        10 BEPIRRx
        //        11 protection
        //        12 latency
        //        13 packetLoss
        console.log("Edit App");
        $("#appName").val(selectedData[1]);
        $("#appDescription").html(selectedData[2]);
        $("#EFCIRTx").val(selectedData[3]);
        $("#EFCIRRx").val(selectedData[4]);
        $("#AFCIRTx").val(selectedData[5]);
        $("#AFCIRRx").val(selectedData[6]);
        $("#AFPIRTx").val(selectedData[7]);
        $("#AFPIRRx").val(selectedData[8]);
        $("#BEPIRTx").val(selectedData[9]);
        $("#BEPIRRx").val(selectedData[10]);
        $("#protection").val(selectedData[11]);
        $("#latency").val(selectedData[12]);
        $("#packetLoss").val(selectedData[13]);
        $("#appDialog").dialog('open');
    });
    $("#deleteApp").button();
    $("#deleteApp").button("disable");
    $("#deleteApp").click( function() 
    {
        console.log("Delete App with ID " + selectedApp);
        
        if ( deleteDBRecord("customerApps", "appID", selectedApp) === true )
        {
            console.log("Deleted App");
        } else
        {
            warn("Unable to delete App", "This App may be in use.");
            console.log("Failed to delete App DB");
        }
        $("#deleteSite").button("disable");
        $("#editSite").button("disable");
        updateAppList();
    });
    
    // setup buttons - End-points


    $("#editEp").button();
    $("#editEp").button("disable");
    $("#editEp").click( function() 
    {
        console.log("Edit App");
        $("#appName").val(selectedData[1]);
        $("#appDescription").html(selectedData[2]);
        $("#EFCIRTx").val(selectedData[3]);
        $("#EFCIRRx").val(selectedData[4]);
        $("#AFCIRTx").val(selectedData[5]);
        $("#AFCIRRx").val(selectedData[6]);
        $("#AFPIRTx").val(selectedData[7]);
        $("#AFPIRRx").val(selectedData[8]);
        $("#BEPIRTx").val(selectedData[9]);
        $("#BEPIRRx").val(selectedData[10]);
        $("#protection").val(selectedData[11]);
        $("#latency").val(selectedData[12]);
        $("#packetLoss").val(selectedData[13]);
        $("#appDialog").dialog('open');
    });
    
    // setup tables
    siteTable = $("#siteTable").DataTable(
    {
        "columns": [
        { "title": "siteID", bVisible: false },
        { "title": "Type", width: "20%" },
        { "title": "addressStreet", bVisible: false },
        { "title": "addressCity", bVisible: false },
        { "title": "addressState", bVisible: false },
        { "title": "addressPostCode", bVisible: false },
        { "title": "addressCountry", bVisible: false },
        { "title": "Name", width: "20%" },
        { "title": "Notes", width: "60%" },
        { "title": "addrString", bVisible: false } ]
    });
    $("#siteTable").on('click', 'tr', function ()
    {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            $("#editSite").button("disable");
            $("#deleteSite").button("disable");
        }
        else
        {
            siteTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            selectedData = siteTable.row( this ).data();
            selectedSite = selectedData[0];
            $("#editSite").button("enable");
            $("#deleteSite").button("enable");
        }
    });
    
    appTable = $("#appTable").DataTable(
    {
        "columns": [
        { "title": "AppID", bVisible: false },
        { "title": "Name" },
        { "title": "Description" },
        { "title": "EFCIRTx", bVisible: false },
        { "title": "EFCIRRx", bVisible: false },
        { "title": "AFCIRTx", bVisible: false },
        { "title": "AFCIRRx", bVisible: false },
        { "title": "AFPIRTx", bVisible: false },
        { "title": "AFPIRRx", bVisible: false },
        { "title": "BEPIRTx", bVisible: false },
        { "title": "BEPIRRx", bVisible: false },
        { "title": "Protection" },
        { "title": "Latency" },
        { "title": "Packet Loss" } ]
    });
    $("#appTable").on('click', 'tr', function ()
    {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            $("#editApp").button("disable");
            $("#deleteApp").button("disable");
        }
        else
        {
            appTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            selectedData = appTable.row( this ).data();
            selectedApp = selectedData[0];
            $("#editApp").button("enable");
            $("#deleteApp").button("enable");
        }
    });
    
    epTable = $("#epTable").DataTable(
    {
        "columns": [
        { "title": "resourceID", bVisible: false },
        { "title": "Name" },
        { "title": "Service ID" },
        { "title": "Type" },
        { "title": "custSiteID", bVisible: false },
        { "title": "vnf_vr", bVisible: false },
        { "title": "vnf_fw", bVisible: false },
        { "title": "vnf_cloudconn", bVisible: false },
        { "title": "vnf_loadbal", bVisible: false },
        { "title": "vnf_epc", bVisible: false },
        { "title": "vnf_appclass", bVisible: false },
        { "title": "vnfCapable", bVisible: false } ]
    });
    $("#epTable").on('click', 'tr', function ()
    {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else
        {
            epTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            selectedData = epTable.row( this ).data();
//            $("#siteName").val(selectedData[7]);
//            $("#siteStreet").val(selectedData[2]);
//            $("#siteCity").val(selectedData[3]);
//            $("#siteState").val(selectedData[4]);
//            $("#sitePostcode").val(selectedData[5]);
//            $("#siteCountry").val(selectedData[6]);
//            $("#siteNotes").html(selectedData[8]);
//            $("#siteType").val(selectedData[1]);
            $("#epDialog").dialog('open');
        }
    });
    
    // initial population of tables
    updateSiteList();
    updateAppList();
    updateEpList();
    
});