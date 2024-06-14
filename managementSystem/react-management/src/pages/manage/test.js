import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const Test = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/manage/selectAllMember').then((result) => {
      console.log('확인 : '+result.data);
      setData(result.data);
    });
  }, []);

  const columns = [
    {
      accessorKey: 'memberNo',
      header: '회원 번호',
    },
    {
      accessorKey: 'memberId',
      header: '아이디',
    },
    {
      accessorKey: 'memberName',
      header: '이름',
    },    
    {
      accessorKey: 'memberDelFl',
      header: '탈퇴',
    },
    {
      accessorKey: 'license',
      header: '면허 여부',
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    isMultiSortEvent: () => true,
  });

  return <MaterialReactTable table={table} />;
};

export default Test;