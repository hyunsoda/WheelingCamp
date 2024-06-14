import axios from "axios";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";

const Car = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/manage/item?categoryCode=1")
        .then(res => {
            setData(res.data.itemList);
        })
        .catch(error => {
            console.log("error");
        });
    }, []);

  const columns = [
    {
      accessorKey: 'itemNo',
      header: '상품 번호',
    },
    {
      accessorKey: 'categoryName',
      header: '카테고리 명',
    },
    {
      accessorKey: 'carName',
      header: '차종',
    },
    {
      accessorKey: 'carRentPrice',
      header: '차량 대여 비용',
    },    
    {
      accessorKey: 'carGradeName',
      header: '차급',
    },
    {
      accessorKey: 'carPassengers',
      header: '최대 탑승 인원',
    },
    {
      accessorKey: 'carSleepCapacity',
      header: '최대 수면 인원',
    },
    {
      accessorKey: 'carFuel',
      header: '유종',
    },
    {
      accessorKey: 'itemViewCount',
      header: '상품 조회수',
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    renderDetailPanel: ({ row }) => <ItemDetail itemNo={row.original.itemNo} categoryNo={1}/>,
        muiExpandButtonProps: ({ row, table }) => ({
          onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), 
    }),
  });

  return <MaterialReactTable table={table} />;
};

export default Car;