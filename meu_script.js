// setTimeout(function(){
//   console.log("inicio: escolher")
//   var my_number = document.querySelector('[title="+55 11 94230-1911"]').closest('._3OvU8');
//
//   function simulateMouseEvents(element, eventName) {
//   var mouseEvent= document.createEvent ('MouseEvents');
//   mouseEvent.initEvent (eventName, true, true);
//   element.dispatchEvent (mouseEvent);
// }
//
//   simulateMouseEvents(my_number, 'mousedown')
//   console.log("fim: escolher contato")
// }, 15000);//wait 15 seconds

var contact = 'Side'

function simulateMouseEvents(element, eventName) {
  var mouseEvent = document.createEvent ('MouseEvents');
  mouseEvent.initEvent (eventName, true, true);
  element.dispatchEvent (mouseEvent);
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

setTimeout(function(){
  console.log("inicio: send")

  var contact_in_list = document.querySelector(`[title="${contact}"]`).parentNode.parentNode.parentNode.parentNode
  simulateMouseEvents(contact_in_list, 'mousedown');

  setTimeout(function(){
    var send = document.querySelector('[data-icon="send"]');
    send.click();
    console.log("fim: send");
  }, 1000);//wait 1 second
}, 20000);//wait 20 seconds
