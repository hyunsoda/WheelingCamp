import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import {
  MaterialReactTable,
  createRow,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail';

const carColumn = [
  {
    accessorKey: 'itemNo',
    header: '상품 번호',
    enableEditing:false,
  },
  {
    accessorKey: 'categoryName',
    header: '카테고리 명',
    enableEditing:false,
  },
  {
    accessorKey: 'itemViewCount',
    header: '상품 조회수',
    enableEditing:false,
  },
  {
    accessorKey: 'carName',
    header: '차종',
    muiEditTextFieldProps: {
      required: true,
      },
  },
  {
    accessorKey: 'carRentPrice',
    header: '차량 대여 비용',
    muiEditTextFieldProps: {
      required: true,
      type:'number',
      },
  },
  {
    accessorKey: 'carGradeName',
    header: '차급',
    editVariant: 'select',
    muiEditTextFieldProps: {
      required: true,
      },
  },
  {
    accessorKey: 'carPassengers',
    header: '최대 탑승 인원',
    muiEditTextFieldProps: {
      required: true,
      type:'number',
      },
  },
  {
    accessorKey: 'carSleepCapacity',
    header: '최대 수면 인원',
    muiEditTextFieldProps: {
      required: true,
      type:'number',
      },
  },
  {
    accessorKey: 'carFuel',
    header: '유종',
    muiEditTextFieldProps: {
      required: true,
      },
  },
];

const campEquipmentColumn = [
  {
    accessorKey: 'itemNo',
    header: '상품 번호',
    enableEditing:false,
  },
  {
    accessorKey: 'categoryName',
    header: '카테고리 명',
    enableEditing:false,
  },
  {
    accessorKey: 'itemViewCount',
    header: '상품 조회수',
    enableEditing:false,
  },
  {
    accessorKey: 'equipmentCategoryName',
    header: '캠핌용품 카테고리',
    editVariant: 'select',
    muiEditTextFieldProps: {
      required: true,
      },
  },
  {
    accessorKey: 'equipmentName',
    header: '캠핌용품 명',
    muiEditTextFieldProps: {
      required: true,
      },
  },
  {
    accessorKey: 'equipmentRentPrice',
    header: '대여 비용',
    muiEditTextFieldProps: {
      required: true,
      type:'number',
      },
  },
  {
    accessorKey: 'equipmentRentCount',
    header: '대여 재고',
    muiEditTextFieldProps: {
      required: true,
      type:'number',
      },
  },
  {
    accessorKey: 'equipmentSellPrice',
    header: '판매 가격',
    muiEditTextFieldProps: {
      required: true,
      type:'number',
      },
  },
  {
    accessorKey: 'equipmentSellCount',
    header: '판매 재고',
    muiEditTextFieldProps: {
      required: true,
      type:'number',
      },
  },
];

const packageColumn = [
  {
    accessorKey: 'itemNo',
    header: '상품 번호',
    enableEditing:false,
  },
  {
    accessorKey: 'categoryName',
    header: '카테고리 명',
    enableEditing:false,
  },
  {
    accessorKey: 'itemViewCount',
    header: '상품 조회수',
    enableEditing:false,
  },
  {
    accessorKey: 'packageName',
    header: '패키지 명',
    muiEditTextFieldProps: {
      required: true,
      },
  },
  {
    accessorKey: 'packagePrice',
    header: '패키지 대여 가격',
    muiEditTextFieldProps: {
      required: true,
      type:'number',
      },
  },
];

const Item = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryCode, setCategoryCode] = useState(1);
  const [columns, setColumn] = useState(carColumn);
  const [data, setData] = useState([]);

  const changeCategoryCode = (e) => {
    setCategoryCode(e.target.value);

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
    const code = searchParams.get("categoryCode") == null ? 1 :
                searchParams.get("categoryCode") == '1' ? 1 :
                searchParams.get("categoryCode") == '2' ? 2 : 3;

    setCategoryCode(code);

    axios
      .get(`/manage/item?categoryCode=${code}`)
      .then((res) => {
        setData(res.data.itemList);

        switch(code) {
          case 1 :
            carColumn[5].editSelectOptions = res.data.carGradeList;
            break;
          case 2 :
            campEquipmentColumn[3].editSelectOptions = res.data.equipmentCategoryList;
            break;
        }

        setColumn(
          code == 1 ? carColumn : 
          code == 2 ? campEquipmentColumn : packageColumn
        );
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

// 아이템
const openDeleteConfirmModal = async (row) => {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    await axios
      .delete(`/manage/deleteItem?&itemNo=`+data[row.id].itemNo)
      .then((result) => {
        result.status == 200
          ? alert('삭제되었습니다.')
          : alert('다시 시도해주세요.');
        
    axios.get(`/manage/item?categoryCode=${categoryCode}`).then((data) => {
      setData(data.data.itemList);
    });
    });
  }
};

  const handleCreateItem = async ({ values, table }) => {

    const unRequiredProperties = ['itemNo', 'categoryName', 'itemViewCount'];
    let requiredProperties = [];
    columns.forEach((column) => {
      if(unRequiredProperties.indexOf(column.accessorKey) < 0) {
        requiredProperties.push(column.accessorKey);
      }
    });
    
    function allRequiredPropertiesDefined(values) {
      for (const prop of requiredProperties) {
        if (values[prop] === undefined||values[prop]=='') {
          console.log("이게 없음 : ", prop);
          return false;
        }
      }
      return true;
    }

    values['itemNo'] = 0;
    values['categoryName'] = categoryCode == 1 ? '자동차' : 
                              categoryCode == 2 ? '캠핑용품' : '패키지';
    values['itemViewCount'] = 0;
    values['categoryCode'] = categoryCode;

    // 모든 필수 속성이 정의되지 않은 경우 알림 후 함수 종료
    if (!allRequiredPropertiesDefined(values)) {
      alert('값을 모두 입력해주세요.');
      return;
    }
  
    await axios
    .put('/manage/insertItem', null, { params: values })
    .then((result) => {
      
      table.setCreatingRow(null);

      axios.get(`/manage/item?categoryCode=${categoryCode}`).then((data) => {
        setData(data.data.itemList);
      });
    });
  
  };

  const table = useMaterialReactTable({
    columns,
    data,
    isMultiSortEvent: () => true,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    onCreatingRowSave: handleCreateItem,
    // @ts-ignore
    getRowId: (row) => row.id,
    defaultColumn: {
      minSize: 20, 
      maxSize: 50, 
      size: 40,
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="삭제">
          <IconButton color="error" value={row.original.itemNo} onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <div style={{marginTop:'10px'}}>
        <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(createRow(table));
          }}
        >
          신규 상품 생성
        </Button>
        {['차량 관리', '캠핑용품 관리', '패키지 관리'].map((text, index) => {
          return (
            <Button 
              href={`/item?categoryCode=${index+1}`}>
              {text}
            </Button>
          );
        })}
      </div>
    ),
    renderDetailPanel: ({ row }) => (
      <ItemDetail
        key={row.id}
        itemNo={row.original.itemNo}
        categoryCode={categoryCode}
        columns={columns}
      />
    ),

  });

  return <MaterialReactTable table={table}/>;
};

export default Item;
