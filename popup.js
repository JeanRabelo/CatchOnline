function sendmessage(){
  var send = document.querySelector('[data-icon="send"]');
  if (send == null) {console.log("There's no message to send"); return}
  send.click();
}

function sendMessageWhenOnline(){
  setTimeout(function(){
    var statusLocation = getStatusLocationCurrent()
    var status = statusLocation.querySelector('span[class$=" selectable-text copyable-text"]')
    if (status != null){
      if (status.title == 'online' || status.title.substr(-3) == '...') {
        sendmessage()
        removeWait()
      }
    }
  }, 1000)
}

function getStatusLocationCurrent(){
  var statusLocation = document.querySelector('div[role="button"] > div > div > span[title][dir]:not([class$=" selectable-text copyable-text"])').parentElement.parentElement.parentElement
  return statusLocation
}

function waitToSendCurrent(){
  console.log("tá rodando aqui")
  var statusLocation = getStatusLocationCurrent()
  var status = statusLocation.querySelector('span[class$=" selectable-text copyable-text"]')
  if (status != null) {
    if (status.title == 'online'){
      sendmessage()
      return
    }
  }
  statusLocation.addEventListener('DOMSubtreeModified', sendMessageWhenOnline)
}

function removeWait(){
  var statusLocation = getStatusLocationCurrent()
  statusLocation.removeEventListener('DOMSubtreeModified', sendMessageWhenOnline)
}

// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }


document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('trigger');
    button.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(activeTab){
        chrome.scripting.executeScript(
          // activeTabs[0].id, {code: 'console.log("hello world")'}
          {
            target: {tabId: activeTab[0].id},
            files: ['hello_world.js'],
          }
          // ,() => { ... }
        )
      })
    });
    // chrome.tabs.executeScript({code:"cheguei aqui!"});
});
