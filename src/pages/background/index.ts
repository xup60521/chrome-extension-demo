console.log("background script loaded");

chrome.runtime.onInstalled.addListener(() => {
    // Create the context menu
    chrome.contextMenus.create({
        id: "saveText",
        title: "Save to Extension",
        contexts: ["selection"], // Only show the menu when text is selected
    });
});

// Add a listener for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveText" && info.selectionText) {
        // Save the selected text to chrome.storage
        chrome.storage.sync.set({ savedText: info.selectionText }, () => {
            console.log("Text saved:", info.selectionText);
        });
    }
});
