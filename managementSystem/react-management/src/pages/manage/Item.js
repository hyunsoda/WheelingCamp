import axios from "axios";
import React, { useEffect, useState } from "react";

const Car = () => {

    const [itemList, setItemList] = useState([]);

    useEffect(() => {

        axios.get("/manage/item?categoryCode=1")
        .then(res => {
            setItemList(res.data.itemList);
        })
        .catch(error => {
            console.log("error");
        });
    }, []);

    const sortItemList = (e) => {
        
        console.log(e);

        axios.get(`/manage/item?categoryCode=1&sortNo=${e}`)
        .then(res => {
            console.log(res.data.itemList);
            setItemList(res.data.itemList);
        })
        .catch(error => {
            console.log("error");
        });
    }

    return (
        <table border={1}>
            <thead>
                <tr>
                    <th><input type="checkbox" value="1"/></th>
                    <th onClick={() => sortItemList(0)}>상품 번호</th>
                    <th onClick={() => sortItemList(1)}>차량 종류</th>
                    <th onClick={() => sortItemList(2)}>상품 카테고리</th>
                    <th onClick={() => sortItemList(3)}>대여 금액</th>
                    <th onClick={() => sortItemList(4)}>상품 조회수</th>
                    <th onClick={() => sortItemList(5)}>차급</th>
                    <th onClick={() => sortItemList(6)}>최대 탑승 인원</th>
                    <th onClick={() => sortItemList(7)}>취침 가능 인원</th>
                    <th onClick={() => sortItemList(8)}>유종</th>
                    <th onClick={() => sortItemList(9)}>작업</th>
                </tr>
            </thead>
            <tbody>
                {itemList.map(item => {
                    return(
                        <tr>
                            <th><input type="checkbox" value={item.itemNo}/></th>
                            <td>{item.itemNo}</td>
                            <td>{item.carName}</td>
                            <td>{item.categoryName}</td>
                            <td>{item.carRentPrice}</td>
                            <td>{item.itemViewCount}</td>
                            <td>{item.carGradeName}</td>
                            <td>{item.carPassengers}</td>
                            <td>{item.carSleepCapacity}</td>
                            <td>{item.carFuel}</td>
                            <td>
                                <button>수정</button>
                                <button>삭제</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

const Item = () => {

    //const 

    return (
        <>
            <div>통합 검색</div>

            <Car />
        </>
    );
}

export default Item;