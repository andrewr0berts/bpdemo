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
        <script src="js/utility.js"></script>
        <script src="js/admincontrol.js"></script>
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
                    <li><a href="#tabs-1">Customer demo setup</a></li>
                    <li><a href="#tabs-2">Advanced options</a></li>
                </ul>
                <div id="tabs-1">
                    <h4>Customer demo setup</h4>
                    <br><label class="dialogLabel">App Name</label>
                    <input id="appname" type="text" name="appname" value="" size="40" />
                    <br><label class="dialogLabel">User 1 Name</label>
                    <input id="user1name" type="text" value="" size="40" />
                    <br><label class="dialogLabel">User 2 Name</label>
                    <input id="user2name" type="text" value="" size="40" />
                    <br><label class="dialogLabel">Customer Logo</label>
                    <input type="button" value="Upload..." id="buttonUpload" />
                    <hr>
                    <h4>Blue Planet Configuration</h4>
                    <br><label class="dialogLabel">Run standalone</label>
                    <input type="checkbox" id="runStandalone"/><p class="inline">(Allows demo to run standalone without connection to Blue Planet or network)</p>
                    <br><label class="dialogLabel">BP Server IP</label>
                    <input id="bpip" value="" size="40" />
                    <br><label class="dialogLabel">BP User ID</label>
                    <input id="bpuser" type="text" size="40" />
                    <br><label class="dialogLabel">BP Password</label>
                    <input id="bppwd" type="text" size="40" />
                    <hr>            
                </div>
                <div id="tabs-2">
                    <p>Test Blue Planet Token</p>
                    <input type="button" value="Get Token" id="getToken" />  
                    <p id="apiResp1"></p>
                    <p id="apiResp2"></p>
                    <p id="apiResp3"></p>
                    <p id="apiResp4"></p>
                </div>
            </div>
            <input type="button" value="Save" id="buttonSave" />
            <input type="button" value="Refresh" id="buttonRefresh" />
        </div>

        <!--Footer section-->
        <div class="footerDiv">
            <?php include_once "common/footer.php"; ?>
        </div>
        
        <!--dialogs-->
        <div>
            <?php include_once "common/dialogs.php"; ?>
        </div>
            
    </body>
</html>