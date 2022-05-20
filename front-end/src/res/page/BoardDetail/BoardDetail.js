import React, { useEffect, useState } from 'react';
import styles from './BoardDetail.module.css';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Nav from '../../components/nav/Nav';
import { BsArrowLeft } from "react-icons/bs";
import { Button } from 'react-bootstrap';
// import { axiosGet } from '../../axios/Axios';
import Modal from "react-modal";
import axios from 'axios';
import GoogleMap from '../../components/googleMap/googleMap';
import { axiosDelete } from '../../components/axios/Axios';

const BoardDetail = () => {

  const { id } = useParams();
  console.log("detail id : ", id);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const { categorys } = useLocation().state;

  const token = sessionStorage.getItem("jwtToken");

  const boardDelete = () => {
    axiosDelete(`/matchingPost/detail/delete/${id}`);
    alert("삭제 완료되었습니다.");
    navigate('/');
  }

  const getBoard = async () => {
    const res = await (await axios.get(`http://localhost:8050/matchingPost/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )).data;
    // const res = await (await axiosGet(`/matchingPost/detail/${id}`)).data;
    console.log("detail 조회 결과", res);
    setBoard(res.data);
    setisLoading(false);
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <>
      <Nav />
      {
        isLoading === true ? <h2>로딩중입니다 ...</h2> : (
          <div className={styles.container}>
            <section className={styles.header}>

              <BsArrowLeft className={styles.backBtn} size="40" onClick={() => navigate(-1)}></BsArrowLeft>
              <div className={styles.title}>{board.postName}</div>
              <div className={styles.userAndDate}>
                <div className={styles.nickName}>{board.nickname}</div>
                <div className={styles.registerDate}>{board.registerDatetime}</div>
              </div>
              <ul className={styles.boardInfo}>
                <li className={styles.infoBox}>
                  <span className={styles.infoTitle}>종목</span>
                  <span className={styles.infoContent}>{board.categoryName}</span>
                </li>
                <li className={styles.infoBox}>
                  <span className={styles.infoTitle}>운동 예정일</span>
                  <span className={styles.infoContent}>{board.matchingDate}</span>
                </li>
                <li className={styles.infoBox}>
                  <span className={styles.infoTitle}>운동 시작시간</span>
                  <span className={styles.infoContent}>{board.matchingTime}</span>
                </li>
                <li className={styles.infoBox}>
                  <span className={styles.infoTitle}>장소</span>
                  <span className={styles.infoContent}>{board.place}</span>
                  <Button onClick={() => setModalOpen(true)}>지도 보기</Button>
                </li>
                <li className={styles.infoBox}>
                  <span className={styles.infoTitle}>추천 실력</span>
                  <span className={styles.infoContent}>{board.recommendedSkill}</span>
                </li>
              </ul>
            </section>
            <Modal
              isOpen={modalOpen}
              onRequestClose={() => setModalOpen(false)}
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(126, 147, 149, 0.83)",
                },
                content: {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  border: "1px solid #ccc",
                  background: "#fff",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "4px",
                  outline: "none",
                  padding: "20px",
                  width: "800px",
                  height: "800px",
                },
              }}
            >
              <GoogleMap />
              <button onClick={() => setModalOpen(false)}>닫기</button>
            </Modal>

            <div className={styles.contentBox}>
              <h2 className={styles.contentHeader}>상세내용</h2>
              <div className={styles.contentWrap}>
                <p>{board.postContents}</p>
              </div>
            </div>
            <div className={styles.chatBtnBox}>
              {
                (board.myPost) &&
                <>
                  <Button onClick={() => {
                    navigate('/register', {
                      state: {
                        board,
                        categorys,
                        id,
                        api: "update"
                      }
                    });
                  }}>수정</Button>

                  <Button onClick={boardDelete}>삭제</Button>
                </>
              }
              <Link to='/chatting' ><Button>채팅방 참여하기</Button></Link>
            </div>
          </div>
        )
      }

    </>

  );
};

export default BoardDetail;