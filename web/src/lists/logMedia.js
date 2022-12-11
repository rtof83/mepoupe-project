import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import DelLog from '../components/DelLog';
import GetLog from '../components/GetLog';

const LogMedia = () => {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const route = 'log/media';

  useEffect(() => {
    GetLog(route, setLoading, setData)
  }, []);

  return (
      <div className="tableCustomer">

        { loading ? <h3><CircularProgress /></h3> : <>

      <h3>Log Média</h3>

        <TableContainer sx={{ mt: 3 }} component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Num1</StyledTableCell>
                  <StyledTableCell align="center">Num2</StyledTableCell>
                  <StyledTableCell align="center">Média</StyledTableCell>
                  <StyledTableCell align="center">Data</StyledTableCell>
              </TableRow>
              </TableHead>
              <TableBody>

              { data && Object.keys(data).map((item) => (
                  <StyledTableRow key={0}>
                    <StyledTableCell align="center" component="th" scope="row">{data[item].id}</StyledTableCell>
                    <StyledTableCell align="center">{data[item].num1}</StyledTableCell>
                    <StyledTableCell align="center">{data[item].num2}</StyledTableCell>
                    <StyledTableCell align="center">{data[item].avg}</StyledTableCell>
                    <StyledTableCell align="center">{new Date(data[item].datetime).toLocaleString('pt-BR', { timeZone: 'UTC' })}</StyledTableCell>
                  </StyledTableRow>
              ))}
              </TableBody>
          </Table>
        </TableContainer>

        <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

          <Button variant="contained" onClick={() => DelLog(route, setLoading, setData)}>Limpar Log</Button>

          <Link to={'/'}>
            <Button variant="contained">Voltar</Button>
          </Link>
        </Grid>

        </> }
    </div>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default LogMedia;
