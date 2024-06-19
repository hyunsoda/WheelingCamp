import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
  createRow,
} from 'material-react-table';
import TemporaryDrawer from './Drawer';
import React from 'react';

const ItemDetail = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `/manage/itemDetail?categoryCode=${props.categoryCode}&itemNo=${props.itemNo}`
      )
      .then((res) => {
        console.log(res);
        setData(res.data.item);
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);

  // @ts-ignore
  return <>{Array(parseInt(6)).map(() => {})}</>;
};

export default ItemDetail;
