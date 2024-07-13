function applyDarkMode(darkModeEnabled) {
    var appRoot = document.getElementById("appRoot");
    var html = document.querySelector("html");
    var body = document.querySelector("body");
    if (darkModeEnabled) {
        if (appRoot) {
            var root = appRoot.querySelector('div[data-automationid="main-app-container"]');
            root.setAttribute("data-theme", "dark");
            appRoot.setAttribute("data-theme", "dark");
            applyStylesToElement(root, "dark");
        }
        html.setAttribute("data-theme", "dark");
        body.setAttribute("data-theme", "dark");
    } else {
        if (appRoot) {
            var root = appRoot.querySelector('div[data-automationid="main-app-container"]');
            root.setAttribute("data-theme", "light");
            appRoot.setAttribute("data-theme", "light");
            applyStylesToElement(root, "light");
        }
        html.setAttribute("data-theme", "light");
        body.setAttribute("data-theme", "light");
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
