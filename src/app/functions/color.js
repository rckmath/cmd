import ColorList from '../data/color-list';

export default function (input) {
  if (input.length !== 2) { return 'Invalid parameters'; }

  const colors = {
    backgroundColor: ColorList.find(c => ( c.id === input[0] )).hex,
    color: ColorList.find(c => ( c.id === input[1] )).hex,
  }

  return colors;
}