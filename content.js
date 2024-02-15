function handleFocus(event) {
  event.target.addEventListener("keydown", handleCtrlQKey, true);
  event.target.addEventListener('keydown', handleCtrlOneKey, true);
}

function handleCtrlQKey(event) {
  // Check if the pressed key is 'q' and Ctrl key is also pressed
  if (event.key === "q" && event.ctrlKey) {
    const selection = window.getSelection();

    // 드래그로 선택된 부분이 있으면, 그 부분에 tex적용
    if (selection.type === "Range") {
      let range = selection.getRangeAt(0);

      // 여러 줄 걸쳐있는 경우 한 줄로 합치기
      if (range.startContainer.parentNode !== range.endContainer.parentNode) {
        // 기존 range 범위
        let origStartContainer = range.startContainer;
        let origStartOffset = range.startOffset;

        // 합쳐서 첫번째 <p>에 삽입하기
        let tmpIndex = Array.prototype.indexOf.call(range.startContainer.parentNode.childNodes, range.startContainer);
        let tmpRange = new Range();
        tmpRange.setStart(range.startContainer, 0);
        tmpRange.setEnd(range.startContainer, range.startOffset);
        let selectedString = tmpRange.toString()+range.toString(); // 최종적으로 드래그되어야 할 부분

        // 마지막 <p>의 텍스트내용도 합치기
        tmpRange = new Range();
        tmpRange.selectNode(range.endContainer);
        tmpRange.setStart(range.endContainer, range.endOffset);
        range.startContainer.parentNode.childNodes[tmpIndex].nodeValue = selectedString + tmpRange.toString();
        console.log(selectedString + tmpRange.toString());

        // startIndex+1부터 endIndex child(<p>) 제거
        let grandparentNode = range.startContainer.parentNode.parentNode;
        let startIndex = Array.prototype.indexOf.call(grandparentNode.childNodes, range.startContainer.parentNode);
        let endIndex = Array.prototype.indexOf.call(grandparentNode.childNodes, range.endContainer.parentNode);
        let nodeRemoved = Array.from(grandparentNode.childNodes).slice(startIndex+1, endIndex+1);
        nodeRemoved.forEach((node) => grandparentNode.removeChild(node));

        // range 다시 선택
        range = new Range();
        range.selectNode(origStartContainer);
        range.setStart(origStartContainer, origStartOffset);
        range.setEnd(origStartContainer, selectedString.length);
      }

      let textNode = range.commonAncestorContainer;
      parent = textNode.parentNode;
      index = Array.prototype.indexOf.call(parent.childNodes, textNode);

      // tex 노드 획득
      let katexString = katex.renderToString(range.toString(), {
        throwOnError: false,
      });

      katexString =
        `<span class="ql-formula" data-latex="${range.toString()}" data-display="inline" contenteditable="false">&#xFEFF<span contenteditable="false">` +
        katexString +
        `</span>&#xFEFF</span>`;
      
      let katexNode = new DOMParser().parseFromString(katexString, 'text/html').body.childNodes[0]

      // 드래그한 부분 기준으로 자르기
      let prefixRange = new Range();
      let postfixRange = new Range();

      prefixRange.selectNode(textNode);
      prefixRange.setEnd(range.startContainer, range.startOffset);
      let prefix = prefixRange.toString();

      postfixRange.selectNode(textNode);
      postfixRange.setStart(range.endContainer, range.endOffset);
      let postfix = postfixRange.toString();

      // 드래그한 부분이 포함된 <p></p>를 대체하기
      let nextNode = parent.childNodes[index+1];
      // 현재 textNode가 마지막 노드일 경우
      if (nextNode === undefined) {
        parent.childNodes[index].nodeValue = prefix.toString();
        parent.appendChild(katexNode);
        parent.appendChild(document.createTextNode(postfix.toString()));  
      }
      // 현재 textNode 뒤에 다른 노드가 있는 경우
      else {
        parent.childNodes[index].nodeValue = prefix.toString();
        parent.insertBefore(katexNode, nextNode);
        parent.insertBefore(document.createTextNode(postfix.toString()), nextNode);
      }

    } else {
      // 모든 요소를 가져오기
      var elements = document.querySelectorAll(
        ".design-btn.gray.formula-style"
      );

      // 요소 중에서 마지막 요소 가져오기
      var lastElement = elements[elements.length - 1];

      // 마지막 요소를 클릭하기
      lastElement.click();

      // click 이후 textarea 태그에 포커스 주기
      var textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.focus();
        textarea.addEventListener("keydown", handleEnterKey, true);
      }
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
    }
  }
}

function handleEnterKey(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    document.querySelectorAll(".sc-ilxdoh.sc-jIBmdK.llFnia.fvtotj")[0].click();
  }
}

// focus 이벤트를 감지하여 handleFocus 함수 호출
document.addEventListener("focus", handleFocus, true);
