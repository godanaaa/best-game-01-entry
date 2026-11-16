export const ACTION_CONFIRM = 1, ACTION_PAUSE = 2, ACTION_MUTE = 4;
export function createInput(canvas) {
  const down = new Set(); let actions = 0, clicked = false, mouse = { x: 0, y: 0 };
  const keys = { Space: ACTION_CONFIRM, Enter: ACTION_CONFIRM, KeyP: ACTION_PAUSE, Escape: ACTION_PAUSE, KeyM: ACTION_MUTE };
  window.addEventListener('keydown', e => { if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault(); down.add(e.code); if (!e.repeat) actions |= keys[e.code] || 0; });
  window.addEventListener('keyup', e => down.delete(e.code));
  canvas.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX-r.left, y:e.clientY-r.top }; });
  canvas.addEventListener('pointerdown', e => { const r=canvas.getBoundingClientRect(); mouse={x:e.clientX-r.left,y:e.clientY-r.top}; clicked=true; actions |= ACTION_CONFIRM; });
  return {
    movement() { let x = Number(down.has('KeyD') || down.has('ArrowRight')) - Number(down.has('KeyA') || down.has('ArrowLeft')); let y = Number(down.has('KeyS') || down.has('ArrowDown')) - Number(down.has('KeyW') || down.has('ArrowUp')); const n=Math.hypot(x,y)||1; return {x:x/n,y:y/n}; },
    takeActions() { const result=actions; actions=0; return result; },
    takeClick() { const result=clicked; clicked=false; return result ? {...mouse} : null; },
    choiceKey() { for (let i=0;i<3;i++) if (down.has(`Digit${i+1}`)) return i; return -1; },
    mouse: () => mouse
  };
}
