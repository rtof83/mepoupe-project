import React, { useState } from 'react';
import api from '../api';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const Media = () => {
  const [ num1, setNum1 ] = useState('');
  const [ num2, setNum2 ] = useState('');
  const [ result, setResult ] = useState('');

  const calc = async () => {
    if (!num1 || !num2)
      return alert('Atenção! Os campos devem ser preenchidos.');

    await api.get(`/media/${num1}/${num2}`)
      .then(({ data }) => setResult(data.media))
      .catch(e => {
        if (e.response.status === 404 || e.response.status === 401)
          alert(e.response.data.erro);

        console.log(e);
      });
  };

  const clean = () => {
    setNum1('');
    setNum2('');
    setResult('');

    document.getElementById('txtNum1').focus();
  };

  return (
      <div className="tableCustomer">

        <h3>Calcula Média</h3>

        <Grid gap={3}
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              className="gridMedia">

          <FormControl sx={{ display: 'inline' }}>
            <FormControl sx={{ width: 150, mx: 1, mt: 2 }}>
              <TextField required type="number" id="txtNum1" label="Valor 1" variant="outlined" value={num1} onChange={e => setNum1(e.target.value)} />
            </FormControl>

            <FormControl sx={{ width: 150, mx: 1, mt: 2 }}>
              <TextField required type="number" id="txtNum2" label="Valor 2" variant="outlined" value={num2} onChange={e => setNum2(e.target.value)} onKeyDown={e => e.key === 'Enter' && calc()} />
            </FormControl>
          </FormControl>

          { result && <h2>Média: {result}</h2> }
        </Grid>

        <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

          <Button onClick={() => clean()} variant="contained">Limpar Campos</Button>
          <Button onClick={() => calc()} variant="contained">Calcular</Button>
        </Grid>

    </div>
  );
};

export default Media;
