<?php
    if(!isset($_SESSION))
    {
        session_start();
    }
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/constants.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/apiHandler.php';

class mydb
{
    /* define variables */
    private $con;
    
    /* Constructor: connect to local server */
    public function __construct()
    {
        global $con;
        $con = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if (mysqli_connect_error($con))
        {
            $_SESSION['errorMsg'] = mysqli_connect_error();
            echo "SESSION ERROR = ". $_SESSION['errorMsg'];
//            include 'error.php';
            die();
        } else
        {
            return 0;
        }
    }
    
    /* function to select database */
    public function selectDB($dbname)
    {
        global $con;
        
        $dbSelected = mysqli_select_db($con, $dbname);
        if ($dbSelected)
        {
            $_SESSION['errorMsg'] = mysqli_error($con);
            return -1;
        }
        return 0;
    }
    
        /* get application preferences */
    public function getAppPrefs()
    {
        global $con;
        $appPref=array();
        
        /* get record for user from DB */
        $sql = "SELECT * FROM AppSettings";
        
        $result = mysqli_query($con, $sql);
        if ( $result )
        {
            $this->logActivity("Successfully retrieved App Prefs; BPSvr:".$row['BPServerAddr']."BypassBP:".$row['runStandalone'].".");
            $row = mysqli_fetch_assoc($result);
            $appPref['user1name'] = $row['user1name'];
            $appPref['user2name'] = $row['user2name'];
            $appPref['CustomerLogoName'] = $row['CustomerLogoName'];
            $appPref['AppName'] = $row['AppName'];
            $appPref['BPServerAddr'] = $row['BPServerAddr'];
            $appPref['BPServerUser'] = $row['BPServerUser'];
            $appPref['BPServerPassword'] = $row['BPServerPassword'];
            $appPref['runStandalone'] = $row['runStandalone'];
            $appPref['status'] = "SUCCESS";
            return $appPref;
        }
        else
        {
            $this->logActivity("Failed to get App Prefs");
            $appPref['status'] = "FAIL";
            return 0;
        }
    }
    
