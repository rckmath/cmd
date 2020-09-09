export function open(url) {
  if (!url.includes('http://')) {
    url = 'http://' + url;
  }

  const valid = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(url)

  if (!valid) { return 'URL inválida!' }

  window.open(url);
}

export function cls() {
  return null;
}

export function time() {
  return `Hora atual: ${
    new Date(Date.now())
      .toLocaleString()
      .slice(11, 19)
      .replace(/-/g,'/')
  }`
}

export function date() {
  return `Data atual: ${
    new Date(Date.now())
      .toLocaleString()
      .slice(0, 10)
      .replace(/-/g,'/')
  }`
}