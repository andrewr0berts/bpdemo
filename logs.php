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
        <script src="js/logs.js"></script>
        <script src="js/utility.js">user1</script>
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
            <div id="tabs">
              <ul>
                <li><a href="#tabs-1">Transactions</a></li>
                <li><a href="#tabs-2">Logs</a></li>
              </ul>
              <div id="tabs-1">
                <table class="display compact" id="transactionsTable">
                    <thead>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
              </div>
              <div id="tabs-2">
                <table class="display compact" id="logsTable">
                    <thead>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
              </div>
            </div>
        </div>

        <!--Footer section-->
        <div class="footerDiv">
            <?php include_once "common/footer.php"; ?>
        </div>
            
    </body>
</html>