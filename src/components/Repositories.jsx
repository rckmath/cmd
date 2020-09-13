import React, { useEffect, useState } from 'react';

import Projects from '../app/functions/projects';
import Table from './layout/Table';


const Repositories = () => {
  const [repositories, setRepositories] = useState(['']);
  const getRepositories = async () => (setRepositories(await Projects()));
 
  useEffect(() => { getRepositories() }, []);

  return (
    <Table>
      {
        (repositories && repositories.map(repo => (
          repo ?
            <tr key={ repo.id }>
              <td><a href={ repo.html_url }>{ repo.name }</a></td>
            </tr> : undefined
        ))) || `Buscando...`
      }
    </Table>
  )
}

export default Repositories;