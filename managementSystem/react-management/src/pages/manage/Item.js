import { useState } from 'react';
import Car from './Item/Car'
import CampEquipment from './Item/CampEquipment';
import Package from './Item/Package';

const Item = () => {
    const [categoryCode, setCategoryCode] = useState(1);

    const changeCategoryCode = (e) => {
        setCategoryCode(e.target.value);
    }

    return (

        <>
            <button value={1} onClick={changeCategoryCode}>차 관리</button>
            <button value={2} onClick={changeCategoryCode}>캠핑용품 관리</button>
            <button value={3} onClick={changeCategoryCode}>패키지 관리</button>
            {categoryCode == 1 ? <Car /> : ''}
            {categoryCode == 2 ? <CampEquipment /> : ''}
            {categoryCode == 3 ? <Package /> : ''}
        </>
    );
}

export default Item;