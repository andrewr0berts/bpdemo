// Utility functions

// get time in DD MTH, HH:MM:SS
function getMyTime()
{
    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()+1).toString();
    var dd = d.getDate().toString();
    var hh = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sec = ("0"+d.getSeconds().toString()).slice(-2);  // ensure 2-digit second display
    return dd+"/"+mm+"/"+yyyy+" "+hh+":"+min+":"+sec;
}

// get time in HH:MM:SS
function getMyTimeShort()
{
    var d = new Date();
    var hh = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sec = ("0"+d.getSeconds().toString()).slice(-2);  // ensure 2-digit second display
    return hh+":"+min+":"+sec;
}

// Truncate a string to a length and insert ... at end
function truncate(stringy, length)
{
    var newstring;
    if ( stringy.length > length)
    {
        newstring = stringy.substring(0, length-3) + "...";
        return newstring;
    }
    else
    return stringy;
}

// Delete a database record
function deleteDBRecord(table, column, value)
{
    console.log("deleteDBRecord: with table=" + table + " column=" + column + " value=" + value);
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
            "datatype": "deleteDBEntry",
            "table": table,
            "column": column,
            "value": value
        },
        success: function(msg)
        {
            var response = JSON.parse(msg);
            if( response.STATUS === "SUCCESS" )
            {
                console.log("deleteDBRecord: Deleted record");
                return true;
            }
            else
            {
                console.log("deleteDBRecord: FAILED to delete record");
                return false;
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
            return false;
        }
    });
    return true;
}