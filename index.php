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
        <script src="js/index.js"></script>
    </head>
    <body>
        <!--Top of window banner-->
        <div class="headerDiv">
            <?php include_once "common/header.php"; ?>
        </div>
        
        <!--Title of window function-->
        <div id="breaker">
        </div>
        <!--Menu ribbon-->
        <div class="menuDiv">
            <?php include_once "common/menubar.php"; ?>                
        </div>

        <!--Main working window-->
        <div class="mainDiv">
<!--            <div id="mapControl">
                <button id="showSites">Show Sites</button>
            </div>-->
            <div id="mapView"></div>
            <div id="displayoptions">
                <p class="inline">Display mode:</p>
                <select id="vpnSelect">
                    <option value="mesh">Mesh</option>
                    <option value="lan">LAN</option>
                    <option selected="selected" value="cloud">Cloud</option>
                </select>
            </div>
            <div id="tabs">
              <ul>
                <li><a href="#tabs-1">Sites</a></li>
                <li><a href="#tabs-2">Services</a></li>
                <li><a href="#tabs-3">Applications</a></li>
              </ul>
              <div id="tabs-1">
                <table class="display compact" id="siteTable">
                    <thead>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
              </div>
              <div id="tabs-2">
                <table class="display compact" id="serviceTable">
                    <thead>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
              </div>
              <div id="tabs-3">
                
                <div class="tool-wrapper">
                    <ul id="helllo">
                    <li><div class="tool-container"><p class="inline">Mobile Benchmark</p><div class="tool-item tool-mbhcheck" id="tool-mbhcheck"></div></div></li>
                    <li><div class="tool-container"><p class="inline">Validate Config</p><div class="tool-item tool-valconfig" id="tool-mbhcheck"></div></div></li>
                    <li><div class="tool-container"><p class="inline">Create</p><div class="tool-item tool-create" id="tool-create"></div></div></li>
                    <li><div class="tool-container"><p class="inline">Measure Latency</p><div class="tool-item tool-delay" id="tool-delay"></div></div></li>
                    <li><div class="tool-container"><p class="inline">Connectivity Check</p><div class="tool-item tool-ping" id="tool-ping"></div></div></li>
                    <li><div class="tool-container"><p class="inline">Consistency Check</p><div class="tool-item tool-clipboard" id="tool-clipboard"></div></div></li>
                    </ul>
                </div>
              </div>
            </div>
            
            <div id="graphDialog" class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
                <div id='charty'></div>
                <form name="graphDialog" method="POST"></form>
            </div>
            </div>
        </div>

        <!--Footer section-->
        <div class="footerDiv">
            <?php include_once "common/footer.php"; ?>
        </div>
           
        <div>
            <?php include_once "common/dialogs.php"; ?>
        </div>
        
    </body>
</html>