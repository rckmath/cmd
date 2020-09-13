function calculate(result, number, op) {
  switch (op) {

    case '+':
      return result += number;
    case '-':
      return result -= number;
    case '*':
      return result *= number;
    case '/':
      return result /= number;
    case '^':
      return Math.pow(result, number);
    default:
      return 'Erro.';
    }
}

export default function (ans) {
  const operations = ['+', '-', '*', "/", "^"];
  
  try {
    const op = operations.find(op => ans.includes(op));

    if (!op) { return 'Operação inválida.'; }

    const numbers = ans.split(op);

    if (!numbers) { return 'Verifique os parâmetros inseridos.'; }

    let result = parseInt(numbers[0]);

    for (let i = 1; i < numbers.length; i++) {
      result = calculate(result, parseInt(numbers[i]), op);      
    }
    
    return result === Infinity
      ? '∞' : isNaN(result) ? 0 : result;

  } catch (err) {
    return 'Verifique os parâmetros inseridos.';
  }
}