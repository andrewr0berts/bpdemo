<?php
    if(!isset($_SESSION))
    {
        session_start();
    }
    error_reporting(E_ALL);
    ini_set('display_errors', True);
    
    require $_SERVER['DOCUMENT_ROOT'].'/common/commonIncludes.php';
    date_default_timezone_set('Australia/Melbourne');
?>

<!DOCTYPE html>

<html>
    <head>
        <?php include $_SERVER['DOCUMENT_ROOT'].'/common/commonHead.php'; ?>
        <script src="js/index.js"></script>
        <script src="js/utility.js">user1
        </script>
    </head>
    <body>
        <!--Top of window banner-->
        <div class="headerDiv">
            <?php include_once "common/header.php"; ?>
        </div>
        
        <!--Title of window function-->
        <div id="breaker">
<!--            <h3>Main Menu</h3>-->
        </div>
        <!--Menu ribbon-->
        <div class="menuDiv">
            <?php include_once "common/menubar.php"; ?>                
        </div>

        <!--Main working window-->
        <div class="mainDiv">
            <div id="wheelDiv">
                <div id="helper"><h2 id="helperText">Placeholder for Service Configurations screen</h2></div>
                <div id="helperSub"><ul><li>Configure New Node</li><li>Validate Node Configuration</li><li>Scheduling Manager</li></ul></div>
            </div>

        </div>

        <!--Footer section-->
        <div class="footerDiv">
            <?php include_once "common/footer.php"; ?>
        </div>
            
    </body>
</html>