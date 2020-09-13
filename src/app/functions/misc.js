export default class misc {
  open(url) {
    if (!url.includes('http://')) {
      url = 'http://' + url;
    }
  
    const valid = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(url)
  
    if (!valid) { return 'URL inválida!' }
  
    window.open(url);
  }
  
  cls() {
    return null;
  }
  
  time() {
    return `Hora atual: ${
      new Date(Date.now())
        .toLocaleString()
        .slice(11, 19)
        .replace(/-/g,'/')
    }`
  }
  
  date() {
    return `Data atual: ${
      new Date(Date.now())
        .toLocaleString()
        .slice(0, 10)
        .replace(/-/g,'/')
    }`
  }
}

