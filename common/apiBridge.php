<?php
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/constants.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/dbHandler.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/apiHandler.php';
    $response_array = array();
    
    /* If the user isn't logged in, direct to login page */
    if(!isset($_SESSION["userName"]) || is_null($_SESSION["userName"]))
    {
         header('Location: ./login.php');
         exit();
    }
    
    /* get data from POST */
    foreach($_POST as $key=>$val)
    {
        /* get info for request */
        switch($key)
        {
            case "datatype":
                $action = $val;
                break;
        }
    }
    
    /* process request */
    {   
        switch($action)
        {
            case "getToken":
                $response_array = json_encode(getToken());
                break;
        }
    }

    /* send info back to caller */
    echo json_encode($response_array);
?>