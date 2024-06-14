import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,

} from 'material-react-table';
import TemporaryDrawer from '../../component/Drawer';
import MemberDetail from '../../component/MemberDetail';
import { Typography } from '@mui/material';





const Member = () => {

    const [data, setData] = useState([]);
    const [memberNo,setMemberNo] = useState('');
    useEffect(()=>{
        axios.get("/manage/selectAllMember").then((data) => {
          console.log(data)
            setData(data.data);
            setMemberNo(data.data.memberNo);
        });
        
    },[]);


    const columns = useMemo(() => [
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
          accessorKey: 'memberEmail',
          header: '이메일',
        },
        {
          accessorKey: 'memberPhoneNo',
          header: '전화번호',
        },
        {
          accessorKey: 'memberNickName',
          header: '닉네임',
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
          accessorKey: 'memberEnrollDate',
          header: '가입일',
        },
        {
          accessorKey: 'memberDelFl',
          header: '탈퇴',
        },
        {
          accessorKey: 'license',
          header: '면허 여부',
        }
      ]);


      const table = useMaterialReactTable({
        columns,
        data,
        enableExpandAll: false, //disable expand all button
        renderDetailPanel: ({ row }) =><MemberDetail {...data[row]}/>,
              
        muiExpandButtonProps: ({ row, table }) => ({
          onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
        }),
       

      });



      
    


    return(
      <>
      <TemporaryDrawer/>
    <MaterialReactTable table={table} />
    </>
    );
       
    
};

export default Member;