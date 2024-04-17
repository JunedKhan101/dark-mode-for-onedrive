// content.js
function toggleDarkMode() {
    // var appRoot = document.getElementById("appRoot");
    var root = appRoot.querySelector('#appRoot > div[data-automationid="main-app-container"]');
    if (root.hasAttribute("data-theme")) {
        var currentTheme = root.getAttribute('data-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        root.setAttribute("data-theme", newTheme);
    }
    else {
        root.setAttribute("data-theme", "dark");
    }
}
chrome.runtime.onMessage.addListener(function(message) {
    if (message.toggleDarkMode) {
        toggleDarkMode();
        applyStylesToElement();
    }
});
function applyStylesToElement() {
    var element = appRoot.querySelector('#appRoot > div[data-automationid="main-app-container"]');
    var theme = element.getAttribute("data-theme");
    element.classList.remove("dark-theme", "light-theme");
    if (theme === "dark") {
        element.classList.add("dark-theme");
    }
    else {
        element.classList.add("light-theme");
    }
}
// MutationObserver to watch for changes in the DOM
// var observer = new MutationObserver(function(mutationsList, observer) {
//     for(var mutation of mutationsList) {
//         if (mutation.attributeName) // we'll assume it's "style"
//             parseNode(mutation.target);
//     }
// });
// observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
