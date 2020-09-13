const GITHUB_API_BASE_URL = 'https://api.github.com';

export default async function () {
  const repos = await fetch(`${GITHUB_API_BASE_URL}/users/rckmath/repos`, { method: 'get' })
    .then(res => res.json())
    .catch((err) => { return 'Oops! Alguma coisa deu errado.' });
  
  return repos.filter((repo) => !repo.fork);
}