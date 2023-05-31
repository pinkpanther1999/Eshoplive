
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import LogoBar from './LogoBar';


export default function OrderHistory(){

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.warning.light,
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

const [orders,setOrders]=React.useState([])
const navigate=useNavigate()



React.useEffect(() => {


    var id = window.sessionStorage.getItem("userid")
    


    fetch("https://localhost:44344/Orders/" + id)
      .then(res => res.json())
      .then((data) => {
        setOrders(data)
      })

      window.scrollTo(0, 0)


  }, [])





  return (
    <div>

      <LogoBar/>

      {(orders.length!=0)?

    <div id="orderhistory" className='container' style={{marginTop:"150px"}}>
   <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell ><strong style={{color:"black"}}>Product Name</strong></StyledTableCell>
            <StyledTableCell align="right"><strong style={{color:"black"}}>Quantity</strong></StyledTableCell>
            <StyledTableCell align="right"><strong style={{color:"black"}}>Unit Price&nbsp;(&#8377;)</strong></StyledTableCell>
            <StyledTableCell align="right"><strong style={{color:"black"}}>Points Redeemed</strong></StyledTableCell>
            <StyledTableCell align="right"><strong style={{color:"black"}}>Total Price&nbsp;(&#8377;)</strong></StyledTableCell>
            <StyledTableCell align="right"><strong style={{color:"black"}}>Order Date & Time</strong></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {orders.map((img) => (
            <StyledTableRow key={img.O_P_Name}>
              <StyledTableCell component="th" id="productname" onClick={()=>{navigate('/Details/'+img.O_P_Name)}}scope="row">
              <strong style={{color:"black"}}>{img.O_P_Name}<br/> <span className='blockquote-footer'>{img.O_P_Config_Desc}</span></strong>
              </StyledTableCell>
              <StyledTableCell align="right">{img.O_Cart_Quantity}</StyledTableCell>
              <StyledTableCell align="right">{img.O_P_Emart_Price}</StyledTableCell>
              <StyledTableCell align="right">{img.O_P_Ecard_Redem_Points*img.O_Cart_Quantity}</StyledTableCell>
              <StyledTableCell align="right">{img.O_P_Emart_Price*img.O_Cart_Quantity}</StyledTableCell>
              <StyledTableCell align="right">{img.O_DateTime.substr(0,16).replace("T"," ")}</StyledTableCell>
            </StyledTableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>:<h1 style={{marginTop:"200px",marginLeft:"600px"}}>No previous orders!</h1>}
    </div>
  );
}
