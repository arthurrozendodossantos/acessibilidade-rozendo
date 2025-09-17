// script.js - Interatividade e acessibilidade

(function(){
  const mainBtn = document.getElementById('mainAction');
  const catalog = document.getElementById('catalog');
  const favButtons = document.querySelectorAll('[data-fav]');

  // Botão principal: rolar até o catálogo
  if(mainBtn && catalog){
    mainBtn.addEventListener('click', ()=>{
      catalog.scrollIntoView({behavior:'smooth',block:'start'});
      mainBtn.setAttribute('aria-disabled','true');
      setTimeout(()=>mainBtn.removeAttribute('aria-disabled'),900);
    });
  }

  // Favoritar jogos (toggle aria-pressed)
  favButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cur = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!cur));
      btn.textContent = cur ? 'Adicionar aos favoritos' : 'Remover dos favoritos';
      announce((!cur ? 'Adicionado ' : 'Removido ') + btn.dataset.fav + ' dos favoritos');
    });
  });

  // Botões "Saiba mais"
  const infoButtons = document.querySelectorAll('[data-game]');
  infoButtons.forEach(b=>b.addEventListener('click', ()=>{
    const game = b.dataset.game;
    alert('Mais informações sobre: ' + game + '\n(Aqui pode entrar modal, link ou imagens detalhadas).');
  }));

  // Região ARIA live para feedback
  const live = document.createElement('div');
  live.setAttribute('aria-live','polite');
  live.setAttribute('aria-atomic','true');
  live.className='sr-only';
  document.body.appendChild(live);

  function announce(message){
    live.textContent='';
    setTimeout(()=>live.textContent=message,50);
  }

  // Destaque visual quando card recebe foco
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('focus', ()=>card.style.boxShadow='0 12px 30px rgba(2,6,23,0.8)');
    card.addEventListener('blur', ()=>card.style.boxShadow='inset 0 -40px 80px rgba(0,0,0,0.25)');
  });

  // Atalho de teclado "g" leva ao catálogo
  window.addEventListener('keydown', (e)=>{
    if(e.key.toLowerCase()==='g' && !e.metaKey && !e.ctrlKey){
      e.preventDefault();
      catalog.scrollIntoView({behavior:'smooth'});
      announce('Indo para catálogo');
    }
  });
})();