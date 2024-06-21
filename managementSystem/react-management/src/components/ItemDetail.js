import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    //const item = new FormData();
    e.target.querySelectorAll('input').forEach((input) => {
      if (input.type != 'file') {
        // item.append(input.name, input.value);
        // console.log(input.name + '파일')

        item[input.name] = input.value;
      } else {
        if (input.files.length > 0) {
          // item.append(input.name, input.files[0]);
          // console.log(input.files);
          // console.log(input.files[0]);

          item[input.name] = input.files[0];
        }
      }
    });

    console.log('여기');
    //console.log(item.get('order0'));

    // for (const key in item) {
    //   if(item[key].length == 0) {
    //     alert(key + '값을 입력해 주세요 ;;')
    //     return;
    //   }
    // }

    console.log(carGradeList);

    // if(carGradeList.indexOf(item['carGradeName']) == -1) {
    //   alert("차급은 [소형, 중형, 대형, 캠핑카] 중에 하나로 해주세요!");
    //   return;
    // }

    item['carGradeNo'] = carGradeList.indexOf(item['carGradeName']) + 1;
    //item.append('carGradeNo', carGradeList.indexOf(item.get('carGradeName')) + 1);

    console.log(item);

    axios
      .put(`/manage/updateItem`, { item: item })
      .then((res) => {
        if (res <= 0) {
          alert('수정이 실패했습니다.');
        } else {
          alert('수정 되었습니다.');
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
                          name={'order' + index}
                          type="file"
                          onClick={(e) => {
                            blockChangImage(index, e);
                          }}
                          onChange={(e) => {
                            changeImg(index, e);
                          }}
                        />
                        <img src={itemImageList[index]} />
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
