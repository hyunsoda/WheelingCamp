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
ALTER TABLE "MEMBER_BADGE" ADD CONSTRAINT FK_MEMBER_TO_MEMBER_BADGE;


FOREIGN KEY(MEMBER_NO) REFERENCES "MEMBER"(MEMBER_NO) ON DELETE CASCADE	
FOREIGN KEY(BADGE_NO) REFERENCES "BADGE"(BADGE_NO) ON DELETE CASCADE	 


-- 컬럼 추가하기
ALTER TABLE "MEMBER_BADGE"
ADD "SELECTED_BADGE" CHAR(1) DEFAULT 'N' NULL;
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
              '/image/badge/badgeSample.png');
       
    END LOOP;
    
END;

--------------------------------------------------------------------------

-- 뱃지 획득 관련 트리거 생성하기

-- 1. 회원 가입 시 뱃지 획득 트리거--이게 없어도 UPDATE 문에 작성해놔서 없어도될거같군!
CREATE TRIGGER AWARD_BADGE_ON_SIGN_UP
AFTER INSERT ON "MEMBER"
FOR EACH ROW
BEGIN
    DECLARE
        v_member_no NUMBER;
    BEGIN
        --회원 번호를 가져오기
        v_member_no := :NEW.MEMBER_NO;

        -- 해당 회원 번호의 뱃지 번호 1번을 'Y'로 업데이트하고 badge_date를 주문 날짜로 설정하기
        UPDATE "MEMBER_BADGE"
        SET BADGE_FL = 'Y',
            BADGE_DATE =:NEW.MEMBER_ENROLL_DATE
        WHERE BADGE_NO = 1;
    END;
END;
--
----트리거 삭제 
--DROP TRIGGER AWARD_BADGE_ON_SIGN_UP;
--
---- 2. 첫 결제 시 뱃지 획득 트리거
--CREATE OR REPLACE TRIGGER AWARD_BADGE_ON_FIRST_PAY
--AFTER INSERT ON "PAY"
--FOR EACH ROW
--DECLARE
--    v_pay_count INTEGER;
--BEGIN
--    SELECT COUNT(*)
--    INTO v_pay_count
--    FROM "PAY"
--    WHERE v_member_no = :NEW.MEMBER_NO;
--
--    IF v_pay_count = 1 THEN
--        UPDATE "MEMBER_BADGE"
--        SET BADGE_FL = 'Y'
--        WHERE v_member_no = :NEW.MEMBER_NO
--          AND BADGE_NO = 2
--    END IF;
--END;
--
--
--DROP TRIGGER AWARD_BADGE_ON_FIRST_BOARD;
---- 3. 첫 게시물 작성시 뱃지 획득 트리거
--CREATE OR REPLACE TRIGGER AWARD_BADGE_ON_FIRST_BOARD
--AFTER INSERT ON "BOARD"
--FOR EACH ROW
--DECLARE
--    v_board_count NUMBER;
--BEGIN
--    SELECT COUNT(*)
--    INTO v_board_count
--    FROM "BOARD"
--    WHERE MEMBER_NO;
--
--    IF v_board_count = 1 THEN
--        UPDATE "MEMBER_BADGE"
--        SET BADGE_FL = 'Y'
--        WHERE MEMBER_NO
--          AND BADGE_NO = 3;
--    END IF;
--END;
--
--SELECT COUNT(*)
--FROM "BOARD"
--WHERE MEMBER_NO =250;
--
--DROP TRIGGER AWARD_BADGE_ON_LIKE_COUNT;
---- 4. 좋아요수 100개 시 뱃지 획득 트리거
--CREATE OR REPLACE TRIGGER AWARD_BADGE_ON_LIKE_COUNT
--AFTER INSERT ON "BOARD"
--FOR EACH ROW
--DECLARE
--    v_like_count INTEGER;
--BEGIN
--    SELECT LIKE_COUNT INTO v_like_count
--    INTO v_like_count LIKE_COUNT
--    FROM "BOARD"
--    WHERE BOARD_NO = :NEW.BOARD_NO;
--
--    IF v_like_count = 2 THEN
--        UPDATE "MEMBER_BADGE"
--        SET BADGE_FL = 'Y'
--        WHERE MEMBER_NO = :NEW.MEMBER_NO
--          AND BADGE_NO = 4
--    END IF;
--END;
--
---- 5. 조회수 100회 달성 시 뱃지 획득 트리거
--CREATE OR REPLACE TRIGGER AWARD_BADGE_ON_READ_COUNT_BOARD
--AFTER INSERT ON "BOARD"
--FOR EACH ROW
--DECLARE
--    v_read_count INTEGER;
--BEGIN
--    SELECT COUNT(*)
--    INTO v_read_count
--    FROM "BOARD"
--    WHERE v_member_no = :NEW.MEMBER_NO;
--   	WHERE v_read_count = :NEW.READ_COUNT;
--
--    IF v_pay_count = 100 THEN
--        UPDATE "MEMBER_BADGE"
--        SET BADGE_FL = 'Y'
--        WHERE v_member_no = :NEW.MEMBER_NO
--          AND BADGE_NO = 4
--    END IF;
--END;
-- 6. 구매및 대여 금액 100,000원시 뱃지 획득 트리거

