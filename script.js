/*
  Projeto: Portfólio - Naian Willian Azevedo da Silva
  Arquivo: script.js
  Autor: Naian Willian Azevedo da Silva
  Data: 2026-05-03
  Versão: 1.0
  Objetivo: Gerenciar tema (localStorage), menu mobile e validação do formulário.
  Observações: Verificar existência de elementos antes de operar.
*/


/* ---------- Tema (persistência em localStorage) ---------- */
const temaBtn = document.getElementById('temaBtn');

function aplicarTemaSalvo() {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'dark') {
    document.body.classList.add('dark');
    if (temaBtn) temaBtn.setAttribute('aria-pressed', 'true');
  } else {
    document.body.classList.remove('dark');
    if (temaBtn) temaBtn.setAttribute('aria-pressed', 'false');
  }
}
aplicarTemaSalvo();

if (temaBtn) {
  temaBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
    temaBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  });
}

/* ---------- Menu mobile (toggle) ---------- */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const expanded = navLinks.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    menuToggle.textContent = expanded ? '✕' : '☰';
  });

  // Fecha o menu ao clicar em qualquer link interno
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

/* ---------- Validação e simulação de envio do formulário ---------- */
const form = document.getElementById('contatoForm');
const mensagemConfirmacao = document.getElementById('mensagemConfirmacao');

/* Regex simples e eficaz para validar e-mail no front-end */
const emailValidoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Função utilitária para limpar mensagens após X ms */
function limparMensagemTemporizada(timeout = 3000) {
  if (!mensagemConfirmacao) return;
  setTimeout(() => {
    mensagemConfirmacao.textContent = '';
  }, timeout);
}

/* Validação ao submeter o formulário */
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtém valores e remove espaços em branco
    const nome = (document.getElementById('nome') || {}).value?.trim() || '';
    const email = (document.getElementById('email') || {}).value?.trim() || '';
    const mensagem = (document.getElementById('mensagem') || {}).value?.trim() || '';

    // Referências aos spans de erro (acessibilidade)
    const erroNome = document.getElementById('erro-nome');
    const erroEmail = document.getElementById('erro-email');
    const erroMensagem = document.getElementById('erro-mensagem');

    // Limpa mensagens de erro anteriores
    if (erroNome) erroNome.textContent = '';
    if (erroEmail) erroEmail.textContent = '';
    if (erroMensagem) erroMensagem.textContent = '';
    if (mensagemConfirmacao) mensagemConfirmacao.textContent = '';

    // Valida campos obrigatórios
    let valido = true;
    if (!nome) {
      if (erroNome) erroNome.textContent = 'Por favor, informe seu nome.';
      valido = false;
    }
    if (!email) {
      if (erroEmail) erroEmail.textContent = 'Por favor, informe seu e-mail.';
      valido = false;
    } else if (!emailValidoRegex.test(email)) {
      if (erroEmail) erroEmail.textContent = 'Digite um e-mail válido.';
      valido = false;
    }
    if (!mensagem) {
      if (erroMensagem) erroMensagem.textContent = 'Por favor, escreva uma mensagem.';
      valido = false;
    }

    if (!valido) {
      if (mensagemConfirmacao) {
        mensagemConfirmacao.textContent = 'Por favor, corrija os campos destacados.';
        mensagemConfirmacao.style.color = 'red';
        limparMensagemTemporizada();
      }
      return;
    }

    // Simulação de envio: alerta e limpeza do formulário
    alert('Mensagem enviada com sucesso!');
    form.reset();

    if (mensagemConfirmacao) {
      mensagemConfirmacao.textContent = 'Mensagem enviada com sucesso!';
      mensagemConfirmacao.style.color = 'green';
      limparMensagemTemporizada();
    }
  });
}
