document.addEventListener('DOMContentLoaded', () => {
  // 1. Cursor Customizado
  const cursor = document.getElementById('customCursor');
  
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    // Efeito hover ampliado para elementos interativos
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, input, textarea, .menu-item, .kanban-card');
      hoverables.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
          cursor.style.backgroundColor = 'rgba(89, 50, 234, 0.12)';
        });
        elem.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursor.style.backgroundColor = 'transparent';
        });
      });
    };
    
    addHoverListeners();
    // Expor globalmente para re-vincular se houver elementos injetados dinamicamente
    window.updateCursorListeners = addHoverListeners;
  }

  // 2. Simulador de Frete (API ViaCep)
  const cepInput = document.getElementById('cepInput');
  const btnCalcular = document.getElementById('btnCalcularFrete');
  const cepFeedback = document.getElementById('cepFeedback');
  const freteLoading = document.getElementById('freteLoading');
  const freteResult = document.getElementById('freteResult');

  const resEndereco = document.getElementById('resEndereco');
  const priceExpress = document.getElementById('priceExpress');
  const timeExpress = document.getElementById('timeExpress');
  const timeStandard = document.getElementById('timeStandard');

  // Máscara básica para o CEP (00000-000)
  if (cepInput) {
    cepInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 5) {
        value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
      }
      e.target.value = value;
    });
  }

  const calcularFrete = async () => {
    if (!cepInput) return;
    const rawCep = cepInput.value.replace(/\D/g, '');
    
    // Ocultar resultados anteriores
    freteResult.style.display = 'none';
    cepFeedback.textContent = '';
    cepFeedback.className = 'feedback-message';

    if (rawCep.length !== 8) {
      cepFeedback.textContent = 'CEP incompleto! Insira um CEP válido de 8 dígitos.';
      cepFeedback.classList.add('feedback-error');
      return;
    }

    // Exibir Loader
    freteLoading.style.display = 'flex';

    try {
      const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
      const data = await response.json();

      freteLoading.style.display = 'none';

      if (data.erro) {
        cepFeedback.textContent = 'CEP não encontrado no ViaCep.';
        cepFeedback.classList.add('feedback-error');
        return;
      }

      // Sucesso na consulta
      resEndereco.textContent = `${data.localidade} - ${data.uf}`;
      
      // Simulação regionalizada de prazos e valores
      const uf = data.uf.toUpperCase();
      let valorExpress = 9.90;
      let diasExpress = 2;
      let diasStandard = 5;

      const sulSudeste = ['SP', 'RJ', 'MG', 'ES', 'PR', 'SC', 'RS'];
      const centroOeste = ['DF', 'GO', 'MT', 'MS'];
      const nordeste = ['BA', 'PE', 'CE', 'RN', 'PB', 'AL', 'SE', 'MA', 'PI'];
      
      if (sulSudeste.includes(uf)) {
        valorExpress = 9.90;
        diasExpress = 2;
        diasStandard = 5;
      } else if (centroOeste.includes(uf)) {
        valorExpress = 14.90;
        diasExpress = 4;
        diasStandard = 7;
      } else if (nordeste.includes(uf)) {
        valorExpress = 19.90;
        diasExpress = 5;
        diasStandard = 8;
      } else { // Região Norte
        valorExpress = 24.90;
        diasExpress = 7;
        diasStandard = 11;
      }

      priceExpress.textContent = `R$ ${valorExpress.toFixed(2).replace('.', ',')}`;
      timeExpress.textContent = `Prazo: ${diasExpress} dias úteis`;
      timeStandard.textContent = `Prazo: ${diasStandard} dias úteis`;

      // Mostrar card de resultado
      freteResult.style.display = 'block';

    } catch (error) {
      freteLoading.style.display = 'none';
      cepFeedback.textContent = 'Erro ao consultar API do ViaCep.';
      cepFeedback.classList.add('feedback-error');
      console.error('Erro ViaCep:', error);
    }
  };

  if (btnCalcular) {
    btnCalcular.addEventListener('click', calcularFrete);
    cepInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calcularFrete();
      }
    });
  }

  // 3. Validação do Formulário de Contato e Modal de Sucesso
  const contactForm = document.getElementById('contactForm');
  const inputName = document.getElementById('inputName');
  const inputEmail = document.getElementById('inputEmail');
  const inputMessage = document.getElementById('inputMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const successModal = document.getElementById('successModal');
  const successModalText = document.getElementById('successModalText');
  const btnFecharModal = document.getElementById('btnFecharModal');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validarFormulario = () => {
    let isValid = true;

    // Nome
    if (inputName.value.trim() === '') {
      inputName.classList.add('input-error');
      nameError.style.display = 'block';
      isValid = false;
    } else {
      inputName.classList.remove('input-error');
      nameError.style.display = 'none';
    }

    // E-mail
    if (!emailRegex.test(inputEmail.value.trim())) {
      inputEmail.classList.add('input-error');
      emailError.style.display = 'block';
      isValid = false;
    } else {
      inputEmail.classList.remove('input-error');
      emailError.style.display = 'none';
    }

    // Mensagem
    if (inputMessage.value.trim() === '') {
      inputMessage.classList.add('input-error');
      messageError.style.display = 'block';
      isValid = false;
    } else {
      inputMessage.classList.remove('input-error');
      messageError.style.display = 'none';
    }

    return isValid;
  };

  if (contactForm) {
    // Remover classe de erro digitando
    inputName.addEventListener('input', () => {
      inputName.classList.remove('input-error');
      nameError.style.display = 'none';
    });

    inputEmail.addEventListener('input', () => {
      if (emailRegex.test(inputEmail.value.trim())) {
        inputEmail.classList.remove('input-error');
        emailError.style.display = 'none';
      }
    });

    inputMessage.addEventListener('input', () => {
      inputMessage.classList.remove('input-error');
      messageError.style.display = 'none';
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (validarFormulario()) {
        const nomeClient = inputName.value.trim();
        const emailClient = inputEmail.value.trim();

        // Configurar mensagem do modal dinamicamente
        successModalText.innerHTML = `Obrigado pelo contato, <strong>${nomeClient}</strong>!<br>Sua solicitação de demonstração foi registrada com sucesso. Em breve retornaremos em seu e-mail <strong>${emailClient}</strong>.`;

        // Abrir modal
        successModal.classList.add('active');

        // Limpar form
        contactForm.reset();
      }
    });
  }

  if (btnFecharModal) {
    btnFecharModal.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }
});

