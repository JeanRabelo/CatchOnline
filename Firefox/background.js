chrome.browserAction.onClicked.addListener(tab => {buttonClicked(tab)});

function buttonClicked(tab){
  let msg = {
    txt: 'hello'
  }
  chrome.tabs.sendMessage(tab.id, msg);
}
