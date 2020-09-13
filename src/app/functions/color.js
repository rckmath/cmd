import ColorList from '../data/color-list';

export default class Color {
  static get(input) {
    const colors = {
      backgroundColor: ColorList.find(c => ( c.id === input[0] )).hex,
      color: ColorList.find(c => ( c.id === input[1] )).hex,
    }
  
    return colors;
  }
  static change(colors) {
    document.body.style = `background-color: ${colors.backgroundColor}; color: ${colors.color}`;
  
    for (let i = 0; i < document.body.getElementsByTagName("input").length; i++) {
      document.body.getElementsByTagName("input")[i].style = `background-color: ${colors.backgroundColor}; color: ${colors.color}`;
    }

    for (let i = 0; i < document.body.getElementsByTagName("a").length; i++) {
      document.body.getElementsByTagName("a")[i].style = `background-color: ${colors.backgroundColor}; color: ${colors.color}`;
    }
  }
}