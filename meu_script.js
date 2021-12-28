function define_contact_location(){
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

function send_message() {
  setTimeout(function(){
    console.log("inicio: send")
    let {contact_in_list, contact_in_chat} = define_contact_location()
    simulateMouseEvents(contact_in_list, 'mousedown');

    setTimeout(function(){
      var send = document.querySelector('[data-icon="send"]');
      send.click();
      console.log("fim: send");
    }, 1000);//wait 1 second
  }, 20000);//wait 20 seconds
}

function simulateMouseEvents(element, eventName) {
  var mouseEvent = document.createEvent ('MouseEvents');
  mouseEvent.initEvent (eventName, true, true);
  element.dispatchEvent (mouseEvent);
}

var contact = 'Side';
send_message()

let {contact_in_list, contact_in_chat} = define_contact_location();

let status = contact_in_chat.querySelector('[class$="selectable-text copyable-text"]');

if (status == null) {
  console.log('indeterminado')
} else {
  console.log(status.title)
}
