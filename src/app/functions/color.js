import ColorList from '../data/color-list';

export default function (input) {
  if (!input) { return 'Invalid parameters'; }
  if (input && input.length !== 2) { return 'Invalid parameters'; }

  console.log(input);

  const colors = {
    backgroundColor: ColorList.find(c => ( c.id === input[0] )).hex,
    color: ColorList.find(c => ( c.id === input[1] )).hex,
  }

  document.body.style = `background-color: ${colors.backgroundColor}; color: ${colors.color}`;

  for (let i = 0; i < document.body.getElementsByTagName("input").length; i++) {
    document.body.getElementsByTagName("input")[i].style = `background-color: ${colors.backgroundColor}; color: ${colors.color}`;
  }

  return colors;
}