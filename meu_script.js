function get_contact_locations(contact){
  var all_contact_occurrences = document.querySelectorAll(`[title="${contact}"]`)
  var contact_in_list, contact_in_chat

  all_contact_occurrences.forEach(function(contact_occurrence){
      if (contact_occurrence.parentNode.tagName == 'SPAN') {
        contact_in_list = contact_occurrence.parentNode.parentNode.parentNode.parentNode;
      } else if (contact_occurrence.parentNode.tagName == 'DIV') {
        contact_in_chat = contact_occurrence.parentNode.parentNode.parentNode;
      }
    })
    return {
        contact_in_list,
        contact_in_chat
    };
}

function simulateMouseEvents(element, eventName) {
  var mouseEvent = document.createEvent ('MouseEvents');
  mouseEvent.initEvent (eventName, true, true);
  element.dispatchEvent (mouseEvent);
}

function clickOnContact(contact){
  let {contact_in_list, contact_in_chat} = get_contact_locations(contact);
  simulateMouseEvents(contact_in_list, 'mousedown');
}

function getStatus(contact) {
  let {contact_in_list, contact_in_chat} = get_contact_locations(contact);
  let statusElement = contact_in_chat.querySelector('[class$="selectable-text copyable-text"]');
  var status
  if (statusElement == null) {
    status = 'undefined'
  } else if (statusElement.title == 'online') {
    status = 'online'
  } else {
    status = 'offline'
  }
  return status
}

function send_message() {
  var send = document.querySelector('[data-icon="send"]');
  send.click();
}

setTimeout(function(){
  var contact = 'Side';
  clickOnContact(contact)
  setTimeout(function(){
    var status = getStatus(contact)

    if (status == 'online') {
      send_message()
    } else {
      console.log('Ainda não está online')
    }
  }, 2000);//wait 2 seconds
}, 20000);//wait 20 seconds
