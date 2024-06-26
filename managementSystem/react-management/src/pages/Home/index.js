import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Info = () => {
  
  const [date,setDate] = useState([]);
  const [memberCount, setMemberCount] = useState([]);
  
  const [viewDate,setViewDate] = useState([]);
  const [carView, setCarView] = useState([]);
  const [equipmentView, setEquipmentView] = useState([]);
  const [packageView, setPackageView] = useState([]);

const data = [
  {
    name: date[0],
    '가입자 수': memberCount[0],
  },
  {
    name: date[1],
    '가입자 수': memberCount[1],

  },
  {
    name: date[2],
    '가입자 수': memberCount[2],

  },
  {
    name: date[3],
    '가입자 수': memberCount[3],

  },
  {
    name: date[4],
    '가입자 수': memberCount[4],

  },
  {
    name: date[5],
    '가입자 수': memberCount[5],

  },
  {
    name: date[6],
    '가입자 수': memberCount[6],

  },
];


const viewData = [
  {
    name: viewDate[0],
    'Car': carView[0],
    'Equipment' : equipmentView[0],
    'Package' : packageView[0],
  },
  {
    name: viewDate[1],
    'Car': carView[1],
    'Equipment' : equipmentView[1],
    'Package' : packageView[1],
  },
  {
    name: viewDate[2],
    'Car': carView[2],
    'Equipment' : equipmentView[2],
    'Package' : packageView[2],
  },
  {
    name: viewDate[3],
    'Car': carView[3],
    'Equipment' : equipmentView[3],
    'Package' : packageView[3],
  },
  {
    name: viewDate[4],
    'Car': carView[4],
    'Equipment' : equipmentView[4],
    'Package' : packageView[4],
  },
  {
    name: viewDate[5],
    'Car': carView[5],
    'Equipment' : equipmentView[5],
    'Package' : packageView[5],
  },
  {
    name: viewDate[6],
    'Car': carView[6],
    'Equipment' : equipmentView[6],
    'Package' : packageView[6],
  },
];
useEffect(()=>{

  axios.get('/manage/memberCount')
  .then((data)=>{
    const dateArr = [];
    const countArr = [];
    for (const i in data.data) {
      dateArr.push(data.data[i].memberEnrollDate);
      countArr.push(data.data[i].memberNo);
    };
    
    
    setDate(dateArr);
    setMemberCount(countArr);
  });
  
  axios.get('/manage/itemViewCount?categoryCode=1')
  .then((data)=>{
    const carArr = [];
    const dateArr = [];
    for(const i in data.data){
      carArr.push(data.data[i].itemViewCount);
      dateArr.push(data.data[i].viewDate);
    }
    setCarView(carArr);
    setViewDate(dateArr);
    
  });
  
  axios.get('/manage/itemViewCount?categoryCode=2')
  .then((data)=>{
    const equipArr = [];
    for(const i in data.data){
      equipArr.push(data.data[i].itemViewCount);
    }
    setEquipmentView(equipArr)
    
  });
  
  axios.get('/manage/itemViewCount?categoryCode=3')
  .then((data)=>{
    const packageArr = [];
    for(const i in data.data){
      packageArr.push(data.data[i].itemViewCount);
    }
    setPackageView(packageArr);
    
  });
  
},[]);

  

  return (
    <>
   
      <div style={{ display: 'flex', justifyContent: 'center',alignItems : 'center', marginTop :'100px' }}>
        <div>
          <h2 style={{display:'flex', justifyContent:'center',fontWeight:'400'}}>New Members</h2>
        <LineChart
          
          width={800}
          height={550}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
    
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="가입자 수" stroke="#82ca9d" activeDot={{ r: 6 }}/>
        </LineChart>
        </div>

          <div>
            <h2 style={{display:'flex', justifyContent:'center', fontWeight:'400' }}>Item Views</h2>
        <LineChart
          width={800}
          height={550}
          data={viewData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Car" stroke="#8884d8" activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Equipment" stroke="#82ca9d" activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Package" stroke="#82a3ca " activeDot={{ r: 6 }} />
        </LineChart>
        </div>
        </div>
    </>
  );
};

export default Info;
