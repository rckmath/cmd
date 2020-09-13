export default class misc {
  static open(url) {
    if (!url) { return 'URL inválida!' }

    if (!url.includes('http://')) { url = 'http://' + url; }
  
    const valid = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(url)
  
    if (!valid) { return 'URL inválida!' }
  
    window.open(url);
  }

  static time() {
    return `Hora atual: ${
      new Date(Date.now())
        .toLocaleString()
        .slice(11, 19)
        .replace(/-/g,'/')
    }`
  }
  
  static date() {
    return `Data atual: ${
      new Date(Date.now())
        .toLocaleString()
        .slice(0, 10)
        .replace(/-/g,'/')
    }`
  }

  static shutdown() {
    const res = window.confirm('NãaooOOo! Deseja mesmo sair? :(');

    if (res) { return window.close() }
  }
}

