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
            setData(data.data);
            console.log(data);
           
            setMemberNo(data.data[0].memberNo);
            console.log('네???'+memberNo);
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

      const handleSaveUser = (props) => {
        
////////////////////고쳐야 함

        const updatedData = { ...data, [props.key]: props.value }; // 예시: props에 key와 value가 있다고 가정
        setData(updatedData);
      console.log('확인'+data);
        axios.post("/manage/updateMember", updatedData)
        .then((data) => {
          setData(data.data);
         
      });


        console.log(data[props]);
      };
 ////////////////////고쳐야 함\
    
      const table = useMaterialReactTable({
        columns,
        data,
        getRowId: (row) => row.id,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        enableExpandAll: false, //disable expand all button
        renderDetailPanel: ({ row }) => <MemberDetail {...data[row.id]} />,
    
        muiExpandButtonProps: ({ row, table }) => ({
          onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
        }),
    
        onEditingRowSave: ({ row }) => handleSaveUser(row.id),
      });
       

 



      
    


    return(
      <>
      <TemporaryDrawer/>
    <MaterialReactTable table={table} />
    </>
    );
       
    
};

export default Member;