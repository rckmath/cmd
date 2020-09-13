const CommandList = [
  { id: 1, name: 'about' , syntax: 'about', description: 'Exibe um breve resumo sobre mim.' },
  { id: 2, name: 'calc' , syntax: 'calc [attr]', description: 'Recebe dois números e uma operação e exibe o resultado do cálculo. Exemplo: calc 3*3' },
  { id: 3, name: 'cls' , syntax: 'cls', description: 'Limpa a tela.' },
  { id: 4, name: 'date' , syntax: 'date', description: 'Exibe a data atual.' },
  { id: 5, name: 'ip' , syntax: 'ip', description: 'Exibe o IP do cliente.' },
  { id: 6, name: 'open' , syntax: 'open [attr]', description: 'Recebe uma URL como atributo e a abre em uma nova janela. Exemplo: open www.google.com' },
  { id: 7, name: 'projects' , syntax: 'projects', description: 'Lista os projetos em que trabalhei.' },
  { id: 8, name: 'shutdown' , syntax: 'shutdown', description: 'Fecha a aba mediante confirmação.' },
  { id: 9, name: 'time' , syntax: 'time', description: 'Exibe o horário atual.' },
  { id: 10, name: 'color' , syntax: 'color [attr]', description: 'Troca a cor do fundo e da fonte mediante a inserção de dois dígitos hexadecimais como atributo. Exemplo: color 0A (fundo preto, caracteres verdes).' },
  { id: 11, name: 'social' , syntax: 'social', description: 'Exibe uma lista de redes minhas.' },
  { id: 12, name: 'help' , syntax: 'help', description: 'Exibe a lista de comandos e suas respectivas descrições.' },
];

export default CommandList;