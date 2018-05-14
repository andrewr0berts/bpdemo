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
<!--Hello this is some test text-->
<!DOCTYPE html>

<html>
    <head>
        <?php include $_SERVER['DOCUMENT_ROOT'].'/common/commonHead.php'; ?>
        <script src="js/create.js"></script>
        <script src="js/utility.js"></script>
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
            
            <div id="creation">
                <h3>What do you want to do?</h3>
                <div id="appSelector">
                    <input type="button" value="Cancel" id="s1buttonCancel" />
                    <hr>
                    <div class="app-container"><p class="inline">Connect a Cell Site (P2P)</p><div class="app-item" id="app-mbh"></div></div>
                    <div class="app-container"><p class="inline">Connect to a Data Centre</p><div class="app-item" id="app-entconnect"></div></div>
                    <div class="app-container"><p class="inline">Connect my DCs</p><div class="app-item" id="app-dci"></div></div>
                    <div class="app-container"><p class="inline">Connect my Offices</p><div class="app-item" id="app-officeconnect"></div></div>
                    <div class="app-container"><p class="inline">Connect Cell Sites (VPN)</p><div class="app-item" id="app-mbhvpn"></div></div>
                    <div class="app-container"><p class="inline">Cloud Connect</p><div class="app-item" id="app-cloudconnect"></div></div>
                </div>
                <h3>Activity Details</h3>
                <div>
                    <input type="button" value="Back <--" id="s2buttonBack" />
                    <input type="button" value="Cancel" id="s2buttonCancel" />
                    <input type="button" value="Reset" id="s2buttonReset" />
                    <input type="button" value="Next -->" id="s2buttonCreate" />
                    <hr>
                    <br><label class="dialogLabel">Service name:</label>
                    <input id="svcName" type="text" size="40" />
                    <br><label class="dialogLabel">A-End:</label><p id="aendtext" class="inline">(unset - drag an end-point onto service)</p>
                    <br><label class="dialogLabel">B-End:</label><p id="bendtext" class="inline">(unset - drag an end-point onto service)</p>
                    <br><label class="dialogLabel">App Type:</label><p id="apptext" class="inline">(unset - drag an App onto the service)</p>
                    <hr>
                    <table id="svcTable" class="svcTable" border="1">
                        <tr>
                            <!--<td><span id="leftSiteLabel" class="siteLabel right">Unset left site type</span></td>-->
                            <td><span id="leftSiteLabel" class="siteLabel ">Unset left site type</span></td>
                            <td colspan="3"></td>
                            <!--<td><span id="rightSiteLabel" class="siteLabel left">Unset right site type</span></td>-->
                            <td><span id="rightSiteLabel" class="siteLabel ">Unset right site type</span></td>
                        </tr>
                        <tr>
                            <!--<td><div id="leftSiteIcon" class="siteIcon right"></div></td>-->
                            <td><div id="leftSiteIcon" class="siteIcon "></div></td>
                            <td colspan="3"></td>
                            <td><div id="rightSiteIcon" class="siteIcon"></div></td>
                        </tr>
                        <tr>
                            <td rowspan="2"><div id="leftEP" class="epUnset">+</div></td>
                            <td class="svcConnector"></td>
                            <td rowspan="2"><div id="appholder" class="appUnset">+</div></td>
                            <td class="svcConnector"></td>
                            <td rowspan="2" ><div id="rightEP" class="epUnset">+</div></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><div id="leftDArrow"></div></td>
                            <td colspan="3"></td>
                            <td><div id="rightDArrow"></div></td>
                        </tr>
                        <tr>
                            <td id="leftSvcChainCell"><div class="configBox" id="leftSvcChain"></div></td>
                            <td colspan="3"></td>
                            <td id="rightSvcChainCell"><div class="configBox" id="rightSvcChain"></div></td>
                        </tr>
                    </table>
                    <hr>
                    <input type="button" value="show EPs" id="buttonShowEPs" />
                    <input type="button" value="show Apps" id="buttonShowApps" />
                    <input type="button" value="show VNFs" id="buttonShowVNFs" />
                    
                </div>
                <h3>Go do it</h3>
                <div>
                    <input type="button" value="Back <--" id="s3buttonBack" />
                    <input type="button" value="Cancel" id="s3buttonCancel" />
                    <hr>
                    <h4>General service information</h4>
                    <br><label class="dialogLabel">Service Name:</label>
                    <span id="summarySvcName">Sample service name</span>
                    <br><label class="dialogLabel">Application Type:</label>
                    <span id="summaryAppType">Sample app type</span>
                    <h4>End-point information</h4>
                    <br><label class="dialogLabel">End-point 1:</label>
                    <span id="summaryLeftSite"></span>
                    <br><label class="dialogLabel">End-point 2:</label>
                    <span id="summaryRightSite"></span>
                    <hr>
                    <input type="button" value="Create" id="s3buttonCreate" />
                </div>
            </div>
            
            <div id="EPDialog" title="End-points">
                <div id="eplistdiv">
                    <ul id="eplist"></ul>
                </div>
                <form name="epListForm" method="POST">
                </form>
            </div>
            
            <div id="AppDialog" title="Apps">
                <div id="applistdiv">
                    <ul id="applist"></ul>
                </div>
                <form name="appListForm" method="POST">
                </form>
            </div>
            
            <div id="VNFDialog" title="Apps">
                <div id="vnflistdiv">
                    <ul id="vnflist" class="core-tools">
                        <li class="vnfs" data-vnftype="vepc"><div class="vnf-list-item vnf-vepc"><p class=""inline">Virtual EPC</p></div></li>
                        <li class="vnfs" data-vnftype="firewall"><div class="vnf-list-item vnf-firewall">Firewall</div></li>
                        <li class="vnfs" data-vnftype="vr"><div class="vnf-list-item vnf-vr">Virtual Router</div></li>
                        <li class="vnfs" data-vnftype="dpi"><div class="vnf-list-item vnf-dpi">DPI</div></li>
                        <li class="vnfs" data-vnftype="cloudconnect"><div class="vnf-list-item vnf-cloudconnect">Cloud Connect</div></li>
                        <li class="vnfs" data-vnftype="classifier"><div class="vnf-list-item vnf-classifier">Classifier</div></li>
                    </ul>
                </div>
                <form name="appListForm" method="POST">
                </form>
            </div>
            <?php include_once "common/dialogs.php"; ?>            
            <?php include_once "common/vnfDialogs.php"; ?>            
        </div>

        <!--Footer section-->
        <div class="footerDiv">
            <?php include_once "common/footer.php"; ?>
        </div>
            
    </body>
</html>