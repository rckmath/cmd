export default async function () {
  const { ip } = await fetch('https://api.ipify.org/?format=json', { method: 'get' })
  .then(res => res.json())
  .catch((err) => { return 'Oops! Alguma coisa deu errado.' });

  return `Seu IP: ${ip}`;
}