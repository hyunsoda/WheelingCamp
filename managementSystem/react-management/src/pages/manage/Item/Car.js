import axios from "axios";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
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

const Car = (props) => {
  const [data, setData] = useState([]);
  const [columnList, setcolumnList] = useState();

  return (
      <>
        {props.setTableData(columnList)}
      </>
    );
};

export default Car;