import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useState } from 'react';
import axios froimport axios from 'axios';
() => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/manage/item?categoryCode=3')
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

  const table = useMaterialReactTable({
    columns,
    data,
    isMultiSortEvent: () => true,
  });

  return <MaterialReactTable table={table} />;
};

export default Package;
