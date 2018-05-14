<?php
    $userdata['userName'] = "";
    $userdata['custName'] = "";
    session_start();
    session_destroy();
    header('Location: http://www.bpdemo.com/login.php');
?>