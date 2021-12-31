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
        removeWait(statusLocation) //Only this one works
        console.log("after-use deactivation")
      }
    }
  }, 1000)
}


function getStatusLocationCurrent(){
  var statusLocation = document.querySelector('div[role="button"] > div > div > span[title][dir]:not([class$=" selectable-text copyable-text"])').parentElement.parentElement.parentElement
  return statusLocation
}

function waitToSendCurrent(statusLocation){
  var status = statusLocation.querySelector('span[class$=" selectable-text copyable-text"]')
  if (status != null) {
    if (status.title == 'online'){
      sendmessage()
      return
    }
  }
  if (!statusLocation.hasAttribute('beingListened')){
    // statusLocation.removeEventListener('DOMSubtreeModified', sendMessageWhenOnline)
    console.log("about to add an event listener")
    statusLocation.addEventListener('DOMSubtreeModified', sendMessageWhenOnline)
    var attBeingListened = document.createAttribute('beingListened'); //room for improvement
    statusLocation.setAttributeNode(attBeingListened); //room for improvement
  }
}

function handleTriggerButton(){
  setTimeout(function(){
    var statusLocation = getStatusLocationCurrent();
    if (!statusLocation.hasAttribute('beingListened')){
      waitToSendCurrent(statusLocation)
      console.log('trigger activated')
      return
    }
    removeWait(statusLocation) // Doesn't work
    console.log('manual deactivation')

  }, 1000)
}

function removeWait(statusLocation){
  statusLocation.removeEventListener('DOMSubtreeModified', sendMessageWhenOnline)
  statusLocation.removeAttribute('beingListened')
  console.log('trigger deactivated')
}

handleTriggerButton();
