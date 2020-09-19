// https://css-tricks.com/snippets/javascript/javascript-keycodes/
export enum keyCodes  {
    ARROWUP = 38, // e.which
    ARROWRIGHT = 39,
    ARROWLEFT = 37,
    ARROWDOWN = 40, // e.which
    TAB = 9,
    ENTER = 13,
    ESCAPE = 27,
    BACKSPACE = 8,
    DELETE = 46,
    LEFT = 37,
    UP= 38,
    RIGHT = 39,
    COPY = 67,
    CUT = 88,
    PASTE = 86
}
export enum MouseEvent {
    MOUSEMOVE = 'mousemove',
    MOUSEUP = 'mouseup',
    MOUSEOVER = 'mouseover',
    MOUSEOUT = 'mouseout',
    RESIZE = 'resize'
}
export enum shiftKey  {
    left,
    right
}
export enum Key  {
    ARROWUP = 'ArrowUp',
    ARROWDOWN = 'ArrowDown',
    ARROWLEFT = 'ArrowLeft',
    ARROWRIGHT = 'ArrowRight',
    TAB = 'Tab',
    DELETE  = 'Delete',
    ESCAPE = 'Escape',
    ENTER = 'Enter',
    COPY = 'c',
    PASTE = 'v',
    BACKSPACE = 'Backspace',
    F2 = 'F2',
    UP = 'up'
}

export enum equationKeys {
    EQUAL = 61,
    SUBTRACT = 45,
    ADD = 43,
}

export enum KeyAction  {
    cellEdit,
    cancelCellEdit,
    saveCellEdit,
    copyCell,
    pasteCell,
    keyUp,
    keyDown
}

export enum CellMove {
    left,
    right,
    up,
    down
}

export function moveCell(dir: CellMove) {
    return true
}

export function isKeyDownPrintable(e:any) {
  return !e.metaKey && !e.ctrlKey && e.key.length === 1
}

export function getKeyAction(e:any, editingCell?: boolean): KeyAction[] | null {
   if (e.key === Key.TAB) {
    if (editingCell) {
      return [KeyAction.saveCellEdit];
    }
    if (e.shiftKey) {
      if (moveCell(CellMove.left)) {
        e.preventDefault()
      }
    } else {
      if (moveCell(CellMove.right)) {
        e.preventDefault()
      }
    }
  } else if (e.key === Key.ESCAPE) {
    e.preventDefault()
    if (editingCell) {
        return [KeyAction.cancelCellEdit]
    }
  } else if (e.key === Key.ENTER) {
    e.preventDefault();
    return [KeyAction.saveCellEdit, e.shiftKey? KeyAction.keyUp : KeyAction.keyDown]
  } else if (e.key === Key.COPY && (e.metaKey || e.ctrlKey)) {
    return [KeyAction.copyCell]
  } else if (e.key === Key.PASTE && (e.metaKey || e.ctrlKey)) {
    return [KeyAction.pasteCell]
  } else if (isKeyDownPrintable(e)) {
    return [KeyAction.cellEdit]
  } else if (e.key === Key.BACKSPACE || e.key === Key.DELETE) {
    return [KeyAction.cellEdit]
  } else if (e.key === Key.F2 || (e.key === 'u' && e.ctrlKey)) {
    return [KeyAction.cellEdit]
  }
  return null
}