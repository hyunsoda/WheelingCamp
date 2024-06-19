import { useState } from 'react';

const Car = (props) => {
  const [data, setData] = useState([]);
  const [columnList, setcolumnList] = useState();

  return <>{props.setTableData(columnList)}</>;
};

export default Car;
