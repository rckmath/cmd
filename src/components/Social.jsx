import React from 'react';

import SocialList from '../app/data/social-list';
import Table from './layout/Table';


const Social = () => {
  return (
    <Table>
      {
        SocialList.map(social => (
          <tr key={ social.id }>
            <td>{ social.name }</td>
            <td>
              <a href={ social.url }>{ social.url }</a>
            </td>
          </tr>
        ))
      }
    </Table>
  )
}

export default Social;