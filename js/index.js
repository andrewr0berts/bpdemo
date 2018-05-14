// General variables
var siteTable;
var serviceTable;
var selectedData = []; // holds data from selected table row

// variables relating to mapping
var map;
var infowindow = new google.maps.InfoWindow();
var selectedData;
var siteArray = []; // holds end-point info (reduces geocoder hits)
var siteList = []; // holds list of sites
var map;
var mapiconsize = 40;
var selectedService; // holds service currently selected in options list map window
var vpnEPs;
var drawnEPs;
var svcType;
var polylines = []; // array to hold polylines as they are created
var ntwkmarkers = []; // array to hold all markers on map
var lanmarker; // global variable for LAN symbol on map
var cloudmarker; // global variable for LAN symbol on map
var minLat; // hold min and max locations for current map
var maxLat;
var minLng;
var maxLng;
var vpnDrawType = "cloud";  // can be "mesh", "lan", or "cloud"

// icons for vpn drawing
var icon_vpn_lan = new google.maps.MarkerImage("bitmaps/lan.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_vpn_cloud = new google.maps.MarkerImage("bitmaps/cloud.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));

// sites icons
var icon_site_residential = new google.maps.MarkerImage("bitmaps/sites/home-blue.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_site_office = new google.maps.MarkerImage("bitmaps/sites/office-blue.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_site_factory = new google.maps.MarkerImage("bitmaps/sites/factory-blue.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_site_retail = new google.maps.MarkerImage("bitmaps/sites/retail-blue.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_site_core = new google.maps.MarkerImage("bitmaps/sites/exchange-blue.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_site_radio = new google.maps.MarkerImage("bitmaps/sites/bts-blue.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_site_warehouse = new google.maps.MarkerImage("bitmaps/sites/warehouse-blue.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_site_exchange = new google.maps.MarkerImage("bitmaps/sites/exchange-blue.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_site_datacentre = new google.maps.MarkerImage("bitmaps/sites/dc-blue.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));

// vnf icons
var icon_vnf_firewall = new google.maps.MarkerImage("bitmaps/vnfs/firewall.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_vnf_vepc = new google.maps.MarkerImage("bitmaps/vnfs/vepc.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_vnf_vr = new google.maps.MarkerImage("bitmaps/vnfs/vr.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_vnf_appclass = new google.maps.MarkerImage("bitmaps/vnfs/classifier.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_vnf_dpi = new google.maps.MarkerImage("bitmaps/vnfs/dpi.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));
var icon_vnf_cloudconn = new google.maps.MarkerImage("bitmaps/vnfs/cloudconn.png", null, null, null, new google.maps.Size(mapiconsize, mapiconsize));


// Initialise Google map
function initMap()
{
    map = new google.maps.Map(document.getElementById("mapView"),
    {
        center: {
            lat: -37.8136, lng: 144.9631
        },
        zoom: 12
    });
}

function getGeoLocation(addr)
{
//    console.log("GEO for: " + addr);
    if (addr === undefined)
    {
        console.log("Skip getGeoLocation as undefined addr");
    } else
        $.ajax(
                {
                    url: "common/jsonBridge.php",
                    type: "POST",
                    dataType: "json",
                    async: true,
                    data: {
                        "datatype": "getGeoLocation",
                        "addr": addr
                    },
                    success: function (msg)
                    {
                        var latlng = JSON.parse(msg);
                        if (latlng === 0 || latlng === null)
                        {
                            console.log("No matching addr in DB");
                            return false;
                        }
                        return latlng;
                    },
                    error: function (jqXHR, textStatus, errorThrown)
                    {
                        alert('An error occurred... Look at the console');

                        $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                        console.log('jqXHR:');
                        console.log(jqXHR);
                        console.log('textStatus:');
                        console.log(textStatus);
                        console.log('errorThrown:');
                        console.log(errorThrown);
                    }
                });
    return false;
}

function addGeoLocation(addr, lat, lng)
{
    $.ajax(
            {
                url: "common/jsonBridge.php",
                type: "POST",
                dataType: "json",
                async: true,
                data: {
                    "datatype": "addGeoLocation",
                    "addr": addr,
                    "lat": lat,
                    "lng": lng
                },
                success: function (msg)
                {
                    var georesult = JSON.parse(msg);
//            console.log("GEORESULT: " + JSON.stringify(georesult));
//            if ( georesult === 0 || georesult === null )
//            {
//                console.log("Added geolocation for " + addr + " at: " + lat + ", " + lng);
//            }
//            else
//            {
//                console.log("FAILED adding geolocation for " + addr + " at: " + lat + ", " + lng);
//            }
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    alert('addGeoLocation: An error occurred... Look at the console');

                    $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
                    console.log('jqXHR:');
                    console.log(jqXHR);
                    console.log('textStatus:');
                    console.log(textStatus);
                    console.log('errorThrown:');
                    console.log(errorThrown);
                }
            });
    return false;
}

function resetMapZoom()
{
    // zoom to fit the markers shown
    var bounds = new google.maps.LatLngBounds();
    for (i = 0; i < ntwkmarkers.length; i++)
    {
        bounds.extend(ntwkmarkers[i].getPosition());
    }
    map.fitBounds(bounds);
    map.setCenter(bounds.getCenter());
}


function addvpnep(address, name, epid, type, notes, vpnEPs)
{
    console.log("ADD EP: ADDRESS: " + address + " NAME: " + name + ", EPID: " + epid + ", TYPE: " + type + ", NOTES: " + notes);
    var storedLocation = 0;
    // set content and icon types 
    if (notes === undefined) notes = "(none)";
    var cont = "<div class='gensite' data-nid='" + epid + "' id='ep_" + epid + "'></div>\
                <p><span class='bolder'>Name: </span>" + name + "</p>\n\
                <p><span class='bolder'>Address: </span>" + address + "</p>\n\
                <p><span class='bolder'>Notes: </span>" + notes + "</p>";
    
    if (type === "Residential")
    {
        var icon = icon_site_residential;
    } else
    if (type === "Factory")
    {
        var icon = icon_site_factory;
    } else
    if (type === "Retail")
    {
        var icon = icon_site_retail;
    } else
    if (type === "Core")
    {
        var icon = icon_site_core;
    } else
    if (type === "Radio")
    {
        var icon = icon_site_radio;
    } else
    if (type === "Warehouse")
    {
        var icon = icon_site_warehouse;
    } else
    if (type === "Exchange")
    {
        var icon = icon_site_exchange;
    } else
    if (type === "Datacentre")
    {
        var icon = icon_site_datacentre;
    } else
    if (type === "Office")
    {
        var icon = icon_site_office;
    } else
    {
        var icon = icon_site_office;
    }


    // if already have address
    storedLocation = getGeoLocation(address);
    if (storedLocation !== false)
    {
        var marker = new google.maps.Marker(
                {
                    map: map,
                    icon: icon,
                    position: storedLocation
                });
        ntwkmarkers.push(marker);
        var len = siteArray.length;
        siteArray[len] = [];
        siteArray[len][0] = storedLocation.lat;
        siteArray[len][1] = storedLocation.lng;
    } else // use geocoder to find location
    {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function (results, status)
        {

            if (status === google.maps.GeocoderStatus.OK)
            {
                var location = results[0].geometry.location;
                lat = location.lat();
                lng = location.lng();
                // save location to DB
                addGeoLocation(address, lat, lng);

                var len = siteArray.length;
                siteArray[len] = [];
                siteArray[len][0] = lat;
                siteArray[len][1] = lng;
                location = {lat: lat, lng: lng};
                var marker = new google.maps.Marker(
                        {
                            map: map,
                            icon: icon,
                            position: location
                        });
                ntwkmarkers.push(marker);

                marker.addListener('click', function ()
                {
                    infowindow.setContent(cont);
                    infowindow.open(map, marker);
                    $("#" + "ep_" + epid).on('click', function ()
                    {
                        alert("Hello " + epid);
                    });
                    $("#testbutton").on('click', function ()
                    {
                        $("#site_id").val(epid);
                        $("#coreconfigform").submit();
                    });
                });

                drawnEPs++;
                if (drawnEPs === vpnEPs && vpnEPs !== -1)
                {
                    var numSites = siteArray.length;
                    for (i = 0; i < numSites; i++)
                    {
                        if (siteArray[i][0] < minLat)
                           
                            minLat = siteArray[i][0];
                        if (siteArray[i][1] < minLng)
                           
                            minLng = siteArray[i][1];
                        if (siteArray[i][0] > maxLat)
                           
                            maxLat = siteArray[i][0];
                        if (siteArray[i][1] > maxLng)
                           
                            maxLng = siteArray[i][1];
                    }
                    drawVPNLines(svcType);
                }
                resetMapZoom();
            }
        });
    }
}

function initCharts()
{
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);
}

function drawChart()
{
    var data = google.visualization.arrayToDataTable([
        ['Time', 'Tx (ms)', 'Rx (ms)'],
        ['T1',  13,      40],
        ['T2',  10,      60],
        ['T3',  60,      50],
        ['T4',  30,      15]
    ]);
    var options = {
          title: 'Real-time Delay Measurement',
          curveType: 'none',
          legend: { position: 'bottom' }
        };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('charty'));
    chart.draw(data, options);
}

function drawVPNLines()
{
    console.log("function drawVPNLines()");
    var location;
    var len = siteArray.length;
    
    // clear out existing lines...
    for (i=0; i<polylines.length; i++) 
    {                           
        polylines[i].setMap(null); //or line[i].setVisible(false);
    }
    
    if ( svcType === "pwe3" )
    {
        mapDrawLine(siteArray[0][0], siteArray[0][1], siteArray[1][0], siteArray[1][1]);
    }
    else
    {
        for ( i=0; i<len; i++ )
            console.log("EP"+i+": Lat:"+siteArray[i][0]+", Lng:"+siteArray[i][1]);
        if ( vpnDrawType === "mesh" ) // "mesh", "LAN" or "cloud"
        {
            for ( i=0; i<len; i++)
            {
                for ( j=i; j<len; j++)
                {
                    mapDrawLine(siteArray[i][0], siteArray[i][1], siteArray[j][0], siteArray[j][1]);
                }
            }
        } else
        if ( vpnDrawType === "lan" ) // bar at top with line down
        {
            // draw spine of LAN
            var spineOffset = 0.3*(maxLat-minLat);
            mapDrawLine(maxLat+spineOffset, minLng, maxLat+spineOffset, maxLng);
            // draw spine icon
            midPoint = maxLng - (maxLng-minLng)/2;
            var location = { lat: maxLat+spineOffset, lng: midPoint };
            lanmarker = new google.maps.Marker({
                map: map,
                position: location,
                icon: icon_vpn_lan
            });
            // note
            ntwkmarkers.push(lanmarker);
            
            // draw the leaves
            for (i=0; i<len; i++)
            {
                mapDrawLine(maxLat+spineOffset, siteArray[i][1], siteArray[i][0], siteArray[i][1]);
            }
        } else // cloud
        {
            // draw the icon
            var vpnLat = minLat+(maxLat-minLat)/2;
            var vpnLng = minLng+(maxLng-minLng)/2;
            var location = { lat: vpnLat, lng: vpnLng };
            cloudmarker = new google.maps.Marker({
                map: map,
                position: location,
                icon: icon_vpn_cloud                               
            });
            ntwkmarkers.push(cloudmarker);
            // draw the links to VPN
            for (i=0; i<len; i++)
            {
                mapDrawLine(vpnLat, vpnLng, siteArray[i][0], siteArray[i][1]);
            }
        }
    }
    resetMapZoom();
}

function mapDrawLine(lat1, lng1, lat2, lng2)
{
    console.log("function mapDrawLine ("+lat1+","+lng1+", "+lat2+", "+ lng2+");");
    var midplat = (lat1+lat2)/2;
    var midplng = (lng1+lng2)/2;
    var midLatLng = { lat: midplat, lng: midplng };
    var path = [
        {lat: lat1, lng: lng1},
        {lat: lat2, lng: lng2} ];
        // var distance = (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(siteArray[0][0],siteArray[0][1]), new google.maps.LatLng(siteArray[1][0],siteArray[1][1]))/1000).toFixed(2);
        // console.log("PWE3: [Dist="+distance+"Km] (lat1)"+siteArray[0][0]+"(lng1)"+siteArray[0][1]+"(lat2)"+siteArray[1][0]+"(lng2)"+siteArray[1][1]);
    var ntwkLink = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "dodgerblue",
        strokeOpacity: 1.0,
        strokeWeight: 4
        });
    polylines.push(ntwkLink);
    ntwkLink.setMap(map);
    
    // handle click events for this polyline...
    google.maps.event.addListener(ntwkLink, 'click', function()
    {
        infowindow.setContent("<p>Information</p><p>Service ID: "+selectedData[0]+"</p><p>Name: "+selectedData[1]+"</p><hr><button id='buttonInfo'>Info</button><button id='buttonTools'>Tools...</button></div>");
        $("#buttonInfo").on('click', function ()
        {
            console.log("Click on Info button");
            $("#tabs").tabs("option", "active", 2);
        });
        infowindow.setPosition(midLatLng);
        infowindow.open(map);
    });
}

function drawVpn(vpnDetails, thisSvcType)
{
    minLat = 1000;
    maxLat = -1000;
    minLng = 1000;
    maxLng = -1000;
    vpnEPs = vpnDetails.length;
    siteArray.length = 0;
    drawnEPs = 0;

    console.log("function drawVpn(); service type='" + thisSvcType + ", and");
    console.log("EPs: " + JSON.stringify(vpnDetails));
    console.log("vpnEPs: " + vpnEPs);

    // clear polylines
    for (i = 0; i < polylines.length; i++)
    {
        polylines[i].setMap(null); //or line[i].setVisible(false);
    }
    polylines.length = 0;
    // clear all markers
    for (var i = 0; i < ntwkmarkers.length; i++)
    {
        ntwkmarkers[i].setMap(null);
    }
    ntwkmarkers.length = 0;

    for (i = 0; i < vpnEPs; i++)
    {
        // Array:
        // address
        // name (Name for site)
        // end-point ID (epid)
        // type ("epc", "nodeb", "generic")
        // notes (HTML formatted text for infowindow)
        // number of VPN End-points
        // addvpnep(address, name, epid, type, notes, vpnEPs)
        if (thisSvcType === "sites")
            addvpnep(vpnDetails[i][0], vpnDetails[i][1], vpnDetails[i][2], vpnDetails[i][3], vpnDetails[i][4], -1); // set vpnEPs to -1 to avoid drawing lines
        else
            addvpnep(vpnDetails[i][0], vpnDetails[i][1], vpnDetails[i][2], vpnDetails[i][3], vpnDetails[i][4], vpnEPs); // set vpnEPs to -1 to avoid drawing lines
        // console.log(i+"/"+(vpnEPs-1)+": APPP" + vpnDetails[i][0] + ", " + vpnDetails[i][1] + ", " +  vpnDetails[i][2] + ", " +  vpnDetails[i][3] + ", " +  vpnDetails[i][4]);
        // svcType = thisSvcType;
    }
}

function drawSites()
{
    var mysiteArray = [];
    var data = siteTable.rows().data();

    // get data from site table
    data.each(function (value, index)
    {
        console.log("Drawing site: " + value[9]);
        var listLen = mysiteArray.length;
        mysiteArray[listLen] = [];
        mysiteArray[listLen] = [value[9], value[7], value[0], value[1], value[8]];
    });

    // draw sites and reset zoom
    drawVpn(mysiteArray, "sites");
    resetMapZoom();
}

// Refresh site table
function updateSiteList()
{
    console.log("Getting site records");
    $.ajax(
            {
                url: "common/jsonBridge.php",
                beforeSend: function ()
                {
                    $("#spinner").show();
                    $("#refreshServices").attr("disabled", true);
                },
                complete: function ()
                {
                    $("#spinner").hide();
                    $("#refreshServices").attr("disabled", false);
                },
                type: "POST",
                dataType: "json",
                async: true,
                data: {
                    "datatype": "getSites"
                },
                success: function (msg)
                {
                    var response = JSON.parse(msg);
                    if (response.STATUS === "SUCCESS")
                    {
                        siteTable.clear();

                        if (response.svcs !== undefined)
                           
                            $.each(response.svcs, function ()
                            {
                                console.log("Adding sites: " + this["siteID"] + " Type: " + this["addressStreet"]);
                                addrString = this["addressStreet"] + ", " + this["addressCity"] + ", " + this["addressState"] + ", " + this["addressCountry"];
                                siteTable.row.add([this["siteID"], this["custSiteType"], this["addressStreet"], this["addressCity"], this["addressState"], this["addressPostCode"], this["addressCountry"], this["custSiteName"], this["custSiteNotes"], addrString]);
                            });
                        siteTable.draw();
                    } else
                    {
                        alert("ERROR1: Failed to get sites: ");
                    }
                    return true;
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    alert('An error occurred... Look at the console');
                    $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
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

function updateServiceList()
{
    console.log("Getting service records");
    $.ajax(
            {
                url: "common/jsonBridge.php",
                beforeSend: function ()
                {
                    $("#spinner").show();
                    $("#refreshServices").attr("disabled", true);
                },
                complete: function ()
                {
                    $("#spinner").hide();
                    $("#refreshServices").attr("disabled", false);
                },
                type: "POST",
                dataType: "json",
                async: true,
                data: {
                    "datatype": "getServices"
                },
                success: function (msg)
                {
                    var response = JSON.parse(msg);
                    if (response.STATUS === "SUCCESS")
                    {
                        serviceTable.clear();

                        if (response.svcs !== undefined)
                           
                            console.log("Adding service records");
                            $.each(response.svcs, function ()
                            {
                                var len = 0;
                                var epListy=this["svcEPs"];
                                if ( typeof epListy !== 'undefined' )
                                {
                                    var len = epListy.length;
                                    serviceTable.row.add( [this["serviceID"], this["serviceName"], this["serviceType"], len, epListy ] );
                                }
                                else
                                {
                                    serviceTable.row.add( [this["serviceID"], this["serviceName"], this["serviceType"], len, "" ] );
                                }
                                console.log("Adding service with ID " + this["serviceID"] + ", name: " + this["serviceName"] + " With " + len + "endpoints.");
                            });
                        serviceTable.draw();
                    } else
                    {
                        alert("ERROR1: Failed to get services: ");
                    }
                    return true;
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                    // alert('An error occurred... Look at the console');
                    $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
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
$(document).ready(function ()
{
    // setup window and dialogs
    $("#apptitle").append("- Home");
    $("#displayoptions").hide();
    setupDialogs();
    
    $("#graphDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'Real-time Delay',
        buttons: {
          'Close' : function () {
            $(this).dialog('close');
            }
        }
    } );
    
    $("#helllo").sortable();
    
    $("#tool-delay").click(function ()
    {
        $("#graphDialog").dialog('open');
    });
    
    // Setup VPN drawing type
    $("#vpnSelect").val(vpnDrawType);
    $("#vpnSelect").change(function()
    {
        if (typeof lanmarker !== 'undefined')
            lanmarker.setVisible(false);
        if (typeof cloudmarker !== 'undefined')
            cloudmarker.setVisible(false);
        vpnDrawType = $("#vpnSelect").val();
        drawVPNLines();
        console.log("selected draw type: " + vpnDrawType);
    });

    $("#tabs").tabs();

    siteTable = $("#siteTable").DataTable(
    {
        "columns": [
            {"title": "ID", "width": "10%"},
            {"title": "Type", "width": "10%"},
            {"title": "addressStreet", bVisible: false},
            {"title": "addressCity", bVisible: false},
            {"title": "addressState", bVisible: false},
            {"title": "addressPostCode", bVisible: false},
            {"title": "addressCountry", bVisible: false},
            {"title": "Site Name", "width": "25%"},
            {"title": "custSiteNotes", bVisible: false},
            {"title": "Address", "width": "55%"}]
    });
            
    $('#siteTable tbody').on( 'click', 'tr', function () {
    // Nothing is selected
    if ( $(this).hasClass('selected') )
    {
        $(this).removeClass('selected');
        selectedData.length = 0;
        console.log("Site de-selected");
    }
    else
    {    
        selectedData = endpointTable.row( this ).data();
        siteTable.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        console.log("Site selected");
    } });  
            
    $('#tabs a[href="#tabs-1"]').on('click', function ()
    {
        console.log("Draw sites");
        $("#displayoptions").hide();
        drawSites();
    });
    $('#tabs a[href="#tabs-2"]').on('click', function ()
    {
        console.log("Set up tools for services view");
        $("#displayoptions").show();
    });
    $('#tabs a[href="#tabs-3"]').on('click', function ()
    {
        console.log("Viewing applications");
        $("#displayoptions").hide();
    });

    serviceTable = $("#serviceTable").DataTable(
    {
        "columns": [
            {"title": "ID", width: "10%"},
            {"title": "Name", width: "50%"},
            {"title": "Type", width: "30%"},
            {"title": "# End-points", width: "10%"},
            {"title": "End-points", bVisible: false} ]
    });
    $("#serviceTable").on('click', 'tr', function ()
    {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else
        {
            serviceTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            selectedData = serviceTable.row( this ).data();
            if ( selectedData[3] >> 0 )
            {
                console.log("Drawing service with ID " + selectedData[0]);
                var mysiteArray = [];
                var mysite = [];
                var vpnLen = selectedData[3];
                console.log("vpnLen: "+vpnLen);
                console.log("infoArray: "+JSON.stringify(selectedData[3]));
                for ( j=0; j< vpnLen; j++)
                {
                    mysiteArray[j] = [];
                    // mysite = [selectedData[4][j].Addr, selectedData[4][j].custSiteName, selectedData[4][j].resourceID, "SUBIFTYPE", selectedData[4][j].custSiteNotes];
                    mysite = [selectedData[4][j].Addr, selectedData[4][j].custSiteName, selectedData[4][j].resourceID, selectedData[4][j].custSiteType, selectedData[4][j].custSiteNotes];
                    mysiteArray[j] = mysite;
                }
                vpnDrawType = "cloud";
                $("#vpnSelect").val(vpnDrawType);
                $("#vpnSelect").prop("disabled", false);
                drawVpn(mysiteArray, "vpn");
            } else
            {
                console.log("Service with ID " + selectedData[0] + " doesn't have end-points to draw!");
            }
        }
    });

    // setup tools
    $("#mbhchecker").click(function ()
    {
        window.location = "admin.php";
    });
    $("#mbhchecker").addClass("tool-mbhcheck");
    $("#mbhchecker").hover(function ()
    {
        $(this).addClass("tool-mbhcheck-hover");
    }, function ()
    {
        $(this).removeClass("tool-mbhcheck-hover");
    });
    $("#create").click(function ()
    {
        window.location = "admin.php";
    });
    $("#create").addClass("tool-create");
    $("#create").hover(function ()
    {
        $(this).addClass("tool-create-hover");
    }, function ()
    {
        $(this).removeClass("tool-create-hover");
    });
    $("#clipboard").click(function ()
    {
        window.location = "admin.php";
    });
    $("#clipboard").addClass("tool-clipboard");
    $("#clipboard").hover(function ()
    {
        $(this).addClass("tool-clipboard-hover");
    }, function ()
    {
        $(this).removeClass("tool-clipboard-hover");
    });

    // get the services into the service table
    updateSiteList();
    updateServiceList();

    // setup the map
    initCharts();
    initMap();
});