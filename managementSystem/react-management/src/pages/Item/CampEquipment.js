import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useState } from 'react';

const CampEquipment = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/manage/item?categoryCode=2')
      .then((res) => {
        setData(res.data.itemList);
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);

  const columns = [
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

  const table = useMaterialReactTable({
    columns,
    data,
    isMultiSortEvent: () => true,
  });

  return <MaterialReactTable table={table} />;
};

export default CampEquipment;
