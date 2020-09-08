const CommandList = [
  { id: 1, syntax: 'about', description: 'Exibe um breve resumo sobre mim.' },
  { id: 2, syntax: 'calc [attr]', description: 'Recebe dois números e uma operação e exibe o resultado do cálculo. Exemplo: calc 3*3' },
  { id: 3, syntax: 'cls', description: 'Limpa a tela.' },
  { id: 4, syntax: 'date', description: 'Exibe a data atual.' },
  { id: 5, syntax: 'ip', description: 'Exibe o IP do cliente.' },
  { id: 6, syntax: 'open [attr]', description: 'Recebe uma URL como atributo e a abre em uma nova janela. Exemplo: open www.google.com' },
  { id: 7, syntax: 'projects', description: 'Lista os projetos em que trabalhei.' },
  { id: 8, syntax: 'shutdown', description: 'Fecha a aba mediante confirmação.' },
  { id: 9, syntax: 'time', description: 'Exibe o horário atual.' },
  { id: 10, syntax: 'color [attr]', description: 'Troca a cor do fundo e da fonte mediante a inserção de dois dígitos hexadecimais como atributo. Exemplo: color 0A (fundo preto, caracteres verdes).' },
  { id: 11, syntax: 'social', description: 'Exibe uma lista de redes minhas.' },
];

export default CommandList;