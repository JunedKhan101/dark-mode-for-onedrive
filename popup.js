// popup.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("Inside DOMContentLoaded");
    var toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {toggleDarkMode: true});
            console.log("Inside toggleButton event listener");
        });
    });
});
