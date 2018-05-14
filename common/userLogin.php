<?php
    if(!isset($_SESSION))
    {
        session_start();
    }
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/constants.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/dbHandler.php';
    $response_array = array();

    /* got do db and see if details match */
    $wepDB = new mydb();
    $wepDB->selectDB(DB_NAME);
    $userdata = $wepDB->checkUser($_POST['username'], $_POST['password']);
    $appdata = $wepDB->getAppPrefs();
    
    if( $userdata['userName'] )
    {
        /* user-specific information */
        $response_array['status'] = 'Success';
        $_SESSION["userName"] = $userdata['userName'];
        $_SESSION["userID"] = $userdata['userID'];
        $_SESSION["custName"] = $userdata['custName'];
        $_SESSION["custID"] = $userdata['custID'];
        $_SESSION["userNotes"] = $userdata['userNotes'];

        /* app prefs */
        $_SESSION["AppName"] = $appdata['AppName'];
        $_SESSION["BPServerAddr"] = $appdata['BPServerAddr'];
        $_SESSION["BPServerUser"] = $appdata['BPServerUser'];
        $_SESSION["BPServerPassword"] = $appdata['BPServerPassword'];
        $_SESSION["runStandalone"] = $appdata['runStandalone'];
    } else
    {
        $response_array['status'] = 'Failed';
    }
    
    /* send info back to caller */
    echo json_encode($response_array);
?>