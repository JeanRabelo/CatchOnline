// function get_contact_locations(contact){
//   var all_contact_occurrences = document.querySelectorAll(`[title="${contact}"]`)
//   var contact_in_list, contact_in_chat
//
//   all_contact_occurrences.forEach(function(contact_occurrence){
//       if (contact_occurrence.parentNode.tagName == 'SPAN') {
//         contact_in_list = contact_occurrence.parentNode.parentNode.parentNode.parentNode;
//       } else if (contact_occurrence.parentNode.tagName == 'DIV') {
//         contact_in_chat = contact_occurrence.parentNode.parentNode.parentNode;
//       }
//     })
//     return {
//         contact_in_list,
//         contact_in_chat
//     };
// }
//
// function simulateMouseEvents(element, eventName) {
//   var mouseEvent = document.createEvent ('MouseEvents');
//   mouseEvent.initEvent (eventName, true, true);
//   element.dispatchEvent (mouseEvent);
// }
//
// function clickOnContact(contact){
//   let {contact_in_list, contact_in_chat} = get_contact_locations(contact);
//   simulateMouseEvents(contact_in_list, 'mousedown');
// }
//
// function getStatus(contact) {
//   let {contact_in_list, contact_in_chat} = get_contact_locations(contact);
//   let statusElement = contact_in_chat.querySelector('[class$="selectable-text copyable-text"]');
//   return statusElement
// }


// function waitToSend(contact){
//   var status
//   status = getStatus(contact);
//   status.addEventListener('DOMSubtreeModified', a=>{
//     setTimeout(function(){
//       if (status.title == 'online' || status.title.substr(-3) == '...') {
//         send_message();
//       }
//     }, 1000)
//   })
// }

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
