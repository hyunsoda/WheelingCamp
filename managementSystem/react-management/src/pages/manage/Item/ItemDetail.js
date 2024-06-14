import axios from "axios";
import { useEffect, useState } from "react";

const ItemDetail = (props) => {

    const [categoryCode] = useState(props.categoryCode);
    const [itemNo] = useState(props.itemNo);
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(`/manage/itemDetail?itemNo=${1}&categoryCode=1`)
        .then(res => {
            setData(res.data.item);
            console.log(res.data.item);
        })
        .catch(error => {
            console.log("error");
        });
    }, []);

    return(
        <h1>{itemNo}
            {console.log("data : " + data.carName)}
        </h1>
    );
}

export default ItemDetail;