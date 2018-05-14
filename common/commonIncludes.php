<?php
    if(!isset($_SESSION))
    {
        session_start();
    }

    error_reporting(E_ALL);
    ini_set('display_errors', True);
    
    date_default_timezone_set('Australia/Melbourne');
    
    /* If the user isn't logged in, direct to login page */
    if(!isset($_SESSION["userName"]) || is_null($_SESSION["userName"]))
    {
         header('Location: http://www.bpdemo.com/login.php');
    }
    
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/constants.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/dbHandler.php';
    include_once $_SERVER['DOCUMENT_ROOT'].'/common/apiHandler.php';
    
    $_SESSION['logToScreen'] = FALSE;
    
    /* Put */
    
?>