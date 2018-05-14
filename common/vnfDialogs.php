<!--dialogs-->

<!--Scripts for dialogs-->
<script src="js/vnfDialogs.js"></script>

<!--App Classifier-->
<div class="configPanel" id="configClassifier" title="App Classifier Configuration">
    <form name="configAppClass" method="POST">
        <label class="dialogLabel lighter">Template</label>
        <select id="configVrType" name="configVrType">
            <option>Classifier Type 1</option>
            <option>Classifier 2</option>
            <option>Classifier 3</option>
        </select>
        <br><label class="dialogLabel lighter">Name</label>
        <input id="configVrName" type="text" name="configEpcName" value="Classifier_1" size="50" />
        <br><label class="dialogLabel lighter">Configuration</label>
        <input type="button" value="Configure..." class="blankButton" />
    </form>
</div>

<!--Cloud Connect-->
<div class="configPanel" id="configCloud" title="Cloud Connect">
    <form name="configCdn" method="POST">
        <div id="cloudProviders"></div>
        <hr>
        <label class="dialogLabel lighter">Cloud Provider</label>
        <select id="configVrType" name="configVrType">
            <option>Azure</option>
            <option>Amazon AWS</option>
            <option>Google</option>
        </select>
        <br><label class="dialogLabel lighter">Bandwidth (Mbps)</label>
        <input id="configVrName" type="text" name="configEpcName" value="50" size="30" />
    </form>
</div>

<!--DPI-->
<div class="configPanel" id="configDpi" title="DPI Configuration">
    <form name="configDpi" method="POST">
        <label class="dialogLabel lighter">Template</label>
        <select id="configVrType" name="configVrType">
            <option>DPI Type 1</option>
            <option>DPI Type 2</option>
            <option>DPI Type 3</option>
        </select>
        <br><label class="dialogLabel lighter">Name</label>
        <input id="configVrName" type="text" name="configEpcName" value="dpi_1" size="50" />
        <br><label class="dialogLabel lighter">Configuration</label>
        <input type="button" value="Configure..." class="blankButton" />
    </form>
</div>

<!--Firewall-->
<div class="configPanel" id="configFw" title="Firewall Configuration">
    <form name="configFwForm" method="POST">
        <label class="dialogLabel lighter">Template</label>
        <select id="configFwType" name="configFwType">
            <option>FW Type 1</option>
            <option>FW Type 2</option>
            <option>FW Type 3</option>
        </select>
        <br><label class="dialogLabel lighter">Name</label>
        <input id="configFwName" type="text" name="configFwName" value="Firewall_1" size="50" />
        <br><label class="dialogLabel lighter">Rule Set 1</label>
        <input type="button" value="Configure..." class="blankButton" />
        <br><label class="dialogLabel lighter">Rule Set 2</label>
        <input type="button" value="Configure..." class="blankButton" />
        <br><label class="dialogLabel lighter">Rule Set 3</label>
        <input type="button" value="Configure..." class="blankButton" />
        <br><label class="dialogLabel lighter">Notes</label>
        <input type="text" value="Configuration for Firewall_1" size="50" />
    </form>
</div>

<!--Virtual EPC-->
<div class="configPanel" id="configEpc" title="vEPC Configuration">
    <form name="configEpcForm" method="POST">
        <p class="loginError" id="configEpcError"></p>
        <label class="dialogLabel lighter">Template</label>
        <select id="configEpcType" name="configEpcType">
            <option>Type 1</option>
            <option>Type 2</option>
            <option>Type 3</option>
        </select>
        <br><label class="dialogLabel lighter">Name</label>
        <input id="configEpcName" type="text" name="configEpcName" value="" size="50" />
        <br><label class="dialogLabel lighter">Other 1</label>
        <input id="configEpcOther1" type="text" name="configEpcOther1" value="" size="50" />
        <br><label class="dialogLabel lighter">Other 2</label>
        <input id="configEpcOther2" type="text" name="configEpcOther2" value="" size="50" />
    </form>
</div>

<!--Virtual Router-->
<div class="configPanel" id="configVr" title="Virtual Router Configuration">
    <form name="configVrForm" method="POST">
        <label class="dialogLabel lighter">Template</label>
        <select id="configVrType" name="configVrType">
            <option>VR Type 1</option>
            <option>VR Type 2</option>
            <option>VR Type 3</option>
        </select>
        <br><label class="dialogLabel lighter">Name</label>
        <input id="configVrName" type="text" name="configEpcName" value="Virtual_router_1" size="50" />
        <br><label class="dialogLabel lighter">Configuration</label>
        <input type="button" value="Configure..." class="blankButton" />
    </form>
</div>