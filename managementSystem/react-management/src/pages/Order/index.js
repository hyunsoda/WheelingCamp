import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useState } from 'react';

const Order = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('/manage/selectAllMember').then((data) => {
      console.log(data.data);
      setData(data.data);
    });
  }, []);

  const columns = [
    {
      accessorKey: 'memberNo',
      header: 'No',
      enableEditing: false,
      size: 40,
    },
    {
      accessorKey: 'memberNickName',
      header: '닉네임',
    },
    {
      accessorKey: 'memberId',
      header: '아이디',
    },
    {
      accessorKey: 'memberName',
      header: '이름',
      size: 40,
    },
    {
      accessorKey: 'memberEmail',
      header: '이메일',
    },
    {
      accessorKey: 'memberEnrollDate',
      header: '가입일',
      enableEditing: false,
    },
    {
      accessorKey: 'memberPhoneNo',
      header: '전화번호',
    },
    {
      accessorKey: 'memberAddress',
      header: '주소',
    },
    {
      accessorKey: 'memberBirth',
      header: '생년월일',
    },
    {
      accessorKey: 'memberDelFl',
      header: '탈퇴',
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    isMultiSortEvent: () => true,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default Order;
