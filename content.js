function applyDarkMode(darkModeEnabled) {
    var appRoot = document.getElementById("appRoot");
    if (!appRoot) {
        console.error("No app root found");
        return;
    }
    var root = appRoot.querySelector('div[data-automationid="main-app-container"]');
    if (!root) {
        console.error("Main app container not found");
        return;
    }
    if (darkModeEnabled) {
        root.setAttribute("data-theme", "dark");
        applyStylesToElement(root, "dark");
    } else {
        root.setAttribute("data-theme", "light");
        applyStylesToElement(root, "light");
    }
    chrome.storage.local.set({ darkModeStatus: darkModeEnabled });
}

function applyStylesToElement(root, theme) {
    root.classList.remove("dark-theme", "light-theme");
    if (theme === "dark") {
        root.classList.add("dark-theme");
    } else {
        root.classList.add("light-theme");
    }
}
chrome.runtime.onMessage.addListener((message) => {
    console.log("Message received:", message);
    if (typeof message.darkModeStatus !== 'undefined') {
        applyDarkMode(message.darkModeStatus);
    }
});
chrome.storage.local.get('darkModeStatus', (data) => {
    var darkModeStatus = data.darkModeStatus;
    if (typeof darkModeStatus !== 'undefined') {
        applyDarkMode(darkModeStatus);
    }
});
