import { useNavigate } from "react-router-dom";

const Info = () => {
    const movePage = useNavigate(); 

    function gohome(){
        movePage('/manage/info');
    }

    return (
        <>
            <h1>안녕하세요</h1>
            <a onClick={gohome}>홈 이동</a>
        </>
    );
}

export default Info;