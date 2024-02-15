function handleFocus(event) {
    event.target.addEventListener('keydown', handleCtrlQKey, true);
    event.target.addEventListener('keydown', handleCtrlOneKey, true);
}

function handleFocusOut(event) {
  event.target.removeEventListener('keydown', handleCtrlQKey, true);
  event.target.removeEventListener('keydown', handleCtrlOneKey, true);
}

var enterKeyEvent = new KeyboardEvent('keydown', {
  key: 'Enter',
  code: 'Enter',
  keyCode: 13,
  which: 13,
  bubbles: true,
  cancelable: true,
});

function handleCtrlQKey(event) {
    if (event.key === 'q' && event.ctrlKey) {
      // 모든 요소를 가져오기
      var elements = document.querySelectorAll('.design-btn.gray.formula-style');
  
      // 요소 중에서 마지막 요소 가져오기
      var lastElement = elements[elements.length - 1];
  
      // 마지막 요소를 클릭하기
      lastElement.click();

      // click 이후 textarea 태그에 포커스 주기
      var textarea = document.querySelector('textarea');
      var upTextArea = document.querySelector('.sc-cCzKKE.beVPtE');
      if (textarea) {
          textarea.focus();
          textarea.addEventListener('keydown',handleEnterKey,true)
          textarea.addEventListener('keydown',handleEscKey,true)
      }
      if (upTextArea) {
        upTextArea.addEventListener('keydown',handleEnterKey,true)
        upTextArea.addEventListener('keydown',handleEscKey,true)
      }
    }
  }
  function handleCtrlOneKey(event) {
    // Check if the pressed key is 'm' and Ctrl key is also pressed
    if (event.key === '1' && event.ctrlKey) {
      event.preventDefault();
      // 모든 요소를 가져오기
      var elements = document.querySelectorAll('.design-btn.gray.formula-style');
  
      console.dir(elements);
      // 요소 중에서 처음 요소 가져오기
      var firstElement = elements[1];
  
      // 처음 요소를 클릭하기
      firstElement.click();

      // click 이후 textarea 태그에 포커스 주기
      var textarea = document.querySelector('textarea');
      if (textarea) {
          textarea.focus();
          textarea.addEventListener('keydown',handleEnterKey,true)
          textarea.addEventListener('keydown',handleEscKey,true)
      }
    }
  }

  function handleEnterKey(event){
    if(event.key === 'Enter' && !event.shiftKey){
      event.preventDefault();
      document.querySelectorAll('.sc-ilxdoh.sc-jIBmdK.llFnia.fvtotj')[0].click();
    }
    if(event.key === 'Enter' && event.shiftKey){
      document.querySelectorAll('.sc-ilxdoh.sc-jIBmdK.llFnia.fvtotj')[0].dispatchEvent(enterKeyEvent);
    }
  }

  function handleEscKey(event){
    if(event.key === 'Escape' && !event.shiftKey){
        event.preventDefault();
        document.querySelectorAll('.sc-ilxdoh.llFnia')[0].click();
    }
  }

document.addEventListener('focus', handleFocus, true);
document.addEventListener('blur', handleFocusOut, true);