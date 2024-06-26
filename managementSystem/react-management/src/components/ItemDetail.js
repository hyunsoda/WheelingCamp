import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const ItemDetail = (props) => {
  const [data, setData] = useState([]);

  const [carGradeList, setCarGradeList] = useState([]);
  const [equipmentCategoryList, setEquipmentCategoryList] = useState([]);

  const [imgTitleList] = useState([
    '대표 사진',
    '상세1',
    '상세2',
    '상세3',
    '상세4',
  ]);
  const [itemImageList, setItemImageList] = useState([]);
  const [imageBlobList, setImageBlobList] = useState([{}, {}, {}, {}, {}]);
  const fileRef = useRef([]);

  const defalutImg 
  = 'https://velog.velcdn.com/images/a_in/post/480497cc-10a8-4186-a052-a6b825ef487f/image.png';

  useEffect(() => {
    axios
      .get(
        `/manage/itemDetail?categoryCode=${props.categoryCode}&itemNo=${props.itemNo}`
      )
      .then((res) => {
        setData(res.data.item);
        
        switch(props.categoryCode) {
          case 1 : setCarGradeList(res.data.carGradeList); break;
          case 2 : setEquipmentCategoryList(res.data.equipmentCategoryList); break;
        }

        let tempUrlList = ['', '', '', '', ''];
        res.data.item.itemImageList.forEach((e, index) => {
          tempUrlList[index] = e.imgPath + e.imgRename;
        });
        
        requestBlob(res.data.item.itemImageList);
        setItemImageList(tempUrlList);
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);

  const updateItem = (e) => {
    e.preventDefault();

    let item = {};
    
    let formData = new FormData();
    e.target.querySelectorAll('input').forEach((input) => {
      if (input.type != 'file') {
        item[input.name] = input.value;
      }
    });

    imageBlobList.forEach(e => {
      if(e != null) {
        formData.append("itemImage", e);
      }
    });

    console.log(imageBlobList);
    
    switch(props.categoryCode) {
      case 1:
        item["carGradeNo"] = carGradeList.indexOf(item.carGradeName) + 1;

        if(item["carGradeNo"] <= 0) {
          alert("소형, 중형, 대형, 캠핑카 중 1개만 입력해 주세요");
          return;
        }
        break;
      case 2 :
        item["equipmentCategoryCode"] = equipmentCategoryList.indexOf(item.equipmentCategoryName) + 1;

        if(item["equipmentCategoryCode"] <= 0) {
          alert("캠핑용품 카테고리 내의 카테고리만 입력해 주세요");
          return;
        }
        break;
    }
    
    formData.append("item", new Blob( [JSON.stringify(item) ], { type: 'application/json' } ));

    axios
      .put(`/manage/updateItem`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        if(res.data > 0) {
          alert("수정 되었습니다.");
        } else {
          alert("수정 실패");
        }
      })
      .catch((error) => {
        console.log('error');
      });
  };

  const blockChangImage = (e, index) => {
    if (index > 0) {
      if (itemImageList[index - 1] == '') {
        e.preventDefault();
        alert('앞에 사진을 먼저 업로드 해주세요');
        return true;
      }
    }

    return false;
  };

  const changeImg = (index, e) => {
    let value = URL.createObjectURL(e.target.files[0]);
    const newItemImageList = [...itemImageList];
    const newImageBlobList = [...imageBlobList];
    newItemImageList[index] = value;
    newImageBlobList[index] = e.target.files[0];

    setItemImageList(newItemImageList);
    setImageBlobList(newImageBlobList);
  };

  const handleClick = (e, index) => {
    if(blockChangImage(e, index)) {
      return;
    }
    fileRef[index]?.click();
  }

  const deleteImg = (e, index) => {
    const img = e.target.parentNode.querySelector('img');

    if(img.src == defalutImg) {
      return;
    }

    if (index >= 0 && index < 4) {
      if (itemImageList[index + 1] != '') {
        e.preventDefault();
        alert('뒤에 사진을 먼저 삭제 해주세요');
        return;
      }
    }
    
    if(!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    img.src = defalutImg;

    console.log(itemImageList);

    console.log(imageBlobList);

    let newItemImageList = [...itemImageList];
    newItemImageList[index] = '';

    let newImageBlobList = [...imageBlobList];
    newImageBlobList[index] = {};

    console.log("before");

    console.log(newItemImageList);
    console.log(itemImageList);

    console.log(newImageBlobList);
    console.log(imageBlobList);

    setItemImageList(newItemImageList);
    setImageBlobList(newImageBlobList);
  }

  const requestBlob = (blobList, index) => {
    console.log("????");
    console.log(blobList);

    const tempFileList = [{}, {}, {}, {}, {}];
    blobList.forEach((e, index) => {
      let imageUrl = e.imgPath + e.imgRename;

      fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        let file = new File([blob], e.imgRename, { type: blob.type, lastModified: Date.now() });
        tempFileList[index] = file;
      })
      .catch(error => console.error('Blob 변환 중 오류 발생', error));
    });

    setImageBlobList(tempFileList);
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
                        <button onClick={e => deleteImg(e, index)} type='button'>X</button>
                        <input
                          hidden
                          ref={e => fileRef[index] = e}
                          type="file"
                          onChange={(e) => {
                            changeImg(index, e);
                          }}
                        />
                        <img 
                          width='500px'
                          height='250px'
                          onClick={e => handleClick(e, index)}
                          src={itemImageList[index] == '' ?
                          defalutImg :
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
