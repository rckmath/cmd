import { useEffect, useState } from 'react';

import IpApi from '../app/functions/ip';


const IpAddress = () => {
  const [ip, setIp] = useState('');
  const getIp = async () => (setIp(await IpApi()));
 
  useEffect(() => { getIp() }, []);

  return (
    ip || `Buscando...`
  )
}

export default IpAddress;