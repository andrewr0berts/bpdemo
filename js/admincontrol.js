

function getAppPrefs()
{
    console.log("Fetching App Prefs...");
    $.ajax(
            {
                url: "common/jsonBridge.php",
                beforeSend: function ()
                {
                    $("#workingDialog").dialog('open');
                },
                complete: function ()
                {
                    $("#workingDialog").dialog('close');
                },
                type: "POST",
                dataType: "json",
                async: true,
                data: {
                    "datatype": "getAppPrefs"
                },
                success: function (results)
                {
                    console.log("Getting App Preferences");
                    var fromAPI = JSON.parse(results);

                    if (fromAPI.status === "FAIL")
                    {
                        warn("Unable to get App Preferences", "");
                    } else
                    {
                        $("#appname").val(fromAPI.AppName);
                        $("#bpip").val(fromAPI.BPServerAddr);
                        $("#bpuser").val(fromAPI.BPServerUser);
                        $("#bppwd").val(fromAPI.BPServerPassword);
                        $("#user1name").val(fromAPI.user1name);
                        $("#user2name").val(fromAPI.user2name);
                        console.log("Standalone=" + fromAPI.runStandalone);
                        if ( fromAPI.runStandalone === "1" )
                        {
                            $("#runStandalone").prop('checked', true);
                        } else
                        {
                            $("#runStandalone").prop('checked', false);
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    alert('An error occurred... Look at the console');
                    // $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
                    console.log('jqXHR:');
                    console.log(jqXHR);
                    console.log('textStatus:');
                    console.log(textStatus);
                    console.log('errorThrown:');
                    console.log(errorThrown);
                }
            });
}

function getToken()
{
    console.log("Fetching Token from BP...");
    $.ajax(
            {
                url: "common/apiBridge.php",
                beforeSend: function ()
                {
                    $("#workingDialog").dialog('open');
                },
                complete: function ()
                {
                    $("#workingDialog").dialog('close');
                },
                type: "POST",
                dataType: "json",
                async: true,
                data: {
                    "datatype": "getToken"
                },
                success: function (results)
                {
                    console.log("Getting BP Token");
                    var fromAPI = JSON.parse(results);

                    console.log("Status: " + fromAPI.status);
                    console.log("Info: " + JSON.stringify(fromAPI.info));
                    console.log("Headers: " + fromAPI.headers);
                    
                    $("#apiResp1").html("Status: " + fromAPI.status);
                    $("#apiResp2").html("Info: " + JSON.stringify(fromAPI.info));
                    $("#apiResp3").html("Headers: " + JSON.stringify(fromAPI.headers));
                    $("#apiResp3").html("Headers: " + JSON.stringify(fromAPI.headers["Set-Cookie"]));
                    var bigy = fromAPI.headers["Set-Cookie"];
                    var Stringy=bigy.substring(bigy.indexOf("=")+1,bigy.indexOf(";"));
                    $("#apiResp4").html(Stringy);
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    alert('An error occurred... Look at the console');
                    console.log(jqXHR);
                }
            });
}

function saveAppPrefs()
{
    var runPref;
    
    if ( $("#runStandalone").is(":checked") === true )
    {
        runPref = "1";
    } else
    {
        runPref = "0";
    }
    console.log("runPref = " + runPref);
    
    // Sanity checking
    if ($("#appname").val() === "" || $("#appname").val() === undefined)
    {
        warn("Please enter an App Name", "");
        return;
    }
    if ($("#bpip").val() === "" || $("#bpip").val() === undefined)
    {
        warn("Please enter a server address", "");
        return;
    }
    if ($("#bpuser").val() === "" || $("#bpuser").val() === undefined)
    {
        warn("Please enter a server user ID", "");
        return;
    }
    if ($("#bppwd").val() === "" || $("#bppwd").val() === undefined)
    {
        warn("Please enter a password", "");
        return;
    }

    console.log("Saving App Prefs...");
    $.ajax(
            {
                url: "common/jsonBridge.php",
                beforeSend: function ()
                {
                    $("#workingDialog").dialog('open');
                },
                complete: function ()
                {
                    $("#workingDialog").dialog('close');
                },
                type: "POST",
                dataType: "json",
                async: true,
                data: {
                    "datatype": "saveAppPrefs",
                    "AppName": $("#appname").val(),
                    "user1name": $("#user1name").val(),
                    "user2name": $("#user2name").val(),
                    "BPServerAddr": $("#bpip").val(),
                    "BPServerUser": $("#bpuser").val(),
                    "BPServerPassword": $("#bppwd").val(),
                    "runStandalone": runPref
                },
                success: function (results)
                {
                    var fromAPI = JSON.parse(results);

                    if (fromAPI.status === "FAIL")
                    {
                        warn("Unable to get App Preferences", "");
                    } else
                    {
                        getAppPrefs();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    alert('An error occurred... Look at the console');
                    // $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
                    console.log('jqXHR:');
                    console.log(jqXHR);
                    console.log('textStatus:');
                    console.log(textStatus);
                    console.log('errorThrown:');
                    console.log(errorThrown);
                }
            });
}

// What to do when the document is ready (for all windows)
$(document).ready(function ()
{
//    window.initMap = function() {};
    $("#apptitle").append("- Setup");
    $("#tabs").tabs();
    setupDialogs();
    
    $("#buttonSave").button();
    $("#buttonSave").click( function() 
    {
        console.log("Save config");
        saveAppPrefs();
    });
    
    $("#buttonRefresh").button();
    $("#buttonRefresh").click( function() 
    {
        console.log("Refresh config");
        getAppPrefs();
    });
    
    
    $("#getToken").button();
    $("#getToken").click( function() 
    {
        console.log("Get token");
        getToken();
    });
    
    getAppPrefs();
});