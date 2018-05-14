<!--dialogs-->

<!--Scripts for dialogs-->
<script src="js/dialogs.js"></script>

<!--HTML for dialogs-->
<div id="workingDialog" class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
    <div class="spinner inline"></div>
    <div class="ui-dialog-buttonset">
        <form name="workingForm" method="POST"></form>
    </div>
</div>

<div id="okDialog" title="Success!">
    <span class="info">i</span>
    <h2 id="okDialogNote" class="inline lighter">Message</h2>
    <p id="okDialogNoteSub"></p>
    <form name="okForm" method="POST">
    </form>
</div>

<div id="confirmDialog" title="Success!">
    <span class="warning">!</span>
    <h3 id="confirmMainText" class="inline lighter">Are you sure?</h3>
    <p id="confirmSubText">Subtext</p>
    <form name="confirmForm" method="POST">
    </form>
</div>

<div id="warningDialog" title="Configuration error">
    <span class="warning">!</span>
    <h2 class="inline lighter" id="warnDialogMainText"></h2>
    <p id="warnDialogSubText"></p>
    <form name="warningForm" method="POST">
    </form>
</div>