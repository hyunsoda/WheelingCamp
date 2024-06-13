--뱃지 테이블 생성

CREATE TABLE "BADGE" (
	"BADGE_NO"	NUMBER		NOT NULL,
	"BADGE_NAME"	NVARCHAR2(50)		NOT NULL,
	"BADGE_CONTENTS"	NVARCHAR2(200)		NOT NULL,
	"BADGE_IMG"	NVARCHAR2(300)		NOT NULL
);

COMMENT ON COLUMN "BADGE"."BADGE_NO" IS '뱃지 번호(PK)';

COMMENT ON COLUMN "BADGE"."BADGE_NAME" IS '뱃지 이름';

COMMENT ON COLUMN "BADGE"."BADGE_CONTENTS" IS '뱃지 내용';

COMMENT ON COLUMN "BADGE"."BADGE_IMG" IS '뱃지 이미지 경로';

-- 뱃지 번호 시퀀스 생성
CREATE SEQUENCE SEQ_BADGE_NO;

-- 뱃지 PK 설정
ALTER TABLE "BADGE" ADD CONSTRAINT "PK_BADGE" PRIMARY KEY (
   "BADGE_NO"
);

-----------------------------------------------------------------
-- 회원 뱃지 테이블 생성
CREATE TABLE "MEMBER_BADGE" (
	"MEMBER_BADGE_NO"	NUMBER		NOT NULL,
	"BADGE_NO"	NUMBER		NOT NULL,
	"MEMBER_NO"	NUMBER		NOT NULL,
	"BADGE_DATE"	DATE	DEFAULT SYSDATE	NOT NULL,
	"BADGE_FL"	CHAR(1)	DEFAULT 'N'	NOT NULL
);

COMMENT ON COLUMN "MEMBER_BADGE"."MEMBER_BADGE_NO" IS '회원 뱃지 번호(PK)';

COMMENT ON COLUMN "MEMBER_BADGE"."BADGE_NO" IS '뱃지 번호(FK)';

COMMENT ON COLUMN "MEMBER_BADGE"."MEMBER_NO" IS '회원 번호(FK)';

COMMENT ON COLUMN "MEMBER_BADGE"."BADGE_DATE" IS '뱃지 획득 날짜';

COMMENT ON COLUMN "MEMBER_BADGE"."BADGE_FL" IS '뱃지획득여부(N/Y)';




-- 회원뱃지 번호 시퀀스 생성
CREATE SEQUENCE SEQ_MEMBER_BADGE_NO;

-- 회원뱃지 PK 설정
ALTER TABLE "MEMBER_BADGE" ADD CONSTRAINT "PK_MEMBER_BADGE" PRIMARY KEY (
   "MEMBER_BADGE_NO"
);

--회원 뱃지 FK 설정
ALTER TABLE "MEMBER_BADGE" ADD CONSTRAINT "FK_MEBER_TO_MEMBER_BADGE" FOREIGN KEY(
	"MEMBER_NO"
)
REFERENCES "MEMBER"(
	"MEMBER_NO"
);

ALTER TABLE "MEMBER_BADGE" ADD CONSTRAINT "FK_BADGE_TO_MEMBER_BADGE" FOREIGN KEY(
	"BADGE_NO"
)
REFERENCES "BADGE"(
	"BADGE_NO"
);


---------------------------------------------------------------------------------------------

-- 회원 가입 시 자동으로 뱃지 부여 트리거 생성(회원 데이터 삽입전 실행하기)

-- 트리거 생성(wheelingcamp 관리자 계정으로 생성)
CREATE  OR REPLACE TRIGGER JOIN_AWARD_BADGES_TRIGGER
AFTER INSERT ON MEMBER
FOR EACH ROW
BEGIN
    -- 새 회원의 회원 번호 가져오기
    DECLARE
        new_member_no NUMBER;
    BEGIN
        SELECT :NEW.MEMBER_NO INTO new_member_no FROM DUAL;
        
        -- 뱃지 테이블의 모든 뱃지 조회
        FOR badge_list IN (SELECT BADGE_NO FROM BADGE) LOOP
            -- 뱃지를 MEMBER_BADGE 테이블에 삽입 (BADGE_FL은 'N'으로 설정)
            INSERT INTO MEMBER_BADGE (MEMBER_BADGE_NO,BADGE_NO, MEMBER_NO, BADGE_DATE, BADGE_FL)
            VALUES (SEQ_MEMBER_BADGE_NO.NEXTVAL,badge_list.BADGE_NO, new_member_no, SYSDATE, 'N');
        END LOOP;
    END;
END;

-- BADGE테이블에 값이 삽일될 때마다 자동으로 데이터 삽입해주는 트리거 생성 (뱃지테이블에 데이터 삽입하기 전 수행하기 wheelingcamp 관리자 계정으로 생성)
CREATE TRIGGER BADGE_INSERT
AFTER INSERT ON BADGE
FOR EACH ROW
BEGIN
    INSERT INTO MEMBER_BADGE (MEMBER_BADGE_NO, MEMBER_NO, BADGE_NO, BADGE_DATE, BADGE_FL)
    SELECT SEQ_MEMBER_BADGE_NO.NEXTVAL, MEMBER.MEMBER_NO, :NEW.BADGE_NO, SYSDATE, 'N'
    FROM MEMBER;
END;


-- 뱃지 샘플 데이터 한번에 넣기
BEGIN
   
    FOR I IN 1..20 LOOP
       
       INSERT INTO "BADGE"
       VALUES(SEQ_BADGE_NO.NEXTVAL,
              SEQ_BADGE_NO.CURRVAL||'번째 뱃지',
             SEQ_BADGE_NO.CURRVAL || '번째 뱃지 샘플입니다',
              '/image/badge/badgeSample');
       
    END LOOP;
    
END;

----------------------------------------------------------------------------


-- 뱃지 테이블 조회
SELECT * FROM "BADGE";
COMMIT;

-- 뱃지 테이블 조회
SELECT * FROM "MEMBER_BADGE";
COMMIT;

-- 현재 트리거 조회 (wheelingcamp 관리자 계정으로 생성)
SELECT TRIGGER_NAME, STATUS
FROM USER_TRIGGERS;

COMMIT;




-- 뱃지 BADGE_IMG 내용 수정하기
UPDATE BADGE
SET BADGE_IMG = '/image/badge/badgeSample.png'
WHERE BADGE_IMG = '/image/badge/';

-- 시퀀스 삭제하기
DROP SEQUENCE SEQ_BADGE_NO;

--뱃지내용 컬럼명 변경
ALTER TABLE "BADGE"
RENAME COLUMN BADGE_COUNT TO BADGE_CONTENTS;

COMMENT ON COLUMN "BADGE"."BADGE_CONTENTS" IS '뱃지 내용';

-- 뱃지 PK 설정
ALTER TABLE "BADGE" ADD CONSTRAINT "PK_BADGE" PRIMARY KEY (
   "BADGE_NO"
);

-- 뱃지 테이블 조회
SELECT * FROM "BADGE";
COMMIT;

-- 뱃지 테이블 조회
SELECT * FROM "MEMBER_BADGE";
COMMIT;

-------------------------------------------------------
-- 데이터 불러오기

SELECT BADGE_NO, BADGE_NAME, BADGE_CONTENTS, BADGE_IMG,BADGE_DATE,BADGE_FL
		FROM "BADGE"
		JOIN "MEMBER_BADGE" USING(BADGE_NO)
		WHERE MEMBER_NO = '105';


-----------------------------------------------------------

SELECT * FROM "MEMBER_BADGE";
SELECT * FROM "BADGE";
COMMIT;



