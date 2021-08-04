const GITHUB_API_BASE_URL = 'https://api.github.com';

export default async function () {
  const repositories = await fetch(`${GITHUB_API_BASE_URL}/users/rckmath/repos`, { method: 'get' })
    .then(res => res.json())
    .catch((err) => { return `Oops! Alguma coisa deu errado. Detalhes do erro: ${err}`; })
  
  return repositories.filter((repo) => !repo.fork);
}