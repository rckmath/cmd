const commandList = [
  { id: 1, command: 'about', description: 'Exibe um breve resumo sobre mim.' },
  { id: 2, command: 'calc', description: '' },
  { id: 3, command: 'cls', description: 'Limpa a tela.' },
  { id: 4, command: 'date', description: 'Exibe a data atual.' },
  { id: 5, command: 'ipconfig', description: 'Exibe o IP do cliente.' },
  { id: 6, command: 'open [attr]', description: 'Recebe uma URL como atributo e a abre em uma nova janela. Exemplo: open www.google.com' },
  { id: 7, command: 'projects', description: 'Lista os projetos que trabalhei.' },
  { id: 8, command: 'shutdown', description: 'Fecha a aba mediante confirmação.' },
  { id: 9, command: 'time', description: 'Exibe o horário atual.' },
  { id: 10, command: 'color [attr]', description: 'Troca a cor do fundo e da fonte mediante a inserção de dois dígitos hexadecimais como atributo. Exemplo: color 0A (fundo preto, caracteres verdes).' },
];

export default commandList;