import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import OrderDetail from '../../components/OrderDetail';

const purchaseColumn = [
  {
    accessorKey: 'payNo',
    header: '주문번호',
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: 'purchaseNo',
    header: '구매번호',
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: 'paymentId',
    header: '주문ID',
    enableEditing: false,
  },
  {
    accessorKey: 'totalAmount',
    header: '총 개수',
    size: 50,
  },
  {
    accessorKey: 'purchaseDate',
    header: '구매일',
    
  },
  {
    accessorKey: 'purchaseDelFl',
    header: '취소 여부',
    editVariant: 'select',
    editSelectOptions: ['Y', 'N'],
    size: 30,
    Cell: ({ renderedCellValue, row }) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor:
            renderedCellValue == 'N' ? '#238823CC' : '#D2222DCC',
          borderRadius: '0.25rem',
          width: '1.2rem',
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
  {
    accessorKey: 'memberNo',
    header: '구매회원',
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: 'memberName',
    header: '회원 이름',
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: 'itemCount',
    header: '상품 개수',
    enableEditing: false,
    size: 50,
  },
 
];

const rentColumn = [
  {
    accessorKey: 'payNo',
    header: '주문번호',
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: 'rentNo',
    header: '대여번호',
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: 'paymentId',
    header: '주문ID',
    enableEditing: false,
  },
  {
    accessorKey: 'totalAmount',
    header: '총 개수',
    size: 50,
  },
  {
    accessorKey: 'rentDate',
    header: '대여날짜',
    muiEditTextFieldProps: {
      type: 'date',
      InputLabel: null,
      InputLabelProps: { shrink: true },
      required: true,
    },
  },
  {
    accessorKey: 'expectDate',
    header: '예상 반납날짜',
    muiEditTextFieldProps: {
      type: 'date',
      InputLabel: null,
      InputLabelProps: { shrink: true },
      required: true,
    },
  },
  {
    accessorKey: 'rentDelFl',
    header: '대여 취소 여부',
    editVariant: 'select',
    editSelectOptions: ['Y', 'N'],
    size: 40,
    Cell: ({ renderedCellValue, row }) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor:
            renderedCellValue == 'N' ? '#238823CC' : '#D2222DCC',
          borderRadius: '0.25rem',
          width: '1.2rem',
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
  {
    accessorKey: 'expireDate',
    header: '만기일',
    muiEditTextFieldProps: {
      type: 'date',
      InputLabel: null,
      InputLabelProps: { shrink: true },
      required: true,
    },
  },
  {
    accessorKey: 'memberNo',
    header: '구매회원',
    enableEditing: false,
  },
  {
    accessorKey: 'memberName',
    header: '회원 이름',
    enableEditing: false,
  },
  {
    accessorKey: 'itemCount',
    header: '상품 개수',
    enableEditing: false,
    size: 50,
  },
];


const Order = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(purchaseColumn);
  const [payCode, setPayCode] = useState(1);

  const changePayCode = (e) => {
    setPayCode(e.target.value);
    setColumns(
      e.target.value == '1'
        ? purchaseColumn
        : rentColumn
    );

    changeData(e.target.value);
  };

  useEffect(()=>{

    const code = searchParams.get("payCode") == null ? 1 :
    searchParams.get("payCode") == '1' ? 1 :2;

    setPayCode(code);

    setColumns(
      code == 1 ? purchaseColumn : rentColumn
    );

    axios.get(`/manage/order?payCode=${code}`).then((data) => {
      setData(data.data.payList);
    });
  },[]);

  const changeData = (payCode) => {
    axios
      .get(`/manage/order?payCode=${payCode}`)
      .then((data) => {
        setData(data.data.payList);
      })
      .catch((error) => {
        console.log('error');
      });
  };

// 주문 삭제
const openDeleteConfirmModal = async (row) => {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    await axios
      .delete(`/manage/deleteOrder?&payNo=`+data[row.id].payNo)
      .then((result) => {
        result.status == 200
          ? alert('삭제되었습니다.')
          : alert('다시 시도해주세요.');
        
    axios.get(`/manage/order?payCode=${payCode}`).then((data) => {
      setData(data.data.payList);
    });
    });
  }
};

  // 주문 수정
  const handleSaveUser = async ({ values, table }) => {
    await axios
      .put(`/manage/updateOrder?payCode=${payCode}`, null, { params: values })
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
    enableEditing: true,
    defaultColumn: {
      minSize: 20, 
      maxSize: 50, 
      size: 40,
    },
    // @ts-ignore
    getRowId: (row) => row.id,
    onEditingRowSave: handleSaveUser,
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
    }),
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        {['주문 관리', '대여 관리'].map((text, index) => {
          return (
            <Button href={`/order?payCode=${index+1}`}>
              {text}
            </Button>
          );
        })}
      </>
    ),
    renderDetailPanel: ({ row }) => (
      <OrderDetail
        key={row.id}
        // @ts-ignore
        payNo={row.original.payNo}
        payCode={payCode}
        columns={columns}
      />
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="수정">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="삭제" onClick={() => openDeleteConfirmModal(row)}>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
   
   });

  return <MaterialReactTable table={table} />;
};

export default Order;