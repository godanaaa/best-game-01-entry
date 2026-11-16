export function stageShot(name,world){
  if(name==='start')return {screen:'title',best:0};
  if(name==='end'){world.player.time=222;world.player.kills=127;world.player.level=9;world.player.hp=0;world.player.bonus=4471;world.screen='over';return {screen:'over',best:4820};}
  if(name==='play'||name==='levelup'){
    world.reset(960,600);Object.assign(world.player,{time:90,kills:17,level:name==='levelup'?4:3,xp:name==='levelup'?8:3,xpNext:12,hp:4});world.screen='play';
    if(name==='levelup'){
      world.enemies.push(...[
        {id:1,type:'wisp',x:590,y:228,hp:1,maxHp:1,r:10,phase:1,shot:2},{id:2,type:'darter',x:365,y:190,hp:1,maxHp:1,r:9,phase:3,shot:2},{id:3,type:'brute',x:675,y:420,hp:7,maxHp:8,r:19,phase:2,shot:2},{id:4,type:'spitter',x:280,y:392,hp:3,maxHp:3,r:13,phase:4,shot:2},{id:5,type:'wisp',x:482,y:105,hp:1,maxHp:1,r:10,phase:0,shot:2}
      ]);world.embers.push({x:525,y:292,vx:280,vy:-80,damage:1,pierce:0,life:.6,hit:[]},{x:490,y:310,vx:-240,vy:-80,damage:1,pierce:0,life:.6,hit:[]});world.shards.push({x:455,y:345,vx:0,vy:0,value:1},{x:515,y:360,vx:0,vy:0,value:1},{x:535,y:285,vx:0,vy:0,value:1});world.particles.push({x:438,y:282,vx:20,vy:-13,life:.45,max:.65,color:'#ffb64f'},{x:440,y:286,vx:-22,vy:16,life:.35,max:.65,color:'#ffe081'});
    }else{
      world.enemies.push(...[
        {id:1,type:'wisp',x:505,y:250,hp:1,maxHp:1,r:10,phase:1,shot:2},{id:2,type:'darter',x:421,y:213,hp:1,maxHp:1,r:9,phase:3,shot:2},
        {id:3,type:'brute',x:610,y:365,hp:7,maxHp:8,r:19,phase:2,shot:2},{id:4,type:'spitter',x:350,y:365,hp:3,maxHp:3,r:13,phase:4,shot:2},
        {id:5,type:'wisp',x:548,y:312,hp:1,maxHp:1,r:10,phase:0,shot:2},{id:6,type:'darter',x:465,y:390,hp:1,maxHp:1,r:9,phase:2,shot:2},
        {id:7,type:'brute',x:382,y:265,hp:6,maxHp:8,r:19,phase:1,shot:2},{id:8,type:'spitter',x:588,y:220,hp:3,maxHp:3,r:13,phase:3,shot:2},
        {id:9,type:'wisp',x:440,y:170,hp:1,maxHp:1,r:10,phase:4,shot:2},{id:10,type:'darter',x:570,y:405,hp:1,maxHp:1,r:9,phase:0,shot:2},
        {id:11,type:'spitter',x:330,y:245,hp:2,maxHp:3,r:13,phase:2,shot:2}
      ]);
      world.embers.push(
        {x:492,y:286,vx:220,vy:-100,damage:1,pierce:0,life:.6,hit:[]},{x:474,y:300,vx:-190,vy:-150,damage:1,pierce:0,life:.6,hit:[]},
        {x:500,y:318,vx:200,vy:140,damage:1,pierce:0,life:.6,hit:[]},{x:465,y:330,vx:-220,vy:110,damage:1,pierce:0,life:.6,hit:[]},
        {x:480,y:270,vx:90,vy:-220,damage:1,pierce:0,life:.6,hit:[]},{x:455,y:310,vx:-80,vy:220,damage:1,pierce:0,life:.6,hit:[]},
        {x:490,y:340,vx:170,vy:-180,damage:1,pierce:0,life:.6,hit:[]}
      );
      world.shards.push(...[
        {x:440,y:350,vx:0,vy:0,value:1},{x:520,y:360,vx:0,vy:0,value:1},{x:535,y:285,vx:0,vy:0,value:1},
        {x:405,y:310,vx:0,vy:0,value:1},{x:555,y:335,vx:0,vy:0,value:1},{x:470,y:405,vx:0,vy:0,value:1},
        {x:385,y:345,vx:0,vy:0,value:1},{x:515,y:225,vx:0,vy:0,value:1},{x:430,y:235,vx:0,vy:0,value:1}
      ]);
      world.particles.push(...[
        {x:438,y:282,vx:20,vy:-13,life:.45,max:.65,color:'#ffb64f'},{x:440,y:286,vx:-22,vy:16,life:.35,max:.65,color:'#ffe081'},
        {x:518,y:265,vx:30,vy:-8,life:.4,max:.65,color:'#ff8c3b'},{x:526,y:270,vx:-14,vy:22,life:.32,max:.65,color:'#ffe081'},
        {x:407,y:310,vx:-12,vy:-19,life:.3,max:.65,color:'#c58cff'},{x:610,y:365,vx:18,vy:-24,life:.5,max:.65,color:'#ff9b4e'},
        {x:462,y:340,vx:-25,vy:-10,life:.28,max:.65,color:'#ffca62'}
      ]);
      world.player.upgrades.orbit=1;world.orbs.push({x:world.player.x+28,y:world.player.y-28});
    }
    if(name==='levelup'){world.player.xp=12;world.choice=[{id:'quick',name:'Quick Wick',effect:'Embers fire 25% faster.',max:4},{id:'orbit',name:'Orbiting Flame',effect:'Add a flame that burns nearby shadows.',max:3},{id:'heart',name:'Thick Wick',effect:'+1 max heart and heal 1 heart.',max:3}];world.screen='levelup';}
    return {screen:world.screen,best:0};
  }
  return {screen:'title',best:0};
}
