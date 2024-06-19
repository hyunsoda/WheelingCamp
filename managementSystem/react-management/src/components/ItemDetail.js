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
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);

  // @ts-ignore
  return <>{Array(parseInt(6)).map(() => {})}</>;
};

export default ItemDetail;
