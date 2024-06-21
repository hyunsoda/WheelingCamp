import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import {
  MaterialReactTable,
  createRow,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useState } from 'react';

const Member = () => {
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
      muiEditTextFieldProps: {
        required: true,
        
        },
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
      muiEditTextFieldProps: {
        required: true,
        },
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
      muiEditTextFieldProps: {
        required: true,
        },
    },
    {
      accessorKey: 'memberEmail',
      header: '이메일',
      muiEditTextFieldProps: {
        required: true,
        },
    },
    {
      accessorKey: 'memberEnrollDate',
      header: '가입일',
      enableEditing: false,
    },
    {
      accessorKey: 'memberPhoneNo',
      header: '전화번호',
      muiEditTextFieldProps: {
      type:'number',
      helperText: "-없이 작성해주세요.",
      required: true,
      },
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
        InputLabel: null,
        InputLabelProps: { shrink: true },
        required: true,
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
  const openDeleteConfirmModal = async (row) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await axios
        .delete('/manage/deleteMember?memberNo=' + data[row.id].memberNo)
        .then((result) => {
          result.status == 200
            ? alert('삭제되었습니다.')
            : alert('다시 시도해주세요.');
          
      axios.get('/manage/selectAllMember').then((data) => {
        setData(data.data);
      });
      });
    }
  };

  // 멤버 생성
  const handleCreateUser = async ({ values, table }) => {

    const requiredProperties = ['memberName','memberNickName','memberId','memberEmail','memberPhoneNo','memberBirth'];
    
    function allRequiredPropertiesDefined(values) {
      for (const prop of requiredProperties) {
        console.log('하이'+values[prop]);
        if (values[prop] === undefined||values[prop]=='') {
          return false;
        }
      }
      return true;
    }
  
    // 모든 필수 속성이 정의되지 않은 경우 알림 후 함수 종료
    if (!allRequiredPropertiesDefined(values)) {
      alert('값을 모두 입력해주세요.');
      return;
    }

    await axios
    .put('/manage/insertMember', null, { params: values })
    .then((result) => {
      
      
      table.setCreatingRow(null);

      axios.get('/manage/selectAllMember').then((data) => {
        setData(data.data);
      });
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
          table.setCreatingRow(createRow(table, { memberDelFl: 'N' }));
        }}
      >
        신규 회원 생성
      </Button>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};
export default Member;
