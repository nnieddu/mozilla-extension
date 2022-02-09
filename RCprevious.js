/*
Called when the item has been created, or when error (just log the error).
*/
function onCreated() {
    if (browser.runtime.lastError) {
      console.log(`Error: ${browser.runtime.lastError}`);
    } else {
      console.log("Item created successfully");
    }
  }
  
  /*
  Called when there was an error (just log the error).
  */
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  /*
  Create the context menu item.
  */
 browser.menus.create({
     id: "separator-1",
     type: "separator",
     contexts: ["all"]
    }, onCreated);
    
    browser.menus.create({
      id: "log-selection",
      title: browser.i18n.getMessage("menuItemSelectionLogger"),
      contexts: ["selection"]
    }, onCreated);
    
  browser.menus.create({
    id: "separator-2",
    type: "separator",
    contexts: ["all"]
  }, onCreated);
  
  var checkedState = true;
  
  browser.menus.create({
    id: "check-uncheck",
    type: "checkbox",
    title: browser.i18n.getMessage("menuItemUncheckMe"),
    contexts: ["all"],
    checked: checkedState
  }, onCreated);
  
  browser.menus.create({
    id: "open-sidebar",
    title: browser.i18n.getMessage("menuItemOpenSidebar"),
    contexts: ["all"],
    command: "_execute_sidebar_action"
  }, onCreated);
  
  browser.menus.create({
    id: "tools-menu",
    title: browser.i18n.getMessage("menuItemToolsMenu"),
    contexts: ["tools_menu"],
  }, onCreated);
  
  /*
  Set a colored border on the document in the given tab.
  Note that this only work on normal web pages, not special pages
  like about:debugging.
  var blue = 'document.body.style.border = "5px solid blue"';
  var green = 'document.body.style.border = "5px solid green"';
  
  function borderify(tabId, color) {
      browser.tabs.executeScript(tabId, {
          code: color
        });
    }
*/
    
  /*
  Toggle checkedState, and update the menu item's title
  appropriately.
  Note that we should not have to maintain checkedState independently like
  this, but have to because Firefox does not currently pass the "checked"
  property into the event listener.
  */
  function updateCheckUncheck() {
    checkedState = !checkedState;
    if (checkedState) {
      browser.menus.update("check-uncheck", {
        title: browser.i18n.getMessage("menuItemUncheckMe"),
      });
    } else {
      browser.menus.update("check-uncheck", {
        title: browser.i18n.getMessage("menuItemCheckMe"),
      });
    }
  }
  
  /*
  The click event listener, where we perform the appropriate action given the
  ID of the menu item that was clicked.
  */
  browser.menus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case "log-selection":
        console.log(info.selectionText);
        break;
      case "check-uncheck":
        updateCheckUncheck();
        break;
      case "open-sidebar":
        console.log("Opening my sidebar");
        break;
      case "tools-menu":
        console.log("Clicked the tools menu item");
        break;
    }
  });