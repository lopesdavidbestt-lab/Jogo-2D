const macaco = document.getElementById('macaco');
const game = document.getElementById('game');
const scoreEl = document.getElementById('score');

let isPulando = false;
let score = 0;
let playing = true;
let speed = 7;

// Jump
function pular() {
  if (isPulando || !playing) return;
  isPulando = true;
  let jumpHeight = parseInt(macaco.style.bottom) || 23;
  const maxJump = 100;
  const gravity = 5;

  const upInterval = setInterval(() => {
    if (!playing) { clearInterval(upInterval); return; }
    if (jumpHeight >= maxJump) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (!playing) { clearInterval(downInterval); return; }
        if (jumpHeight <= 23) {
          jumpHeight = 23;
          macaco.style.bottom = jumpHeight + 'px';
          clearInterval(downInterval);
          isPulando = false;
        } else {
          jumpHeight -= gravity;
          macaco.style.bottom = jumpHeight + 'px';
        }
      }, 16);
    } else {
      jumpHeight += gravity;
      macaco.style.bottom = jumpHeight + 'px';
    }
    macaco.style.bottom = jumpHeight + 'px';
  }, 16);
}

// Obstacles
function criarObstaculo() {
  if (!playing) return;
  const obstaculo = document.createElement('div');
  obstaculo.classList.add('obstaculo');
  game.appendChild(obstaculo);
  let obstaculoLeft = 800;

  obstaculo.style.left = obstaculoLeft + 'px';

  const moveInterval = setInterval(() => {
    if (!playing) {
      if (obstaculo.parentNode) game.removeChild(obstaculo);
      clearInterval(moveInterval);
      return;
    }
    if (obstaculoLeft < -20) {
      clearInterval(moveInterval);
      if (obstaculo.parentNode) game.removeChild(obstaculo);
    }
    obstaculoLeft -= speed;
    obstaculo.style.left = obstaculoLeft + 'px';

    // Collision
    const macacoBottom = parseInt(macaco.style.bottom) || 23;
    if (
      obstaculoLeft > 70 && obstaculoLeft < 114 && macacoBottom < 50
    ) {
      playing = false;
      scoreEl.textContent = "GAME OVER";
      setTimeout(() => { window.location.reload() }, 1600);
    }
  }, 16);

  setTimeout(criarObstaculo, Math.random() * 800 + 700);
}

// Score loop estilo dino
function scoreLoop() {
  if (!playing) return;
  score += 1;
  scoreEl.textContent = String(score).padStart(5, '0');
  setTimeout(scoreLoop, 60);
}

document.addEventListener('keydown', e => {
  if ((e.code === 'Space' || e.key === ' ') && playing) pular();
  if ((e.code === 'ArrowUp' || e.key === 'ArrowUp') && playing) pular();
});

macaco.style.bottom = '23px';

criarObstaculo();
scoreLoop();
