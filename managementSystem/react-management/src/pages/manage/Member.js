import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
  createRow,
} from 'material-react-table';
import TemporaryDrawer from '../../component/Drawer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MemberDetail from '../../component/MemberDetail';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  FormLabel,
  IconButton,
  InputLabel,
  Tooltip,
} from '@mui/material';





const Member = () => {

    const [data, setData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    useEffect(()=>{
        axios.get("/manage/selectAllMember").then((data) => {
          console.log(data.data)
            setData(data.data);
           
        });

        
        
    },[]);

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
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt="avatar"
              height={30}
              width={30}
              src={
                row.original.profileImg
                  ? row.original.profileImg
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            <span
              style={
                row.original.memberId.startsWith('naver') &&
                !row.original.memberPw
                  ? {
                      borderRadius: '0.25rem',
                      backgroundColor: '#2db40033',
                      fontWeight: '600',
                      p: '0.25rem',
                    }
                  : row.original.memberId.startsWith('google') &&
                    !row.original.memberPw
                  ? {
                      borderRadius: '0.25rem',
                      backgroundColor: '#BABCBE4D',
                      fontWeight: '600',
                      p: '0.25rem',
                    }
                  : row.original.memberId.startsWith('kakao') &&
                    !row.original.memberPw
                  ? {
                      borderRadius: '0.25rem',
                      backgroundColor: '#FEE50033',
                      fontWeight: '600',
                      p: '0.25rem',
                    }
                  : { fontWeight: '600' }
              }
            >
              {renderedCellValue}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: 'memberId',
        header: '아이디',
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              textOverflow: 'ellipsis',
              width: '10rem',
              whiteSpace: 'unset',
              overflow: 'hidden',
            }}
          >
            {renderedCellValue}
          </Box>
        ),
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
        enableEditing : false,
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
        muiEditTextFieldProps: {
          
          type: 'date',
          InputLabel : null,
          InputLabelProps:{ shrink: true },
        },
        
      },
      {
        accessorKey: 'memberDelFl',
        header: '탈퇴',
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


    // 멤버 삭제
    const openDeleteConfirmModal = async(row) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        await axios
        .delete('/manage/deleteMember?memberNo='+data[row.id].memberNo)
        .then((result)=>{
          console.log(result);
          result.status==200? alert("삭제되었습니다.") : alert("다시 시도해주세요.");
          window.location.reload();
        });
      }
    };

    

  // 멤버 생성
  const handleCreateUser = async({ values, table }) => {
    
    await axios
    .put('/manage/insertMember', null, { params: values })
    .then((result) => {
      table.setCreatingRow(null);
    });

  };

  // 멤버 수정
  const handleSaveUser = async ({ values, table }) => {
    await axios
      .put('/manage/updateMember', null, { params: values })
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
    getRowId: (row) => row.id,
    onCreatingRowSave: handleCreateUser,
    onEditingRowSave: handleSaveUser,

  
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="수정">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="삭제">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(createRow(table,{ memberDelFl: 'N' }));
        }}
      >
        신규 회원 생성
      </Button>
    ),
  });

  return (
    <>
    <TemporaryDrawer/>
  <MaterialReactTable table={table} />

  </>
  );

};
export default Member;