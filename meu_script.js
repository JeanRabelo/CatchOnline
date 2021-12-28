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

setTimeout(function(){
  console.log("inicio: send")
  var send = document.querySelector('[data-icon="send"]');
  // var send = document.querySelector('button._3HQNh._1Ae7k');
  console.log(send)

  function simulateMouseEvents(element, eventName) {
  var mouseEvent = document.createEvent ('MouseEvents');
  mouseEvent.initEvent (eventName, true, true);
  element.dispatchEvent (mouseEvent);
}

  simulateMouseEvents(send, 'mousedown')
  send.click();
  console.log("fim: send");
}, 15000);//wait 15 seconds
