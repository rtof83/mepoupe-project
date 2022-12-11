import React, { useState } from 'react';
import api from '../api';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const CEP = () => {
  const [ cep, setCEP ] = useState('');
  const [ result, setResult ] = useState({});

  const consult = async () => {
    if (!cep)
      return alert('Atenção! O campo deve ser preenchido.');

    await api.get(`/cep/${cep}`)
      .then(({ data }) => setResult(data))
      .catch(e => {
        if (e.response.status === 404 || e.response.status === 401)
          alert(e.response.data.erro);

        console.log(e);
      });
  };

  const clean = () => {
    setCEP('');
    setResult({});

    document.getElementById('txtCEP').focus();
  };

  return (
      <div className="tableCustomer">

        <h3>Consulta CEP</h3>

        <Grid gap={3}
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              className="gridCEO">

          <FormControl sx={{ display: 'inline' }}>
            <FormControl sx={{ width: 150, mx: 1, mt: 2 }}>
              <TextField required type="number" id="txtCEP" label="informe o CEP" variant="outlined" value={cep} onChange={e => setCEP(e.target.value)} onKeyDown={e => e.key === 'Enter' && consult()} />
            </FormControl>
          </FormControl>

          { Object.keys(result).length > 0 && 
             <ul>
              <li>cep: {result.cep}</li>
              <li>logradouro: {result.logradouro}</li>
              <li>complemento: {result.complemento}</li>
              <li>bairro: {result.bairro}</li>
              <li>localidade: {result.localidade}</li>
              <li>uf: {result.uf}</li>
              <li>ddd: {result.ddd}</li>
           </ul>  
          }
        </Grid>

        <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

          <Button onClick={() => clean()} variant="contained">Limpar Pesquisa</Button>
          <Button onClick={() => consult()} variant="contained">Consultar</Button>
        </Grid>

    </div>
  );
};

export default CEP;
