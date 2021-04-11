let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        displayCost();
    }
);

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: displayCost,
    });
});

function displayCost() {
    let selection = window.getSelection().toString();
    let number = parseInt(selection);
    let costPerMile = (1.0 / number) * 3.00;
    let costPerYear = costPerMile * 12000;
    alert(number + " MPG = $" + costPerMile.toFixed(2) + " per mile.\nThis is an annual cost of $" + costPerYear.toFixed(2));
}

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}