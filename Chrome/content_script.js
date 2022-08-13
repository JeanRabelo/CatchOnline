chrome.runtime.onMessage.addListener(handleTriggerButton);

function getStatusLocationCurrent(){
  var statusLocation = document.querySelector('div[role="button"] > div > div > span[title][dir]:not([class$=" selectable-text copyable-text"])').parentElement.parentElement.parentElement;
  return statusLocation
}

function sendmessage(){
  var send = document.querySelector('[data-icon="send"]');
  if (send == null) {console.log("There's no message to send"); return}
  send.click();
}

function sendMessageWhenOnline(){
  var statusLocation = getStatusLocationCurrent();
  var status = statusLocation.querySelector('span[class$=" selectable-text copyable-text"]');
  if (status != null){
    setTimeout(function (){
      if (status.title == 'online' || status.title.substr(-3) == '...') {
        sendmessage();
        removeWait(statusLocation);
      }
    }, 500)
  }
}

function waitToSendCurrent(statusLocation){
  var status = statusLocation.querySelector('span[class$=" selectable-text copyable-text"]');
  if (status != null) {
    if (status.title == 'online'){
      sendmessage();
      return
    }
  }
  if (!statusLocation.hasAttribute('beingListened')){
    var attBeingListened = document.createAttribute('beingListened');
    statusLocation.setAttributeNode(attBeingListened);
    statusLocation.addEventListener('DOMSubtreeModified', sendMessageWhenOnline);
  }
}

function handleTriggerButton(){
  var statusLocation = getStatusLocationCurrent();
  if (!statusLocation.hasAttribute('beingListened')){
    waitToSendCurrent(statusLocation);
    return
  }
  removeWait(statusLocation);
}

function removeWait(statusLocation){
  statusLocation.removeEventListener('DOMSubtreeModified', sendMessageWhenOnline);
  statusLocation.removeAttribute('beingListened');
}
