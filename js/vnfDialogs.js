// Utility functions

function setupConfigDialogs()
{    
    $("#configClassifier").dialog({
    autoOpen: false,
    height: 'auto',
    width: 'auto',
    show: 'fade',
    hide: 'fade',
    title: 'App Classifier',
    modal: true,
    buttons: {
      'Save': function ()
      {
        $(this).dialog('close');
      },
      'Cancel': function ()
      {
        $(this).dialog('close');
      }
    }
    });
    $("#configCloud").dialog({
    autoOpen: false,
    height: 'auto',
    width: 'auto',
    show: 'fade',
    hide: 'fade',
    title: 'App Cloud Connect',
    modal: true,
    buttons: {
      'Save': function ()
      {
        $(this).dialog('close');
      },
      'Cancel': function ()
      {
        $(this).dialog('close');
      }
    }
    });
    $("#configDpi").dialog({
    autoOpen: false,
    height: 'auto',
    width: 'auto',
    show: 'fade',
    hide: 'fade',
    title: 'App DPI',
    modal: true,
    buttons: {
      'Save': function ()
      {
        $(this).dialog('close');
      },
      'Cancel': function ()
      {
        $(this).dialog('close');
      }
    }
    });
    $("#configFw").dialog({
    autoOpen: false,
    height: 'auto',
    width: 'auto',
    show: 'fade',
    hide: 'fade',
    title: 'Firewall',
    modal: true,
    buttons: {
      'Save': function ()
      {
        $(this).dialog('close');
      },
      'Cancel': function ()
      {
        $(this).dialog('close');
      }
    }
    });
    $("#configEpc").dialog({
    autoOpen: false,
    height: 'auto',
    width: 'auto',
    show: 'fade',
    hide: 'fade',
    title: 'Virtual EPC',
    modal: true,
    buttons: {
      'Save': function ()
      {
        $(this).dialog('close');
      },
      'Cancel': function ()
      {
        $(this).dialog('close');
      }
    }
    });
    $("#configVr").dialog({
    autoOpen: false,
    height: 'auto',
    width: 'auto',
    show: 'fade',
    hide: 'fade',
    title: 'Virtual Router',
    modal: true,
    buttons: {
      'Save': function ()
      {
        $(this).dialog('close');
      },
      'Cancel': function ()
      {
        $(this).dialog('close');
      }
    }
    });
}

