export default async function () {
  const { geoplugin_request } = await fetch('http://www.geoplugin.net/json.gp', { method: 'get' })
  .then(res => res.json())
  .catch((err) => { return 'Oops! Alguma coisa deu errado.' });

  return `Seu IP: ${geoplugin_request}`;
}