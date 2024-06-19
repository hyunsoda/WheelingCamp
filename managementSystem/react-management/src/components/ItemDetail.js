import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
        console.log(res.data.carGradeList);
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);

  const updateItem = (e) => {
    console.log(e);
    console.log(e.target.form.serializeArray);

    

    e.preventDefault();
    // axios
    //   .put(`/manage/updateItem`, null, )
    //   .then((res) => {
    //     console.log(res);
    //     setData(res.data.item);
    //     console.log(res.data.carGradeList);
    //   })
    //   .catch((error) => {
    //     console.log('error');
    //   });
  }

  return (
    <form action={`/updateItem`} onSubmit={updateItem}>
      <input type="hidden" name="itemNo" value={props.itemNo}/>
      <table>
        <tbody>
          {props.columns.map((column, index) => {
            return(
              <tr key={index}>
                <th>{column.header}</th>
                <td>
                  {
                    ['itemNo', 'categoryName', 'itemViewCount'].indexOf(column.accessorKey) >= 0 ? 
                    <>{data[column.accessorKey]}</> : 
                    <input name={column.accessorKey} type="text" defaultValue={data[column.accessorKey]}/>
                  }
                </td>
              </tr>
            );
          })}
  
        </tbody>
      </table>
      <button onClick={updateItem}>수정</button>
    </form>
  );
};

export default ItemDetail;
