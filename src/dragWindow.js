export function initDragMainFrame() {
  const mainFrame = document.querySelector('#mainFrame');
  const mainFrameDrag = document.querySelector('#mainFrame .drag');
  dragElement(mainFrame, mainFrameDrag);
}

export function initDragPopupWindow() {
  if (document.querySelector('#popup')) {
    const popupFrame = document.querySelector('#popup .window');
    const popupFrameDrag = document.querySelector('#popup .window .drag');
    dragElement(popupFrame, popupFrameDrag);
  }
}

function dragElement(containerElement, dragElement) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  dragElement.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    e = e ? e : window.event;
    e.preventDefault();
    // get mouse position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener('mouseup', closeDragElement);
    // call a function whenever the cursor moves:
    document.addEventListener('mousemove', elementDrag);
  }

  function elementDrag(e) {
    e = e ? e : window.event;
    e.preventDefault();

    // calculate new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // // check if the element's new position would go out of bounds:
    // const newTop = frame.offsetTop - pos2;
    // const newLeft = frame.offsetLeft - pos1;
    // const rect = frame.getBoundingClientRect();
    // const viewportWidth = window.innerWidth;
    // const viewportHeight = window.innerHeight;

    // if (
    //   newTop >= 0 &&
    //   newTop <= viewportHeight - rect.height &&
    //   newLeft >= 0 &&
    //   newLeft <= viewportWidth - rect.width
    // ) {
    //   // set the element's new position:
    //   frame.style.top = frame.offsetTop - pos2 + 'px';
    //   frame.style.left = frame.offsetLeft - pos1 + 'px';
    // }

    // set the element's new position:
    containerElement.style.top = containerElement.offsetTop - pos2 + 'px';
    containerElement.style.left = containerElement.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    // stop moving when mouse is released:
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
  }
}
