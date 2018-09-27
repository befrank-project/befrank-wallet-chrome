/*
 * JavaScript for opening a new Send tab when a BeFrank URI is clicked.
 */
var send_href;

// Listen for a payment request to open a tab to send BeFrank to a BeFrank URI
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "BeFrank befrank-wallet-rpc Payment Request") {
    send_href = request.href;
    var send_tab = chrome.tabs.create({url: '/data/html/send.html'});
    sendResponse("Payment Request Received.");
  } else if (request.greeting == "BeFrank befrank-wallet-rpc Fill Send Page" &&
      sender.tab.url === "chrome-extension://" + chrome.runtime.id + "/data/html/send.html") {
    sendResponse(send_href);
    deleteProperties(send_href);
  }
});