// 4. Troca de Abas do Dashboard Interativo (Escopo Global para rodar nos botões inline)
window.switchDashboardTab = (tabName) => {
  // Remover classe ativa dos botões do menu
  const menuButtons = document.querySelectorAll('.menu-item');
  menuButtons.forEach(btn => btn.classList.remove('active'));

  // Adicionar classe ativa no botão selecionado
  const activeBtn = document.getElementById(`${tabName}-tab`);
  if (activeBtn) activeBtn.classList.add('active');

  // Ocultar todas as panes
  const panes = document.querySelectorAll('.dashboard-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  // Exibir a pane selecionada
  const activePane = document.getElementById(`pane-${tabName}`);
  if (activePane) activePane.classList.add('active');

  // Atualizar título da Topbar do dashboard
  const topbarTitle = document.getElementById('dashboard-title');
  if (topbarTitle) {
    switch (tabName) {
      case 'painel':
        topbarTitle.textContent = 'Dashboard';
        break;
      case 'pedidos':
        topbarTitle.textContent = 'CRM / Vendas (CRM Kanban)';
        break;
      case 'logistica':
        topbarTitle.textContent = 'Estoque & Logística (ViaCep Simulator)';
        break;
    }
  }
};

// 5. Mover cards do Kanban (Simulação interativa)
window.moveKanbanCard = (cardId, targetListId, targetColId) => {
  const cardElement = document.getElementById(cardId);
  const targetList = document.getElementById(targetListId);
  
  if (cardElement && targetList) {
    // Mover o elemento no DOM
    targetList.appendChild(cardElement);
    
    // Atualizar ação do botão dependendo de onde está
    const actionBtn = cardElement.querySelector('.card-action-btn');
    
    if (targetListId === 'list-separando') {
      actionBtn.textContent = 'Enviar Pedido →';
      // Mudar onclick para avançar até o concluído
      actionBtn.setAttribute('onclick', `moveKanbanCard('${cardId}', 'list-concluido', 'col-concluido')`);
    } else if (targetListId === 'list-concluido') {
      // Remover o botão e adicionar o badge de concluído
      actionBtn.remove();
      const badge = document.createElement('span');
      badge.className = 'card-badge-success';
      badge.textContent = 'Concluído';
      cardElement.appendChild(badge);
    }
    
    // Atualizar listeners de cursor para o card movido
    if (window.updateCursorListeners) {
      window.updateCursorListeners();
    }
  }
};

// 6. Rolar a página e abrir aba específica no Dashboard (ex: botões da Hero)
window.scrollParaDemo = (tabId) => {
  const demoSection = document.getElementById('demo');
  if (demoSection) {
    demoSection.scrollIntoView({ behavior: 'smooth' });
    
    // Extrai o nome da aba (ex: 'contato-tab' vira 'contato')
    const tabName = tabId.replace('-tab', '');
    
    // Executa a troca após o scroll iniciar
    setTimeout(() => {
      window.switchDashboardTab(tabName);
    }, 300);
  }
};

// 7. Rolar para o formulário de contato externo ao final da página
window.scrollParaFormulario = () => {
  const contatoSection = document.getElementById('contato');
  if (contatoSection) {
    contatoSection.scrollIntoView({ behavior: 'smooth' });
  }
};
