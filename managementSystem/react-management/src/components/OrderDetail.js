import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useSearchParams } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

const rentColumn = [
    {
      accessorKey: 'itemNo',
      header: '상품 번호',
      size: 50,
      enableEditing: false,
    },
    {
      accessorKey: 'rentDetailNo',
      header: '대여번호',
      enableEditing: false,
    },
    {
      accessorKey: 'categoryName',
      header: '카테고리',
      size: 50,
      enableEditing: false,
    },
    {
      accessorKey: 'carName',
      header: '차명',
      enableEditing: false,
    },
    {
      accessorKey: 'equipmentName',
      header: '캠핑용품명',
      enableEditing: false,
    },
    {
      accessorKey: 'packageName',
      header: '패키지명',
      enableEditing: false,
    },
    {
      accessorKey: 'returnFl',
      header: '반납여부',
      size: 50,
      editVariant: 'select',
      editSelectOptions: ['Y', 'N'],
      size: 40,
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor:
              renderedCellValue == 'N' ? '#D2222DCC' :  '#238823CC',
            borderRadius: '0.25rem',
            width: '1.2rem',
            display: 'flex',
            justifyContent: 'center',
            p: '0.25rem',
            color: '#fff',
            fontWeight: 'bold',
            gap: '1rem',
          }}
          >
          {renderedCellValue}
        </Box>
      ),
    },
  ];
  const purchaseColumn = [
    {
      accessorKey: 'purchaseDetailNo',
      header: '구매 번호',
      size: 50,
      enableEditing: false,
    },
    {
      accessorKey: 'payNo',
      header: '상품 번호',
      size: 50,
      enableEditing: false,
    },
    {
      accessorKey: 'itemNo',
      header: '상품번호',
      size: 50,
      enableEditing: false,
    },
    {
      accessorKey: 'categoryName',
      header: '카테고리',
      size: 50,
      enableEditing: false,
    },
    {
      accessorKey: 'carName',
      header: '차명',
      size: 50,
      enableEditing: false,
    },
    {
      accessorKey: 'equipmentName',
      header: '캠핑용품명',
      size: 50,
      enableEditing: false,
    },
    {
      accessorKey: 'packageName',
      header: '패키지명',
      size: 50,
      enableEditing: false,
    },
    {
      accessorKey: 'purchaseDetailDelFl',
      header: '취소여부',
      editVariant: 'select',
      editSelectOptions: ['Y', 'N'],
      size: 40,
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor:
              renderedCellValue == 'N' ? '#238823CC' : '#D2222DCC' ,
            borderRadius: '0.25rem',
            width: '1.2rem',
            display: 'flex',
            justifyContent: 'center',
            p: '0.25rem',
            color: '#fff',
            fontWeight: 'bold',
            gap: '1rem',
          }}
          >
          {renderedCellValue}
        </Box>
      ),
    },
  ];

const OrderDetail = (props) => {
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [payCode, setPayCode] = useState(props.payCode);
    const [columns, setColumns] = useState(purchaseColumn);
    const [payNo, setPayNo] = useState();



  useEffect(() => {
    setColumns(
      props.payCode == 1
        ? purchaseColumn
        : rentColumn
    );



    axios
      .get(
        `/manage/orderDetail?payCode=${props.payCode}&payNo=${props.payNo}`
      )
      .then((data) => {
        setData(data.data.payDetail);
        setPayCode(props.payCode);
    
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);

  const changeData = () => {
 
    axios
      .get(`/manage/orderDetail?payCode=${props.payCode}&payNo=${props.payNo}`)
      .then((data) => {
        setData(data.data.payDetail);

        
      })
      .catch((error) => {
        console.log('error');
      });
  };

  const handleSaveUser = async ({ values, table }) => {
    await axios
      .put('/manage/updateOrderDetail', null, { params: values })
      .then((result) => {
        table.setEditingRow(null);
      });
  };

  const table = useMaterialReactTable({
    columns,
    data,
    isMultiSortEvent: () => true,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    
    muiTableHeadCellProps: {
      //no useTheme hook needed, just use the `sx` prop with the theme callback
      sx: (theme) => ({
        backgroundColor : theme.palette.grey[400],
        color: theme.palette.text.primary,
      }),
    },
    enableRowNumbers: true,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    defaultColumn: {
      minSize: 20, 
      maxSize: 50, 
      size: 40,
    },
    enableEditing: true,
    onEditingRowSave: handleSaveUser,
    // @ts-ignore
    getRowId: (row) => row.id,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
       
     <Tooltip title="수정">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>

      </Box>
    ),

  });

  return <MaterialReactTable table={table} />;
}

export default OrderDetail