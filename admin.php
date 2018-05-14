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
        <script src="js/dialogs.js"></script>
        <script src="js/admin.js"></script>
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
                <li><a href="#tabs-1">Site Manager</a></li>
                <li><a href="#tabs-2">App Manager</a></li>
                <li><a href="#tabs-3">End-point Manager</a></li>
                </ul>
                <div id="tabs-1">
                    <table class="display compact" id="siteTable">
                        <thead>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <hr>
                    <button id="addSite">New</button>
                    <button id="editSite">Edit</button>
                    <button id="deleteSite">Delete</button>
                </div>
                <div id="tabs-2">
                    <table class="display compact" id="appTable">
                        <thead>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <hr>
                    <button id="addApp">Add</button>
                    <button id="editApp">Edit</button>
                    <button id="deleteApp">Delete</button>
                </div>
                <div id="tabs-3">
                    <table class="display compact" id="epTable">
                        <thead>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <hr>
                    <button id="editEp">Edit</button>
                </div>
            </div>
            
            <!--Site manager dialog-->
            <div id="addressDialog" title="Site Manager">
                <br><label class="dialogLabel">Site name</label>
                <input id="siteName" type="text" name="siteName" value="" size="40" />
                <hr>
                <br><label class="dialogLabel">Site type</label>
                <select id="siteType" name="siteType">
                    <option value="Residential">Residential</option>
                    <option value="Office">Office</option>
                    <option value="Factory">Factory</option>
                    <option value="Retail">Retail</option>
                    <option value="Core">EPC</option>
                    <option value="Radio">Radio site</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Exchange">Exchange</option>
                    <option value="Datacentre">Data Centre</option>
                </select>
                <br><label class="dialogLabel">Street</label>
                <input id="siteStreet" type="text" name="siteStreet" value="" size="40" />
                <br><label class="dialogLabel">City</label>
                <input id="siteCity" type="text" name="siteCity" value="" size="40" />
                <br><label class="dialogLabel">State</label>
                <input id="siteState" type="text" name="siteState" value="" size="40" />
                <br><label class="dialogLabel">Postcode</label>
                <input id="sitePostcode" type="text" name="sitePostcode" value="" size="40" />
                <br><label class="dialogLabel">Country</label>
                <input id="siteCountry" type="text" name="siteCountry" value="" size="40" />
                <hr>
                <br><label class="dialogLabel">Notes</label>
                <textarea id="siteNotes" value="" rows="3" cols="40" ></textarea>
                <form name="siteForm" method="POST"></form>
            </div>
            
            <!--App manager dialog-->
            <div id="appDialog" title="App Manager">
                <br><label class="dialogLabel">App name</label>
                <input id="appName" type="text" name="appName" value="" size="40" />
                <hr>
                <table>
                    <tbody>
                        <tr>
                            <td><label class="dialogLabel">Traffic Parameters</label></td>
                            <td colspan="2"><label class="tmLabel">PIR (Mbps)</label></td>
                            <td colspan="2"><label class="tmLabel">CIR (Mbps)</label></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Tx</td>
                            <td>Rx</td>
                            <td>Tx</td>
                            <td>Rx</td>
                        </tr>
                        <tr>
                            <td><label class="dialogLabel">EF</label></td>
                            <td></td>
                            <td></td>
                            <td><input id="EFCIRTx" type="text" size="5" /></td>
                            <td><input id="EFCIRRx" type="text" size="5" /></td>
                        </tr>
                        <tr>
                            <td><label class="dialogLabel">AF</label></td>
                            <td><input id="AFPIRTx" type="text" size="5" /></td>
                            <td><input id="AFPIRRx" type="text" size="5" /></td>
                            <td><input id="AFCIRTx" type="text" size="5" /></td>
                            <td><input id="AFCIRRx" type="text" size="5" /></td>
                        </tr>
                        <tr>
                            <td><label class="dialogLabel">BE</label></td>
                            <td><input id="BEPIRTx" type="text" size="5" /></td>
                            <td><input id="BEPIRRx" type="text" size="5" /></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <hr>
                <br><label class="dialogLabel">Protection</label>
                <select id="protection" name="protection">
                    <option value="fast"><50ms</option>
                    <option value="slow">Re-route</option>
                    <option value="none">None</option>
                </select>
                <br><label class="dialogLabel">Latency</label>
                <input id="latency" type="text" name="latency" value="" size="20" /><p class="inline">(ms)</p>
                <br><label class="dialogLabel">Packet Loss</label>
                <input id="packetLoss" type="text" name="siteCountry" value="" size="20" /><p class="inline">(pkts/sec)</p>
                <hr>
                <br><label class="dialogLabel">Description</label>
                <textarea id="appDescription" name="appDescription" value="" rows="3" cols="40" ></textarea>
                <form name="appForm" method="POST"></form>
            </div>
            
            <!--EP Manager dialog-->
            <div id="epDialog" title="End-point Manager">
                <h4>General Information</h4>
                <br><label class="dialogLabel">End-point name</label>
                <input id="epName" type="text" size="40" />
                <br><label class="dialogLabel">Type</label>
                <select id="siteType" name="epType">
                    <option value="radio">BTS</option>
                    <option value="dc">Data Centre</option>
                    <option value="epc">EPC</option>
                    <option value="router">Router</option>
                    <option value="router">Printer</option>
                </select>
                <hr>
                <h4>Capability</h4>
                <br><label class="dialogLabel">VNF Capable:</label><span id="vnfCap">Yes</span>
                <br><label class="dialogLabel">FW:</label><span id="vnffw">N/A</span>
                <br><label class="dialogLabel">VR:</label><span id="vnfvr">N/A</span>
                <br><label class="dialogLabel">DCI:</label><span id="vnfdci">N/A</span>
                <br><label class="dialogLabel">Traffic Classifier:</label><span id="vnfclassifier">N/A</span>
                <br><label class="dialogLabel">Cloud Connect:</label><span id="vnfcloudconnect">N/A</span>
                <br><label class="dialogLabel">EPC:</label><span id="vnfepc">N/A</span>
                <hr>
                <h4>Usage</h4>
                <br><label class="dialogLabel">Use in service:</label>
                <input id="epName" type="text" size="40" />
                <form name="siteForm" method="POST"></form>
            </div>
            
            <?php include_once "common/dialogs.php"; ?>  
            
        </div>

        <!--Footer section-->
        <div class="footerDiv">
            <?php include_once "common/footer.php"; ?>
        </div>
            
    </body>
</html>