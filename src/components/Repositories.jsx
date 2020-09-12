import React, { useEffect, useState } from 'react';
import Projects from '../app/functions/projects';


const Repositories = () => {
  const [repositories, setRepositories] = useState(['']);
  const getRepositories = async () => (setRepositories(await Projects()))
 
  useEffect(() => { getRepositories() }, []);

  return (
    <table>
      <tbody>
        {
          repositories && repositories.map(repo => (
            repo ?
              <tr key={ repo.id }>
                <td><a href={ repo.html_url }>{ repo.name }</a></td>
              </tr> : undefined
          ))
        }
      </tbody>
    </table>
  )
}

export default Repositories;