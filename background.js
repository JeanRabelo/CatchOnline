console.log(1);

chrome.action.onClicked.addListener(tab => {buttonClicked(tab)});

function buttonClicked(tab){
  console.log(2);
  let msg = {
    txt: 'hello'
  }
  chrome.tabs.sendMessage(tab.id, msg);
  console.log(3);
}
