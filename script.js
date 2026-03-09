const macaco = document.getElementById('macaco');
const game = document.getElementById('game');
const scoreEl = document.getElementById('score');

let isPulando = false;
let score = 0;

// Pular
function pular() {
  if (isPulando) return;
  isPulando = true;
  let jumpHeight = parseInt(macaco.style.bottom) || 0;
  const maxJump = 100;

  const upInterval = setInterval(() => {
    if (jumpHeight >= maxJump) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (jumpHeight <= 0) {
          jumpHeight = 0;
          macaco.style.bottom = jumpHeight + 'px';
          clearInterval(downInterval);
          isPulando = false;
          return;
        }
        jumpHeight -= 5;
        if (jumpHeight < 0) jumpHeight = 0;
        macaco.style.bottom = jumpHeight + 'px';
      }, 20);
    } else {
      jumpHeight += 5;
      macaco.style.bottom = jumpHeight + 'px';
    }
  }, 20);
}

// Obstáculos
function criarObstaculo() {
  const obstaculo = document.createElement('div');
  obstaculo.classList.add('obstaculo');
  game.appendChild(obstaculo);
  let obstaculoLeft = 800;

  obstaculo.style.left = obstaculoLeft + 'px';

  const moveInterval = setInterval(() => {
    if (obstaculoLeft < -20) {
      clearInterval(moveInterval);
      game.removeChild(obstaculo);
      score++;
      scoreEl.textContent = 'Pontuação: ' + score;
      return;
    }
    obstaculoLeft -= 5;
    obstaculo.style.left = obstaculoLeft + 'px';

    // Colisão
    const macacoBottom = parseInt(macaco.style.bottom) || 0;
    if (
      obstaculoLeft > 50 &&
      obstaculoLeft < 90 &&
      macacoBottom < 40
    ) {
      alert('Game Over! Pontuação: ' + score);
      window.location.reload();
    }
  }, 20);

  setTimeout(criarObstaculo, Math.random() * 2000 + 1000);
}

// Controles
document.addEventListener('keydown', e => {
  if (e.code === 'Space' || e.key === ' ') pular();
});

// Iniciar
criarObstaculo();
