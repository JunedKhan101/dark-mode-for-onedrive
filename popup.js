document.addEventListener('DOMContentLoaded', () => {
    console.log("Inside DOMContentLoaded");
    var toggleButton = document.getElementById('toggleButton');
    chrome.storage.local.get('darkModeStatus', (data) => {
        var darkModeStatus = data.darkModeStatus;
        toggleButton.checked = darkModeStatus === true;
    });
    toggleButton.addEventListener('change', function(event) {
        var isChecked = event.target.checked;
        console.log("isChecked: ", isChecked);
        toggleButton.checked = isChecked;
        chrome.storage.local.set({ darkModeStatus: isChecked });
        chrome.tabs.query({ url: "https://onedrive.live.com/*" }, (tabs) => {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, { darkModeStatus: isChecked });
            });
        });
    });
});
