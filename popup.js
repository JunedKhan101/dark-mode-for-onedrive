document.addEventListener('DOMContentLoaded', function() {
    console.log("Inside DOMContentLoaded");
    var toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', function() {
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(function(tab) {
                chrome.tabs.sendMessage(tab.id, { toggleDarkMode: true });
            });
        });
    });
});
