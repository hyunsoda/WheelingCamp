import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useState } from 'react';
import ItemDetail from '../../components/ItemDetail';

const carColumn = [
  {
    accessorKey: 'itemNo',
    header: '상품 번호',
  },
  {
    accessorKey: 'categoryName',
    header: '카테고리 명',
  },
  {
    accessorKey: 'carName',
    header: '차종',
  },
  {
    accessorKey: 'carRentPrice',
    header: '차량 대여 비용',
  },
  {
    accessorKey: 'carGradeName',
    header: '차급',
  },
  {
    accessorKey: 'carPassengers',
    header: '최대 탑승 인원',
  },
  {
    accessorKey: 'carSleepCapacity',
    header: '최대 수면 인원',
  },
  {
    accessorKey: 'carFuel',
    header: '유종',
  },
  {
    accessorKey: 'itemViewCount',
    header: '상품 조회수',
  },
];

const campEquipmentColumn = [
  {
    accessorKey: 'itemNo',
    header: '상품 번호',
  },
  {
    accessorKey: 'categoryName',
    header: '카테고리 명',
  },
  {
    accessorKey: 'equipmentCategoryName',
    header: '캠핌용품 카테고리',
  },
  {
    accessorKey: 'equipmentName',
    header: '캠핌용품 명',
  },
  {
    accessorKey: 'equipmentRentPrice',
    header: '대여 비용',
  },
  {
    accessorKey: 'equipmentRentCount',
    header: '대여 재고',
  },
  {
    accessorKey: 'equipmentSellPrice',
    header: '판매 가격',
  },
  {
    accessorKey: 'equipmentSellCount',
    header: '판매 재고',
  },
];

const packageColumn = [
  {
    accessorKey: 'itemNo',
    header: '상품 번호',
  },
  {
    accessorKey: 'packageName',
    header: '패키지 명',
  },
  {
    accessorKey: 'packagePrice',
    header: '패키지 대여 가격',
  },
  {
    accessorKey: 'itemViewCount',
    header: '상품 조회수',
  },
];

const Item = () => {
  const [categoryCode, setCategoryCode] = useState(1);
  const [columns, setColumn] = useState(carColumn);
  const [data, setData] = useState([]);

  const changeCategoryCode = (e) => {
    setCategoryCode(e.target.value);

    let result;

    setColumn(
      e.target.value == '1'
        ? carColumn
        : e.target.value == '2'
        ? campEquipmentColumn
        : packageColumn
    );

    changeData(e.target.value);
  };

  useEffect(() => {
    setColumn(carColumn);
    //let data = null;

    axios
      .get(`/manage/item?categoryCode=1`)
      .then((res) => {
        setData(res.data.itemList);
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);

  const changeData = (categoryCode) => {
    axios
      .get(`/manage/item?categoryCode=${categoryCode}`)
      .then((res) => {
        setData(res.data.itemList);
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
    initialState: {
      isFullScreen: true,
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="수정">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="삭제">
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        {['차량 관리', '캠핑용품 관리', '패키지 관리'].map((text, index) => {
          return (
            <Button
              key={index}
              variant="contained"
              value={index + 1}
              onClick={changeCategoryCode}
            >
              {text}
            </Button>
          );
        })}
      </>
    ),
    renderDetailPanel: ({ row }) => (
      <ItemDetail
        key={row.id}
        // @ts-ignore
        itemNo={row.original.itemNo}
        categoryCode={categoryCode}
      />
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Item;
