# WheelingCamp


```
차박 용품 대여/판매 웹 어플리케이션 프로젝트, 
Wheeling Camp의 프로젝트 레포지토리입니다.

가능한 새로운 기술을 접목시켜보고자 구상한 차박 관련 정보 제공 및 차량/물품 구매/대여 사이트입니다.
적극적으로 React 와 같은 새로운 프레임워크를 사용했고 추가적으로
Open AI, Kakao Map, Login(Kakao, Google, Naver), Naver Clova OCR, I'm Port 를 포함하는 API 등
다양한 API를 활용하였습니다.

기본적인 Spring Boot 를 기반으로 Oracle Cloud DB와 Mybatis 를 이용하여 쇼핑몰의 필수적인 기능
(구매 / 판매 / 상품 관리 / 회원 관리 결제등..)이 가능하고 각 기능에 대하여 CRUD 가능하도록 설계했습니다.

인원 : 6명
개발 기간 : 2024.04.20 ~ 2024.06.27
상세 역할 : DB 모델링 및 관리, 소셜 로그인 (네이버 로그인), 아이템 상세 페이지, 
관리자 페이지 (메인 페이지 / 멤버 관리 및 수정 / 주문내역 관리 및 수정)
```

---
## 개발 환경
  
| Environment | Detail |
| --- | --- |
| 환경 | Windows, Linux |
| 언어 | Java, Javascript, HTML5, CSS3, jQuery, Oracle SQL |
| 프레임워크 / 라이브러리|  Bootstrap5, Spring Boot, React.js, MUI, Rechart, Material React Table V2, Node.js |
| 데이터베이스 | Oracle XE, Oracle Cloud, Mybatis | 
| 툴 | Spring Tools 4, Spline 3D, DBeaver, Postman |
| WAS | Apache Tomcat, AWS, Vercel |
| API | Kakao Mobility, Kakao Map, Open AI, Clova OCR, Login(Kakao, Google, Naver) |
| 협업 | Github, Notion, ERD Cloud, Draw.io, Figma |
<br>

## 소셜 로그인 - 네이버 로그인

