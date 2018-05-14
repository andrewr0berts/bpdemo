// Utility functions

function workingDialog()
{
    $("#workingDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'working....',
        buttons: {
          'Close' : function () {
            $(this).dialog('close');
            }
        }
    } );
    $("#workingDialog").removeClass('');
}

function okDialog()
{
    $("#okDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'OK!',
        buttons: {
          'OK' : function () {
            $(this).dialog('close');
            }
        }
    } );
}

function confirmDialog()
{
    $("#confirmDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'Confirm',
        buttons: {
          'OK' : function () {
            $(this).dialog('close');
            }
        }
    } );
}

function warningDialog()
{
    $("#warningDialog").dialog(
    {
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        show: 'fade',
        hide: 'fade',
        title: 'Warning',
        buttons: {
          'OK' : function () {
            $(this).dialog('close');
            }
        }
    } );
}

function warn(mainText, subText)
{
    $("#warnDialogMainText").html(mainText);
    $("#warnDialogSubText").html(subText);
    $("#warningDialog").dialog('open');
}

function showOk(okDialogNote, okDialogNoteSub)
{
    $("#okDialogNote").html(okDialogNote);
    $("#okDialogNoteSub").html(okDialogNoteSub);
    
    $("#okDialog").dialog('open');
}

function setupDialogs()
{
    okDialog();
    warningDialog();
    workingDialog();
    confirmDialog();
}

function showOKDialog(message)
{
    $("#okDialogNote").val(message);
    $("#okDialogNote").dialog('open');
}