console.log(4)
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){handleTriggerButton();}

function sendmessage(){
  console.log(16)
  var send = document.querySelector('[data-icon="send"]');
  console.log("send = ")
  console.log(send)
  if (send == null) {console.log("There's no message to send"); return}
  send.click();
}

function sendMessageWhenOnline(){
  console.log(12)
  var statusLocation = getStatusLocationCurrent();
  var status = statusLocation.querySelector('span[class$=" selectable-text copyable-text"]')
  console.log(13)
  if (status != null){
    console.log(14)
    console.log("status =")
    console.log(status) //só tá funcionando até aqui!!!
    console.log('status.title =')
    setTimeout(function (){
    console.log(status.title)
      if (status.title == 'online' || status.title.substr(-3) == '...') {
        console.log(15)
        sendmessage();
        removeWait(statusLocation);
      }
    }, 500)

  }
}


function getStatusLocationCurrent(){
  var statusLocation = document.querySelector('div[role="button"] > div > div > span[title][dir]:not([class$=" selectable-text copyable-text"])').parentElement.parentElement.parentElement;
  return statusLocation
}

function waitToSendCurrent(statusLocation){
  console.log(8)
  var status = statusLocation.querySelector('span[class$=" selectable-text copyable-text"]');
  if (status != null) {
    console.log(9)
    if (status.title == 'online'){
      console.log(10)
      sendmessage();
      return
    }
  }
  if (!statusLocation.hasAttribute('beingListened')){
    console.log(11)
    var attBeingListened = document.createAttribute('beingListened'); //room for improvement
    statusLocation.setAttributeNode(attBeingListened); //room for improvement
    statusLocation.addEventListener('DOMSubtreeModified', sendMessageWhenOnline)
  }
}

function handleTriggerButton(){
  console.log(5)
  var statusLocation = getStatusLocationCurrent();
  if (!statusLocation.hasAttribute('beingListened')){
    console.log(6)
    waitToSendCurrent(statusLocation)
    return
  }
  console.log(7)
  removeWait(statusLocation)
}

function removeWait(statusLocation){
  statusLocation.removeEventListener('DOMSubtreeModified', sendMessageWhenOnline)
  statusLocation.removeAttribute('beingListened')
}