![블루 베이지 깔끔한 면접팔표 프레젠테이션 (1)](https://github.com/user-attachments/assets/d303424e-243d-4b8f-a008-9bc542fbae3d)
![블루 베이지 깔끔한 면접팔표 프레젠테이션 (2)](https://github.com/user-attachments/assets/aef259a6-6728-4995-b78c-494d3fb36886)

네이버 로그인 시 MEMBER 테이블과 비교
  - 신규 회원일 경우 회원가입 진행
  - 이미 가입된 회원일 경우 로그인 진행

## 아이템 상세 페이지 
![블루 베이지 깔끔한 면접팔표 프레젠테이션 (3)](https://github.com/user-attachments/assets/1a0673f6-cf7f-455d-8324-e184345d4031)

아이템의 상세 정보를 볼 수 있는 페이지

1. <strong>달력</strong>
- 대여할 날짜를 선택
  - 과거의 날짜는 선택할 수 없게 설정
  - 예약 기간에 따라 총 결제 금액 계산
2. <strong>리뷰</strong>
  - 작성된 리뷰 조회 및 로그인 된 회원의 경우 리뷰 작성 가능
3. <strong>추천 상품</strong>
  - 이 상품을 추천해요
    - 추천하는 상품과 같은 카테고리에서 해당 상품을 제외하고 조회수가 높은 순서대로 추천
  - 추천하는 패키지 상품
    - 해당 상품이 포함되어 있는 패키지 상품 중에서 조회 수가 높은 순서대로 추천          

---
<br>

# 관리자페이지
React, Spring, Java, axios, Material-UI 사용

## 로그인
![블루 베이지 깔끔한 면접팔표 프레젠테이션 (4)](https://github.com/user-attachments/assets/1e4085ba-50f0-4b50-a680-a3f54bb9694e)
1. <strong>로그인이 되어있지 않은 경우</strong> 
  - 로그인 화면으로 이동
  - 메인 화면에서 로그인 시 sessionStorage에 loginMember저장

2. <strong>로그인이 되어있는 경우 </strong>
  - 기본 메인페이지로 이동

## 메인 페이지 
![블루 베이지 깔끔한 면접팔표 프레젠테이션 (5)](https://github.com/user-attachments/assets/9b41340d-2215-4b6f-8d8d-df6d94d4bd45)
1. <strong>로그아웃 버튼 클릭 시 </strong>
  - session Storage의 loginMember를 삭제하며 로그인 화면으로 이동

2. <strong>일 별 신규 가입된 회원의 수 통계</strong>
3. <strong>일 별, 카테고리 별 조회수 통계</strong>
  - 매일 아침 9시 일일 조회수를 계산하여 테이블에 조회수 데이터가 삽입
  
## 회원 관리
![KakaoTalk_20240718_163842069](https://github.com/user-attachments/assets/e9be5c9a-a6c1-4c1e-9fba-fc0a4adb29fe)
1. <strong>회원 조회</strong>
  - 전체 회원의 비밀번호를 제외한 회원 정보를 조회
2. <strong>회원 생성</strong>
  - 필요 정보를 받아 MEMBER 테이블에 추가
  - password는 기본 pass01로 통일
3. <strong>회원 수정</strong>
  - 수정이 필요한 정보들을 수정 후 save를 누르면 해당 멤버의 정보 수정
  - 수정하면 안 되는 정보의 경우 
             enableEditing : False를 통해 
             수정할 수 없도록 처리
4. <strong>회원 삭제</strong>
  - memberDelFl를 Y로 변경해야 하는 경우
               회원 수정을 통해 처리 가능
  - 회원을 아예 삭제해야 하는 경우
             alert창이 뜨고 확인을 누르면 
             MEMBER테이블에서 삭제 가능

## 주문 관리
![블루 베이지 깔끔한 면접팔표 프레젠테이션 (7)](https://github.com/user-attachments/assets/171bf025-f59e-49d5-a17c-ccc89f56f8b9)

1. <strong>주문, 대여 전체 조회</strong>
  - 주문 및 대여 내역, 취소 여부, 구매한 회원들 필요 정보 조회
  - 주문 관리와 대여 관리 탭을 선택해서 조회 가능
2. <strong>주문 내역 수정</strong>
  - 수정이 필요한 정보들을 수정 후 
              save를 누르면 저장
  - 수정하면 안 되는 정보의 경우 
             enableEditing : False를 통해 
             수정할 수 없도록 처리
3. <strong>주문 삭제</strong>
  - purchaseDelFl을 Y로 변경해야 하는 경우
                 주문 수정을 통해 처리 가능
  - 주문을 아예 삭제해야 하는 경우 alert창이 뜨고 
              확인을 누르면 테이블에서 정보 완전 삭제 가능
4. <strong>주문 상세 내역 조회</strong>
  - 주문 내역 안에 상세한 개별 내역들을 조회
5. <strong>주문 상세 내역 수정</strong>
  - 구매의 경우 개별 취소가 존재할 경우 취소 여부를 Y 혹은 N으로
                변경 가능
  - 대여의 경우 반납관리 필요 -> 반납 여부 Y 혹은 N으로 변경 가능
---
## Trouble Shooting

### 문제점
![블루 베이지 깔끔한 면접팔표 프레젠테이션 (8)](https://github.com/user-attachments/assets/647cef7e-5328-4c1f-9c5b-8a300f61ec36)
<br>
- React를 사용하여 주문을 수정하는 과정에서 axios를 통해 서버에 요청을 보낼 때 수정된 데이터를 함께 보내야 함
- values라는 이름으로 받아서 바로 보내려했지만 서버에서 값이 제대로 세팅되지 않는 문제를 발견
 
### 해결
![블루 베이지 깔끔한 면접팔표 프레젠테이션 (8)](https://github.com/user-attachments/assets/1a30dea4-a736-4d8e-ada0-6b6f058809f8)
<br>
- 내가 보내고자 하는 데이터가 Object라는 data 안에 감싸여있는 형태인 것을 확인
  - axios에서 data를 쿼리로 변환해주지 않음을  알게됨

- axios.put의 기본 형태는 axios.put(‘URL’, data [,config]) 
  - 여기서 data 에 object를 넣어야 함
    <br>
    ➡   두 번째 인자에 null을 주고 세 번째 인자에 전달하고자 하는 매개변수를 넣음
## 느낀점
- 소셜 로그인 api를 사용해보며 토큰을 이용해 정보를 가져오는 방법을 배울 수 있었다
- 아이디어 제안부터 실제 서비스 배포까지의 과정에서 여러 종류의 에러와 트러블을 직접 마주하고 해결해볼 수 있었던 점이 성장에 도움이 된 것 같다. 또한 그 과정에서 팀원들과 서로 도와주고 격려하는 과정에서 의사소통과 협업 능력을 배울 수 있었다.
- React를 사용하며 상태에 대해 더 자세히 알게되었다.
  