-- 7. 구매및 대여 금액 300,000원시 뱃지 획득 트리거

-- 8. 구매및 대여 금액 500,000원시 뱃지 획득 트리거

-- 9. 구매및 대여 금액 1,000,000원시 뱃지 획득 트리거

-- 10. 게시글 30개 이상 시 뱃지 획득 트리거

-- 11. 게시글 50개 이상 시 뱃지 획득 트리거

-- 12. 게시글 100개 이상 시 뱃지 획득 트리거

-- 13. 댓글 30개 이상 시 뱃지 획득 트리거

-- 14. 댓글 50개 이상 시 뱃지 획득 트리거

-- 15. 댓글 100개 이상 시 뱃지 획득 트리거

-- 16. 첫 여행지 추천 등록 시 뱃지 획득 트리거

-- 17. 추천한 여행지 

-- 마지막. 모든 뱃지를 횟득했을 시 뱃지 획득 트리거 






----------------------------------------------------------------------------


-- 뱃지 테이블 조회
SELECT * FROM "BADGE";

COMMIT;

-- 뱃지 테이블 조회
SELECT * FROM "MEMBER_BADGE";
WHERE MEMBER_NO=224;

SELECT * FROM "BOARD";

UPDATE "MAMBER_BADGE" SET
SELECTED_BADGE='Y'
WHERE MEMBER_NO=#{memberNo}
AND BADGE_NO =#{badgeNo}


COMMIT;

-- 현재 트리거 조회 (wheelingcamp 관리자 계정으로 생성)
SELECT TRIGGER_NAME, STATUS
FROM USER_TRIGGERS;

COMMIT;



SELECT * FROM "BADGE";
-- 뱃지 BADGE_IMG 내용 수정하기
UPDATE BADGE 
SET BADGE_IMG = '/image/badge/badgeSample17.png'
WHERE BADGE_NO =17;

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
SELECT * FROM "MEMBER_BADGE"
WHERE MEMBER_NO =249
AND BADGE_NO =1;
COMMIT;

-------------------------------------------------------
-- 데이터 불러오기

SELECT BADGE_NO, BADGE_NAME, BADGE_CONTENTS, BADGE_IMG,BADGE_DATE,BADGE_FL
		FROM "BADGE"
		JOIN "MEMBER_BADGE" USING(BADGE_NO)
		WHERE MEMBER_NO = '105';


-----------------------------------------------------------
	
SELECT * FROM "MEMBER";
SELECT * FROM "MEMBER_BADGE"
WHERE BADGE_NO=6
AND MEMBER_NO =250;
SELECT * FROM "BADGE";
COMMIT;
ROLLBACK;

--------------------------------------
UPDATE "MEMBER_BADGE" SET
	    BADGE_FL = 'N'
	    WHERE MEMBER_NO = 249
	    AND BADGE_NO = 3;



UPDATE MEMBER_BADGE 
SET SELECTED_BADGE = 'N'
WHERE BADGE_NO = 1
AND MEMBER_NO =249;

SELECT SELECTED_BADGE FROM MEMBER_BADGE
WHERE BADGE_NO =1
AND MEMBER_NO=249;
COMMIT;

SELECT * FROM "PAY";

DELETE FROM "PAY"
WHERE TOTAL_AMOUNT = 1;

SELECT * FROM "PURCHASE";
SELECT * FROM "RENT";


DELETE FROM "PURCHASE"
WHERE PURCHASE_DEL_FL = 'N';

SELECT * FROM "CART";

SELECT sequence_name
FROM user_sequences;

SELECT * FROM "CART";






