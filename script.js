// Inicializa cada carrossel individualmente
document.querySelectorAll('.carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('img.carousel-img');
  // Atualiza quais imagens estão visíveis
  const updateImages = () => {
    images.forEach((img, index) => {
      img.classList.toggle('hidden', index !== parseInt(carousel.dataset.index, 10));
    });
  };

  updateImages();

  carousel.querySelector('.prev').addEventListener('click', () => {
    let index = parseInt(carousel.dataset.index, 10);
    if (index > 0) index--;
    carousel.dataset.index = index;
    updateImages();
  });

  carousel.querySelector('.next').addEventListener('click', () => {
    let index = parseInt(carousel.dataset.index, 10);
    if (index < images.length - 1) index++;
    carousel.dataset.index = index;
    updateImages();
  });
});

// Validação simples do formulário de contato
document.querySelector('#contato-form').addEventListener('submit', function (e) {
  const fields = document.querySelectorAll('#contato-form input, #contato-form textarea');
  let valid = true;
  fields.forEach(field => {
    if (!field.value.trim()) valid = false;
  });
  if (!valid) {
    e.preventDefault();
    alert('Por favor, preencha todos os campos.');
  }
});


let tooltip = null, mouseMoveHandler;
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  if (tooltip) return;
  tooltip = document.createElement('div');
  tooltip.id = 'context-tooltip';
  tooltip.innerText = "© Copyright Luiza Mantovani 2025. Direitos reservados.";
  tooltip.style.position = 'absolute';
  tooltip.style.background = 'rgba(92, 92, 92, 0.67)';
  tooltip.style.color = '#fff';
  tooltip.style.opacity = "0.8"; // define a opacidade
  tooltip.style.padding = '5px 8px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.fontSize = '10px';
  tooltip.style.pointerEvents = 'none';
  document.body.appendChild(tooltip);
  mouseMoveHandler = function (e) {
    tooltip.style.left = (e.pageX + 10) + 'px';
    tooltip.style.top = (e.pageY + 10) + 'px';
  };
  document.addEventListener('mousemove', mouseMoveHandler);
  mouseMoveHandler(e);
  setTimeout(function () {
    if (tooltip) {
      document.body.removeChild(tooltip);
      tooltip = null;
      document.removeEventListener('mousemove', mouseMoveHandler);
    }
  }, 2000);
});

(function () {
  const analyticsScript = document.createElement('script');
  analyticsScript.src = '/_vercel/insights/script.js';
  analyticsScript.defer = true;
  document.body.appendChild(analyticsScript);
})();


//document.querySelector('.menu-toggle').addEventListener('click', function() {
//   document.querySelector('.menu').classList.toggle('active');
// });




document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  toggle.addEventListener('click', function () {
    menu.classList.toggle('active');
  });
});

// Chatbot Lu: abre/minimiza ao clicar no header
const chat = document.getElementById('chatbot');
const header = document.getElementById('chatbot-header');

// já começa sem classe, portanto aberto
header.addEventListener('click', () => {
  chat.classList.toggle('minimized');
});

// envio de mensagem (mantém igual)
document.getElementById('chat-send').addEventListener('click', sendChat);
document.getElementById('chat-input').addEventListener('keypress', e => {
  if (e.key === 'Enter') sendChat();
});

function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  const body = document.getElementById('chatbot-body');

  // usuário
  const um = document.createElement('div');
  um.className = 'user-message';
  um.textContent = text;
  body.appendChild(um);

  // resposta da Lu
  const reply = document.createElement('div');
  reply.className = 'bot-message';
  reply.textContent = getLuResponse(text);
  body.appendChild(reply);

  input.value = '';
  body.scrollTop = body.scrollHeight;
}

function getLuResponse(msg) {
  const key = msg.toLowerCase();
  const faq = [
    {
      triggers: [
        'olá',
        'Olá',
        'ola',
        'Ola',
        'oi',
        'Oi',
        'Bom dia',
        'Boa noite',
        'bom dia',
        'boa noite',
      ],
      response: 'Olá, como posso lhe ajudar?'
    },
    {
      triggers: [
        'quais serviços você oferece?',
        'que serviços vocês oferecem?',
        'o que vocês fazem?'
      ],
      response: 'Oferecemos projetos residenciais, comerciais e consultorias em arquitetura e urbanismo.'
    },
    {
      triggers: [
        'qual o prazo médio de um projeto?',
        'quanto tempo leva um projeto?',
        'prazo de projeto'
      ],
      response: 'O prazo varia conforme complexidade, mas geralmente entre 30 e 60 dias.'
    },
    {
      triggers: [
        'como posso entrar em contato?',
        'qual o contato?',
        'telefone ou email?'
      ],
      response: 'Você pode usar o formulário na seção “fale conosco” ou ligar no (54) 9 9999-9999.'
    },
    {
      triggers: [
        'vocês fazem projetos comerciais?',
        'trabalham com comércio?'
      ],
      response: 'Sim, desenvolvemos projetos comerciais personalizados conforme sua necessidade.'
    }
  ];

  // Procura a primeira entrada cujo array de triggers inclui exatamente a pergunta
  for (const item of faq) {
    if (item.triggers.includes(key)) {
      return item.response;
    }
  }

  // Se não encontrou, responde padrão
  return 'Desculpe, não entendi. Poderia reformular sua pergunta?';
}

// Ao carregar, vincula quick-buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const question = btn.textContent;
    handleUserMessage(question);
  });
});

function handleUserMessage(text) {
  // esconde as perguntas prontas na primeira interação
  const quick = document.getElementById('quick-questions');
  if (quick) quick.style.display = 'none';

  const body = document.getElementById('chatbot-body');

  // Mensagem do usuário
  const um = document.createElement('div');
  um.className = 'user-message';
  um.textContent = text;
  body.appendChild(um);

  // Resposta da Lu
  const reply = document.createElement('div');
  reply.className = 'bot-message';
  reply.textContent = getLuResponse(text);
  body.appendChild(reply);

  body.scrollTop = body.scrollHeight;
}

// Atualize sendChat para usar handleUserMessage
function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  handleUserMessage(text);
  input.value = '';
}

// (o resto do código permanece igual)
document.getElementById('chat-send').addEventListener('click', sendChat);
document.getElementById('chat-input').addEventListener('keypress', e => {
  if (e.key === 'Enter') sendChat();
});