    public function saveAppPrefs($AppName, $user1name, $user2name, $BPServerAddr, $BPServerUser, $BPServerPassword, $runStandalone)
    {
        global $con;
        $results=array();

        /* get services for this customer*/
        $sql = "UPDATE appsettings set AppName='". $AppName. "', user1name='". $user1name. "', user2name='".$user2name. "', BPServerAddr='". $BPServerAddr. "', BPServerUser='". $BPServerUser. "', BPServerPassword='". $BPServerPassword. "', runStandalone='". $runStandalone."'";

        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $this->logActivity("Failed to update App Prefs");
            $results['STATUS']="Failed to update App Prefs";
            return $results;
        } else
        {
            $this->logActivity("Updated App Prefs");
            $results['STATUS']="SUCCESS";
            return $results;
        }
    }
      
    /* check user login details */
    public function checkUser($user, $password)
    {
        global $con;
        $userdata = array();
        
        $this->logActivity("Attempting to authentical user (".$user.":".$password.")");
        /* get record for user from DB */
        // $sql = "SELECT * FROM Users WHERE userName = '".$user."'";
        $sql = "select users.userID, users.userName, users.userPassword, users.custID, customers.custName, users.userNotes from users inner join customers on users.custID=customers.custID where users.userName='".$user."'";

        $result = mysqli_query($con, $sql);
        if ( $result )
        {
            $row = mysqli_fetch_array($result);
            if ( $row['userPassword'] != $password )
            {
                $this->logActivity("User ".$user." failed to log in");
                return FALSE;
            }
            else
            {
                $this->logActivity("User ".$user." successfully logged-in");
                $userdata['userName'] = $row['userName'];
                $userdata['userID'] = $row['userID'];
                $userdata['custName'] = $row['custName'];
                $userdata['custID'] = $row['custID'];
                $userdata['userNotes'] = $row['userNotes'];
                return $userdata; 
            }  
        }
        return FALSE;
    }
       
    public function addGeoLocation($addr, $lat, $lng)
    {
        global $con;

        $sql = "INSERT INTO geolocations (address, lat, lng) VALUES ('".$addr."', ".$lat.", ".$lng.")";
        $result = mysqli_query($con, $sql);
        if ( $result )
        {
            $this->logActivity("addGeoLocation for Addr: ".$addr);
            return SUCCESS;
        };
        return "Unable to add GeoLocation";
    }
    
    // returns FALSE if not found, or geo co-ordinates if found
    public function getGeoLocation($addr)
    {
        global $con;
        $location=array();

        /* get service details */
        $sql = "SELECT * FROM geolocations WHERE address='" . $addr . "'";
        $result = mysqli_query($con, $sql);
        if ( $result )
        {
            $num_rows = mysqli_num_rows($result);
            if ( $num_rows >= 1 )
            {
                $this->logActivity("getGeoLocation for Addr: ".$addr);
                $row = mysqli_fetch_assoc($result);
                $location['lat'] = $row['lat'];
                $location['lng'] = $row['lng'];
            } else
            {
                return FALSE;
            }
        }
        else
        {
            return FALSE;
        }
        return $location;
    }
    
    /* get list of services for this customer */
    public function getLogs()
    {
        global $con;
        $logs=array();

        /* get services for this customer*/
        $sql = "SELECT * FROM logs";
        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $logs['STATUS']="Failed to get logs from DB";
            return $services;
        } else
        {
            $i=0;
            while ($row = mysqli_fetch_assoc($result)) 
            {   
                $logs['svcs'][$i]['timeStamp'] = $row['timeStamp'];
                $logs['svcs'][$i++]['logEntry'] = $row['logEntry'];
            }
        }
        $logs['STATUS']="SUCCESS";
        return $logs;
    }
    
    /* log activity */  
    public function logTransaction($type, $eventDesc, $userID, $qosProfileID, $serviceID, $custID)
    {
        global $con;
        
        $timestamp = date('Y-m-d H:i:s');
        $sql = "insert INTO transactions (type, eventDesc, eventTime, userID, qosProfileID, serviceID, custID) VALUES ('".$type."','".$eventDesc."','".$timestamp."','".$userID."','".$qosProfileID."','".$serviceID."','".$custID."')";
        
        $result = mysqli_query($con, $sql);
        if ( $result )
        {
            return $result;   
        }
        return FALSE;
    }
    
    /* log activity */
    public function logActivity($event)
    {
        global $con;
        
        $timestamp = date('Y-m-d H:i:s');
        $sql = "insert INTO logs (`timeStamp`, `logEntry`) VALUES ('".$timestamp."', '".$event."')";
        
        $result = mysqli_query($con, $sql);
        if ( $result )
        {
            return $result;   
        }
        return FALSE;
    }
    
    /* get list of transactions for this customer */
    public function getTransactions($custID)
    {
        global $con;
        $services=array();

        /* get services for this customer*/
        $sql = "SELECT * FROM transactions WHERE custID='" . $custID . "'";
        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $services['STATUS']="Failed to get transactions from DB";
            return $services;
        } else
        {
            $i=0;
            while ($row = mysqli_fetch_assoc($result)) 
            {   
                $services['svcs'][$i]['eventID'] = $row['eventID'];
                $services['svcs'][$i]['type'] = $row['type'];
                $services['svcs'][$i]['eventDesc'] = $row['eventDesc'];
                $services['svcs'][$i]['eventTime'] = $row['eventTime'];
                $services['svcs'][$i]['userID'] = $row['userID'];
                $services['svcs'][$i]['qosProfileID'] = $row['qosProfileID'];
                $services['svcs'][$i]['serviceID'] = $row['serviceID'];
                $services['svcs'][$i++]['custID'] = $row['custID'];
            }
        }
        $this->logActivity("Retreive Transactions request");
        $services['STATUS']="SUCCESS";
        return $services;
    }
    
    /* get list of sites for this customer */
    public function getSites($custID)
    {
        global $con;
        $services=array();

        /* get services for this customer*/
        $sql = "SELECT * FROM sites WHERE custID='" . $custID . "'";
        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $services['STATUS']="Failed to get sites from DB";
            return $services;
        } else
        {
            $i=0;
            while ($row = mysqli_fetch_assoc($result)) 
            {   
                $services['svcs'][$i]['siteID'] = $row['siteID'];
                $services['svcs'][$i]['custSiteType'] = $row['custSiteType'];
                $services['svcs'][$i]['addressStreet'] = $row['addressStreet'];
                $services['svcs'][$i]['addressCity'] = $row['addressCity'];
                $services['svcs'][$i]['addressState'] = $row['addressState'];
                $services['svcs'][$i]['addressPostCode'] = $row['addressPostCode'];
                $services['svcs'][$i]['addressCountry'] = $row['addressCountry'];
                $services['svcs'][$i]['custSiteName'] = $row['custSiteName'];
                $services['svcs'][$i++]['custSiteNotes'] = $row['custSiteNotes'];
            }
        }
        $this->logActivity("Retreive Sites request");
        $services['STATUS']="SUCCESS";
        return $services;
    }
    
    /* update sites for this customer */
    public function updateSiteInfo($siteID, $addressStreet, $addressCity, $addressState, $addressPostcode, $addressCountry, $custSiteName, $custSiteNotes, $custSiteType)
    {
        global $con;
        $results=array();

        /* get services for this customer*/
        $sql = "UPDATE sites set addressStreet='". $addressStreet. "', addressCity='". $addressCity. "', addressState='". $addressState. "', addressPostCode='". $addressPostcode. "', addressCountry='". $addressCountry. "', custSiteName='". $custSiteName. "', custSiteNotes='". $custSiteNotes. "', custSiteType='". $custSiteType."' where siteID='" . $siteID . "'";

        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $this->logActivity("Failed to update site info for siteID: ".$siteID);
            $results['STATUS']="Failed to update site info";
            return $results;
        } else
        {
            $this->logActivity("Update site info for siteID: ".$siteID);
            $results['STATUS']="SUCCESS";
            return $results;
        }
    }
    
    /* update sites for this customer */
    public function updateAppInfo($appID, $appName, $appDescription, $custID, $EFCIRTx, $EFCIRRx, $AFCIRTx, $AFCIRRx, $AFPIRTx, $AFPIRRx, $BEPIRTx, $BEPIRRx, $protection, $latency, $packetLoss)
    {
        global $con;
        $results=array();

        /* get services for this customer*/
        $sql = "UPDATE customerApps set " .
                "appName='". $appName.
                "', appDescription='". $appDescription. 
                "', EFCIRTx='". $EFCIRTx. 
                "', EFCIRRx='". $EFCIRRx. 
                "', AFCIRTx='". $AFCIRTx. 
                "', AFCIRRx='". $AFCIRRx. 
                "', AFPIRTx='". $AFPIRTx. 
                "', AFPIRRx='". $AFPIRRx. 
                "', BEPIRTx='". $BEPIRTx. 
                "', BEPIRRx='". $BEPIRRx. 
                "', protection='". $protection. 
                "', latency='". $latency. 
                "', packetLoss='". $packetLoss. 
                "' where appID='" . $appID . "'";

        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $this->logActivity("Failed to update App info for appID: ".$appID);
            $results['STATUS']="Failed to update site info";
            return $results;
        } else
        {
            $this->logActivity("Update site info for appID: ".$appID);
            $results['STATUS']="SUCCESS";
            return $results;
        }
    }
    
    /* delete site */
    public function deleteDBEntry($table, $column, $value)
    {
        global $con;
        $results=array();

        /* get services for this customer*/
        $sql = "DELETE FROM ".$table." where ".$column."='" . $value . "'";

        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $this->logActivity("Failed to delete DB entry from table ".$table." with ".$column."=".$value);
            $results['STATUS']="Failed to delete site info";
            return $results;
        } else
        {
            $this->logActivity("Deleted DB entry from table ".$table." with ".$column."=".$value);
            $results['STATUS']="SUCCESS";
            return $results;
        }
    }
    
    /* get list of apps for this customer */
    public function getApps($custID)
    {
        global $con;
        $apps=array();

        /* get services for this customer*/
        $sql = "SELECT * FROM customerApps WHERE custID='" . $custID . "'";
        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $apps['STATUS']="Failed to get Apps from DB";
            return $apps;
        } else
        {
            $i=0;
            while ($row = mysqli_fetch_assoc($result)) 
            {
//                EFCIRTx, EFCIRRx, AFCIRTx, AFCIRRx, AFPIRTx, AFPIRRx, BEPIRTx, BEPIRRx
                $apps['apps'][$i]['appID'] = $row['appID'];
                $apps['apps'][$i]['appName'] = $row['appName'];
                $apps['apps'][$i]['appDescription'] = $row['appDescription'];
                $apps['apps'][$i]['EFCIRTx'] = $row['EFCIRTx'];
                $apps['apps'][$i]['EFCIRRx'] = $row['EFCIRRx'];
                $apps['apps'][$i]['AFCIRTx'] = $row['AFCIRTx'];
                $apps['apps'][$i]['AFCIRRx'] = $row['AFCIRRx'];
                $apps['apps'][$i]['AFPIRTx'] = $row['AFPIRTx'];
                $apps['apps'][$i]['AFPIRRx'] = $row['AFPIRRx'];
                $apps['apps'][$i]['BEPIRTx'] = $row['BEPIRTx'];
                $apps['apps'][$i]['BEPIRRx'] = $row['BEPIRRx'];
                $apps['apps'][$i]['custID'] = $row['custID'];
                $apps['apps'][$i]['latency'] = $row['latency'];
                $apps['apps'][$i]['packetLoss'] = $row['packetLoss'];
                $apps['apps'][$i++]['protection'] = $row['protection'];
            }
        }
        $this->logActivity("Get Apps requested");
        $apps['STATUS']="SUCCESS";
        return $apps;
    }
    
    /* get list of end-points for this customer */
    public function getEps($custID)
    {
        global $con;
        $resp=array();

        /* get services for this customer*/
        $sql = "SELECT * FROM resources WHERE custID='" . $custID . "'";
        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $this->logActivity("Failed to get EPs from DB");
            $resp['STATUS']="Failed to get EPs from DB";
            return $resp;
        } else
        {
            $i=0;
            while ($row = mysqli_fetch_assoc($result)) 
            {
                $resp['vals'][$i]['resourceID'] = $row['resourceID'];
                $resp['vals'][$i]['nodeID'] = $row['nodeID'];
                $resp['vals'][$i]['portID'] = $row['portID'];
                $resp['vals'][$i]['custID'] = $row['custID'];
                $resp['vals'][$i]['customerName'] = $row['customerName'];
                $resp['vals'][$i]['useState'] = $row['useState'];
                $resp['vals'][$i]['VlanID'] = $row['VlanID'];
                $resp['vals'][$i]['serviceID'] = $row['serviceID'];
                $resp['vals'][$i]['custEPType'] = $row['custEPType'];
                $resp['vals'][$i]['vnfCapable'] = $row['vnfCapable'];
                $resp['vals'][$i]['vnf_vr'] = $row['vnf_vr'];
                $resp['vals'][$i]['vnf_fw'] = $row['vnf_fw'];
                $resp['vals'][$i]['vnf_cloudconn'] = $row['vnf_cloudconn'];
                $resp['vals'][$i]['vnf_loadbal'] = $row['vnf_loadbal'];
                $resp['vals'][$i]['vnf_epc'] = $row['vnf_epc'];
                $resp['vals'][$i]['vnf_appclass'] = $row['vnf_appclass'];                
                $resp['vals'][$i++]['custSiteID'] = $row['custSiteID'];
            }
        }
        $this->logActivity("Get End-points requested");
        $resp['STATUS']="SUCCESS";
        return $resp;
    }
        
    /* get list of services for this customer */
    public function getServices($custID)
    {
        global $con;
        $services=array();

        /* get services for this customer*/
        $sql = "SELECT * FROM services WHERE services.custID='" . $custID . "' AND services.serviceStatus!='DELETED'";
        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $this->logActivity("Failed to get services from DB");
            $services['STATUS']="Failed to get services from DB";
            return $services;
        } else
        {
            $i=0;
            while ($row = mysqli_fetch_assoc($result)) 
            {   
                $services['svcs'][$i]['serviceID'] = $row['serviceID'];
                $services['svcs'][$i]['serviceName'] = $row['serviceName'];
                $services['svcs'][$i]['custID'] = $row['custID'];
                $services['svcs'][$i]['serviceType'] = $row['serviceType'];
                $services['svcs'][$i]['serviceStatus'] = $row['serviceStatus'];
                $services['svcs'][$i++]['AppID'] = $row['AppID'];
            }
        }
        $numservices = $i;
        
        /* now get end-points */
        for ( $i=0; $i<$numservices; $i++)
        {   
            $sql = "select * from resources join sites on resources.custSiteID=sites.siteID where serviceID='".$services['svcs'][$i]['serviceID']."'";
            $result = mysqli_query($con, $sql);
            $k=0;
            while ($row = mysqli_fetch_assoc($result))
            {
                $thisAddr = $row['addressStreet'].", ".$row['addressCity'].", ".$row['addressState'].", ".$row['addressCountry'];
                $services['svcs'][$i]['svcEPs'][$k]['Addr'] = $thisAddr;
                $services['svcs'][$i]['svcEPs'][$k]['resourceID'] = $row['resourceID'];
                $services['svcs'][$i]['svcEPs'][$k]['customerName'] = $row['customerName'];
                $services['svcs'][$i]['svcEPs'][$k]['custEPType'] = $row['custEPType'];
                $services['svcs'][$i]['svcEPs'][$k]['vnfCapable'] = $row['vnfCapable'];
                $services['svcs'][$i]['svcEPs'][$k]['siteID'] = $row['siteID'];
                $services['svcs'][$i]['svcEPs'][$k]['custSiteType'] = $row['custSiteType'];
                $services['svcs'][$i]['svcEPs'][$k]['addressStreet'] = $row['addressStreet'];
                $services['svcs'][$i]['svcEPs'][$k]['addressCity'] = $row['addressCity'];
                $services['svcs'][$i]['svcEPs'][$k]['addressState'] = $row['addressState'];
                $services['svcs'][$i]['svcEPs'][$k]['addressPostCode'] = $row['addressPostCode'];
                $services['svcs'][$i]['svcEPs'][$k]['addressCountry'] = $row['addressCountry'];
                $services['svcs'][$i]['svcEPs'][$k]['custID'] = $row['custID'];
                $services['svcs'][$i]['svcEPs'][$k]['custSiteName'] = $row['custSiteName'];
                $services['svcs'][$i]['svcEPs'][$k++]['custSiteNotes'] = $row['custSiteNotes'];
            }
        }
        $this->logActivity("Get services from DB");
        $services['STATUS']="SUCCESS";
        return $services;
    }
    
    /* get the string between two functions */
    public function GetStringBetween ($string, $start, $finish)
    {
        $string = " ".$string;
        $position = strpos($string, $start);
        if ($position == 0) return "";
        $position += strlen($start);
        $length = strpos($string, $finish, $position) - $position;
        return substr($string, $position, $length);
    }

   /* get list of services for this customer */
    public function createService($userID, $custID, $serviceName, $serviceType, $AppID, $EPA, $EPB)
    {
        global $con;
        $serviceID = time();
        $results=array();
        $api_results=array();
        $apps=array();
        

        /* Get TM Parameters */
        $sql = "SELECT * FROM customerApps WHERE appID='" . $AppID . "'";
        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $this->logActivity("Failed to get App details for AppID ".$AppID);
            $apps['STATUS']="Failed to get App details for AppID ".$AppID;
            return $apps;
        } else
        {
            $row = mysqli_fetch_assoc($result);
            $IngresCIR = $row['AFCIRRx'];
            $IngresPIR = $row['AFPIRRx'];
            $this->logActivity("Traffic Params: AFCIRRx=".$IngresCIR.", AFPIRRx=".$IngresPIR);
        }

        /* create serice via Blue Planet */
        if( $_SESSION["runStandalone"] === "1" )
        {
            $this->logActivity("RunStandalone: TRUE (skipping BP)");
        } else
        {
            /* STEP 1: Get Token */
            $api_results = getToken();
            $token = $this->GetStringBetween( $api_results['info'], "token\":\"", "\",");
            $this->logActivity("Token from API: ".  $token);

            /* STEP 2: Get Port IDs */
            $api_results = getPortID($token, "wtf-1", "port:2");
            if ( $api_results['status'] <> 0 )
            {
                $results['STATUS']="Failed to get Port A Product ID";
                return $results;
            }
            $results_array = json_decode($api_results['info'], true);
            $port_id_A = $results_array['items']['0']['id'];
            $this->logActivity("BP API: Port ID A: ".$port_id_A);

            $api_results = getPortID($token, "wtf-2", "port:2");
            if ( $api_results['status'] <> 0 )
            {
                $results['STATUS']="Failed to get Port A Product ID";
                return $results;
            }
            $results_array = json_decode($api_results['info'], true);
            $port_id_B = $results_array['items']['0']['id'];
            $this->logActivity("BP API: Port ID B: ".$port_id_B);

            /* STEP 3: Get Port IDs */
            $api_results = createService("One", "two", $token, 100);
            $this->logActivity("BP API: Create service - STATUS: ".$api_results['status'].", INFO: ".$api_results['info']);
        }
        
        /* create service entry in DB */
        $sql = "Insert into services (serviceID, serviceName, custID, serviceType, serviceStatus, AppID) VALUES ('". $serviceID. "','".$serviceName."','".$custID."','".$serviceType."','"."ACTIVE"."','".$AppID."')";
        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $results['STATUS']="Failed to create service";
            return $results;
        } else
        {
            $this->logActivity("Create DB for service with ID: ".$serviceID);
            $results['STATUS']="SUCCESS";
        }
        
        /* update end-points */
        $sql = "UPDATE resources set serviceID='". $serviceID. "', useState='used' where resourceID='".$EPA."'";
        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $this->logActivity("Failed to update DB for end-point with ID ".$EPA);
            $results['STATUS']="Failed to update DB for end-point with ID ".$EPA;
            return $results;
        } else
        {
            $this->logActivity("Updated DB with end-point with ID ".$EPA);
            $results['STATUS']="SUCCESS";
        }
        $sql = "UPDATE resources set serviceID='". $serviceID. "', useState='used' where resourceID='".$EPB."'";
        $result = mysqli_query($con, $sql);
        if ( ! $result )
        {
            $this->logActivity("Failed to update DB for end-point with ID ".$EPB);
            $results['STATUS']="Failed to update DB for end-point with ID ".$EPB;
            return $results;
        } else
        {
            $this->logActivity("Updated end-point with ID ".$EPB);
            $results['STATUS']="SUCCESS";
        }
        $this->logTransaction("CREATE", "Create Service", $userID, $AppID, $serviceID, $custID);
        return $results;
    }
}

?>