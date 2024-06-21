import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const ItemDetail = (props) => {
  const [data, setData] = useState([]);
  const [carGradeList, setCarGradeList] = useState([]);
  const [imgTitleList] = useState([
    '대표 사진',
    '상세1',
    '상세2',
    '상세3',
    '상세4',
  ]);
  const [itemImageList, setItemImageList] = useState(['', '', '', '', '']);
  const fileRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        `/manage/itemDetail?categoryCode=${props.categoryCode}&itemNo=${props.itemNo}`
      )
      .then((res) => {
        console.log(res);
        setData(res.data.item);
        setCarGradeList(res.data.carGradeList);

        console.log(res.data.carGradeList);

        res.data.item.itemImageList.forEach((e, index) => {
          console.log(e);
          console.log(index);

          itemImageList[index] = e.imgPath + e.imgRename;
        });
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);

  const updateItem = (e) => {
    e.preventDefault();

    let item = {};
    let itemImage = [];
    console.log("imageList : ", itemImageList);
    
    let formData = new FormData();
    e.target.querySelectorAll('input').forEach((input) => {
      if (input.type != 'file') {
        item[input.name] = input.value;
      } else {
        if (input.files.length > 0) {
          formData.append("itemImage", input.files[0]);
        }
      }
    });

    formData.append("itemImage", itemImage);
    formData.append("item", new Blob( [JSON.stringify(item) ], { type: 'application/json' } ));

    axios
      .put(`/manage/updateItem`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res.data);

        if(res.data > 0) {
          alert("수정 되었습니다.!");
        } else {
          alert("수정 실패;;;");
        }
      })
      .catch((error) => {
        console.log('error');
      });
  };

  const blockChangImage = (index, e) => {
    console.log(itemImageList);
    if (index > 0) {
      if (itemImageList[index - 1] == '') {
        e.preventDefault();
        alert('앞에 사진을 먼저 업로드 해주세요;;');
      }
    }
  };

  const changeImg = (index, e) => {
    console.log(e.target.files[0]);
    console.log(index);
    let value = URL.createObjectURL(e.target.files[0]);
    const newItemImageList = [...itemImageList];
    newItemImageList[index] = value;

    setItemImageList(newItemImageList);
  };

  const handleClick = () => {
    fileRef?.current?.click();
  }

  return (
    <form onSubmit={updateItem}>
      <input type="hidden" name="itemNo" value={props.itemNo} />
      <input type="hidden" name="categoryCode" value={props.categoryCode} />
      <table>
        <tbody>
          {props.columns.map((column, index) => {
            return (
              <tr key={column}>
                <th>{column.header}</th>
                <td>
                  {['itemNo', 'categoryName', 'itemViewCount'].indexOf(
                    column.accessorKey
                  ) >= 0 ? (
                    <>{data[column.accessorKey]}</>
                  ) : (
                    <input
                      name={column.accessorKey}
                      type="text"
                      defaultValue={data[column.accessorKey]}
                    />
                  )}
                </td>
              </tr>
            );
          })}

          <tr>
            <th>이미지</th>
            <td>
              <ul>
                {imgTitleList.map((title, index) => {
                  return (
                    <>
                      <li>
                        <div>{title}</div>
                        <input
                          hidden
                          ref={fileRef}
                          type="file"
                          onChange={(e) => {
                            changeImg(index, e);
                            console.log("변경");
                          }}
                        />
                        <img 
                          onClick={handleClick}
                          src={itemImageList[index] == '' ?
                          'https://velog.velcdn.com/images/a_in/post/480497cc-10a8-4186-a052-a6b825ef487f/image.png' :
                          itemImageList[index]} />
                      </li>
                    </>
                  );
                })}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <button>수정</button>
    </form>
  );
};

export default ItemDetail;
