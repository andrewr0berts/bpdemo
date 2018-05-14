var logsTable;
var transactionsTable;

function updateTransactions()
{
    console.log("Getting transactions");
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
            "datatype": "getTransactions"
        },
        success: function(msg)
        {
            var response = JSON.parse(msg);
            if( response.STATUS === "SUCCESS" )
            {
                transactionsTable.clear();
                
                if ( response.svcs !== undefined ) $.each(response.svcs, function()
                {
                    transactionsTable.row.add( [ this["eventID"], this["type"], this["eventDesc"], this["eventTime"], this["userID"], this["qosProfileID"], this["serviceID"], this["custID"] ] );
                });
                transactionsTable.draw();
            }
            else
            {
                alert("ERROR1: Failed to get logs: ");
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

function updateLogs()
{
    console.log("Getting logs");
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
            "datatype": "getLogs"
        },
        success: function(msg)
        {
            var response = JSON.parse(msg);
            if( response.STATUS === "SUCCESS" )
            {
                logsTable.clear();
                
                if ( response.svcs !== undefined ) $.each(response.svcs, function()
                {
                    logsTable.row.add( [ this["timeStamp"], this["logEntry"] ] );
                });
                logsTable.draw();
            }
            else
            {
                alert("ERROR1: Failed to get logs: ");
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
    $("#apptitle").append("- Logs");
    
    // setup click behaviour to tabs
    $("#tabs").tabs();
    $('#tabs a[href="#tabs-1"]').on('click', function() {
        updateTransactions();
    });
    $('#tabs a[href="#tabs-2"]').on('click', function() {
        updateLogs();
    });
    
    updateTransactions();
    
    transactionsTable = $("#transactionsTable").DataTable(
    {
        "columns": [
        { "title": "eventID" },
        { "title": "type" },
        { "title": "eventDesc" },
        { "title": "eventTime" },
        { "title": "userID" },
        { "title": "qosProfileID" },
        { "title": "serviceID" },
        { "title": "custID" } ]
    });
    
    logsTable = $("#logsTable").DataTable(
    {
        "pageLength": "50",
        "columns": [
        { "title": "Time", "width": "20%" },
        { "title": "Entry", "width": "80%" } ]
    });
});