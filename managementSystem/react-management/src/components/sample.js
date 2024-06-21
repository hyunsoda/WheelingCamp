import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useSearchParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[500],
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


const rentColumn = [
    {
      accessorKey: 'itemNo',
      header: '상품 번호',
    },
    {
      accessorKey: 'categoryCode',
      header: '카테고리 명',
    },
    {
      accessorKey: 'categoryName',
      header: '카테고리 명',
    },
    {
      accessorKey: 'carName',
      header: '상품 조회수',
    },
    {
      accessorKey: 'equipmentName',
      header: '차종',
    },
    {
      accessorKey: 'packageName',
      header: '차량 대여 비용',
    },
    {
      accessorKey: 'rentDetailNo',
      header: '차급',
    },
    {
      accessorKey: 'returnFl',
      header: '최대 탑승 인원',
    },
    {
      accessorKey: 'carStockNo',
      header: '최대 수면 인원',
    },
  ];
  const purchaseColumn = [
    {
      accessorKey: 'purchaseDetailNo',
      header: '상품 번호',
    },
    {
      accessorKey: 'payNo',
      header: '상품 번호',
    },
    {
      accessorKey: 'itemNo',
      header: '카테고리 명',
    },
    {
      accessorKey: 'categoryCode',
      header: '상품 조회수',
    },
    {
      accessorKey: 'categoryName',
      header: '차종',
    },
    {
      accessorKey: 'carName',
      header: '차량 대여 비용',
    },
    {
      accessorKey: 'equipmentName',
      header: '차급',
    },
    {
      accessorKey: 'packageName',
      header: '최대 탑승 인원',
    },
  ];

const OrderDetail = (props) => {
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [payCode, setPayCode] = useState(1);
    const [columns, setColumns] = useState(purchaseColumn);
    
    const changePayCode = (e) => {
        setPayCode(e.target.value);
    
        setColumns(
          e.target.value == '1'
            ? purchaseColumn
            : rentColumn
        );
    
        changeData(e.target.value);
      };

  useEffect(() => {

    const code = searchParams.get("payCode") == null ? 1 :
    searchParams.get("payCode") == '1' ? 1 :2;

    setPayCode(code);

    setColumns(
      code == 1 ? purchaseColumn : rentColumn
    );

    axios
      .get(
        `/manage/orderDetail?payCode=${props.payCode}&payNo=${props.payNo}`
      )
      .then((data) => {
        console.log("야!!!!!!!"+data);
        setData(data.data.payDetail);
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);
  
  const changeData = (payCode) => {
    axios
      .get(`/manage/orderDetail?payCode=${props.payCode}&payNo=${props.payNo}`)
      .then((data) => {
        setData(data.data.payDetail);
      })
      .catch((error) => {
        console.log('error');
      });
  };

  const table = useMaterialReactTable({
    columns,
    data,
    isMultiSortEvent: () => true,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    // @ts-ignore
    getRowId: (row) => row.id,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="삭제">
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
   
  });

  return <MaterialReactTable table={table} />;
}

export default OrderDetail