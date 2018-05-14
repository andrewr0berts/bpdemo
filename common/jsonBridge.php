<?php
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/constants.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/dbHandler.php';
    $response_array = array();
    
    /* If the user isn't logged in, direct to login page */
    if(!isset($_SESSION["userName"]) || is_null($_SESSION["userName"]))
    {
         header('Location: ./login.php');
         exit();
    }
    
    $custID = $_SESSION['custID'];
    $userID = $_SESSION['userID'];
    
    /* get data from POST */
    foreach($_POST as $key=>$val)
    {
        /* get info for request */
        switch($key)
        {
            case "datatype":
                $action = $val;
                break;
            case "addr":
                $addr = $val;
                break; 
            case "lat":
                $lat = $val;
                break; 
            case "lng":
                $lng = $val;
                break;
            case "siteID":
                $siteID = $val;
                break;
            case "addressStreet":
                $addressStreet = $val;
                break;
            case "addressCity":
                $addressCity = $val;
                break;
            case "addressState":
                $addressState = $val;
                break;
            case "addressPostcode":
                $addressPostcode = $val;
                break;
            case "addressCountry":
                $addressCountry = $val;
                break;
            case "custSiteName":
                $custSiteName = $val;
                break;
            case "custSiteNotes":
                $custSiteNotes = $val;
                break;
            case "custSiteType":
                $custSiteType = $val;
                break;
            case "AppName":
                $AppName = $val;
                break;
            case "user1name":
                $user1name = $val;
                break;
            case "user2name":
                $user2name = $val;
                break;
            case "BPServerAddr":
                $BPServerAddr = $val;
                break;
            case "BPServerUser":
                $BPServerUser = $val;
                break;
            case "BPServerPassword":
                $BPServerPassword = $val;
                break;
            case "runStandalone":
                $runStandalone = $val;
                break;
            case "serviceName":
                $serviceName = $val;
                break;
            case "serviceType":
                $serviceType = $val;
                break;
            case "AppID":
                $AppID = $val;
                break;
            case "EPA":
                $EPA = $val;
                break;
            case "EPB":
                $EPB = $val;
                break;
            case "table":
                $table = $val;
                break;
            case "column":
                $column = $val;
                break;
            case "value":
                $value = $val;
                break;
            case "appID":
                $appID = $val;
                break;
            case "appName":
                $appName = $val;
                break;
            case "appDescription":
                $appDescription = $val;
                break;
            case "custID":
                $custID = $val;
                break;
            case "protection":
                $protection = $val;
                break;
            case "latency":
                $latency = $val;
                break;
            case "packetLoss":
                $packetLoss = $val;
                break;
            case "EFCIRTx":
                $EFCIRTx = $val;
                break;
            case "EFCIRRx":
                $EFCIRRx = $val;
                break;
            case "AFCIRTx":
                $AFCIRTx = $val;
                break;
            case "AFCIRRx":
                $AFCIRRx = $val;
                break;
            case "AFPIRTx":
                $AFPIRTx = $val;
                break;
            case "AFPIRRx":
                $AFPIRRx = $val;
                break;
            case "BEPIRTx":
                $BEPIRTx = $val;
                break;
            case "BEPIRRx":
                $BEPIRRx = $val;
                break;
        }
    }

    /* connect to DB */
    $mydb = new mydb();
    
    /* process request */
    {   
        switch($action)
        {
                
            case "getAppPrefs":
                $response_array = json_encode($mydb->getAppPrefs());
                break;
            case "saveAppPrefs":
                $response_array = json_encode($mydb->saveAppPrefs($AppName, $user1name, $user2name, $BPServerAddr, $BPServerUser, $BPServerPassword, $runStandalone));
                break;
            case "getLogs":
                $response_array = json_encode($mydb->getLogs());
                break;
            case "getTransactions":
                $response_array = json_encode($mydb->getTransactions($custID));
                break;
            case "getServices":
                $response_array = json_encode($mydb->getServices($custID));
                break;
            case "createService":
                $response_array = json_encode($mydb->createService($userID, $custID, $serviceName, $serviceType, $AppID, $EPA, $EPB));
                break;
            case "getSites":
                $response_array = json_encode($mydb->getSites($custID));
                break;
            case "getApps":
                $response_array = json_encode($mydb->getApps($custID));
                break;
            case "getEps":
                $response_array = json_encode($mydb->getEps($custID));
                break;
            case "addGeoLocation":
                $response_array = json_encode($mydb->addGeoLocation($addr, $lat, $lng));
                break;
            case "getGeoLocation":
                $response_array = json_encode($mydb->getGeoLocation($addr));
                break;
            case "updateSiteInfo":
                $response_array = json_encode($mydb->updateSiteInfo($siteID, $addressStreet, $addressCity, $addressState, $addressPostcode, $addressCountry, $custSiteName, $custSiteNotes, $custSiteType));
                break;
            case "updateAppInfo":
                $response_array = json_encode($mydb->updateAppInfo($appID, $appName, $appDescription, $custID, $EFCIRTx, $EFCIRRx, $AFCIRTx, $AFCIRRx, $AFPIRTx, $AFPIRRx, $BEPIRTx, $BEPIRRx, $protection, $latency, $packetLoss));
                break;
            case "deleteDBEntry":
                $response_array = json_encode($mydb->deleteDBEntry($table, $column, $value));
                break;
        }
    }

    /* send info back to caller */
    echo json_encode($response_array);
?>