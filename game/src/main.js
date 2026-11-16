import { STEP } from './config.js';
import { createRandom } from './random.js';
import { createAudio } from './audio.js';
import { createInput, ACTION_CONFIRM, ACTION_PAUSE, ACTION_MUTE } from './input.js';
import { createWorld, EVENT_HIT, EVENT_OVER, EVENT_LEVELUP } from './world.js';
import { createRenderer } from './render.js';
import { stageShot } from './shots.js';

const canvas=document.querySelector('#game'),status=document.querySelector('#status');
const params=new URLSearchParams(location.search),seed=params.has('seed')?Number(params.get('seed')):Math.floor(Math.random()*0xffffffff);
const random=createRandom(seed),world=createWorld(random),renderer=createRenderer(canvas),input=createInput(canvas),audio=createAudio();
let best=0;try{best=Number(localStorage.getItem('emberhold-best'))||0;}catch{}
let announced='';function announce(message){if(message!==announced){status.textContent=message;announced=message;}}
function syncSize(){const s=renderer.size;world.setSize(s.width,s.height);}
function saveBest(score){if(score>best){best=score;try{localStorage.setItem('emberhold-best',String(best));}catch{}}}
const shot=params.get('shot');
if(shot){const staged=stageShot(shot,world);renderer.render(world,staged.screen,{best:staged.best});requestAnimationFrame(()=>requestAnimationFrame(()=>{renderer.render(world,staged.screen,{best:staged.best});window.__shotReady=true;}));}
else {
  let previous=performance.now(),accumulator=0;
  function loop(now){const elapsed=Math.min(.1,(now-previous)/1000);previous=now;accumulator+=elapsed;syncSize();const actions=input.takeActions(),click=input.takeClick();
    if(actions&ACTION_MUTE){audio.muted=!audio.muted;announce(audio.muted?'Sound muted':'Sound on');}
    if(world.screen==='title'&&(actions&ACTION_CONFIRM)){audio.unlock();audio.click();world.reset(renderer.size.width,renderer.size.height);world.screen='play';announce('The glade is under attack.');}
    else if(world.screen==='over'&&(actions&ACTION_CONFIRM)){audio.unlock();audio.click();world.reset(renderer.size.width,renderer.size.height);world.screen='play';announce('The glade is under attack.');}
    else if(world.screen==='play'&&(actions&ACTION_PAUSE)){world.screen='paused';announce('Paused');}
    else if(world.screen==='paused'&&(actions&ACTION_PAUSE||actions&ACTION_CONFIRM)){world.screen='play';announce('The glade is under attack.');}
    else if(world.screen==='levelup'){
      let choice=input.choiceKey();
      if(click){const cw=Math.min(250,renderer.size.width*.27),gap=17,total=cw*3+gap*2,x0=(renderer.size.width-total)/2,y=renderer.size.height*.41;if(click.y>=y&&click.y<=y+205)for(let i=0;i<3;i++)if(click.x>=x0+i*(cw+gap)&&click.x<=x0+i*(cw+gap)+cw)choice=i;}
      if(choice>=0&&world.takeUpgrade(choice)){audio.click();announce('Upgrade chosen.');}
    }
    if(world.screen==='title'&&click){audio.unlock();audio.click();world.reset(renderer.size.width,renderer.size.height);world.screen='play';announce('The glade is under attack.');}
    else if(world.screen==='over'&&click){audio.unlock();world.reset(renderer.size.width,renderer.size.height);world.screen='play';announce('The glade is under attack.');}
    while(accumulator>=STEP){if(world.screen==='play'){
      const before=world.events;world.step(STEP,input.movement());
      if(world._shoot){audio.shoot();world._shoot=false;}if(world._pickup){audio.pickup(world._pickup);world._pickup=0;}
      if(world.events&EVENT_HIT)audio.hurt();if(world.events&EVENT_LEVELUP){audio.levelup();announce('Level up. Choose an upgrade.');}
      if(world.events&EVENT_OVER){audio.gameover();const score=Math.floor(world.player.kills+world.player.time+(world.player.bonus||0));saveBest(score);announce(`The light has gone out. Score ${score}.`);}
      void before;
    }accumulator-=STEP;}
    const score=Math.floor(world.player.kills+world.player.time+(world.player.bonus||0));if(world.screen==='over')saveBest(score);
    renderer.render(world,world.screen,{best});requestAnimationFrame(loop);
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&world.screen==='play'){world.screen='paused';announce('Paused because the tab is hidden.');}});
  window.addEventListener('resize',syncSize);announce('EMBERHOLD. Press Space or click to begin.');requestAnimationFrame(loop);
}
