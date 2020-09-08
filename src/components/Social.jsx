import React from 'react';
import SocialList from '../app/data/social-list';


const Social = () => {
  return (
    <table>
      {
        SocialList.map(social => (
          <>
            <tr key={ social.id }>
              <td>
                { social.name }
              </td>
              <td>
                <a href={ social.url }>{ social.url }</a>
              </td>
            </tr>
          </>
        ))
      }
    </table>
  )
}

export default Social;