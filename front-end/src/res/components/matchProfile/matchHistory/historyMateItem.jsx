import React, { useState } from 'react';
import InputRating from '../matchRating/InputRating';
import Modal from "react-modal";
import { Button } from 'react-bootstrap';
import styles from './historyMateItem.module.css';
import ReportModal from '../../Modal/ReportModal'

const HistoryMateItem = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [infoShow,setInfoShow]=useState(false);

  const reportType = "회원";

  const [matchingMate, setMatchingMate] = useState(props.matchingMate);
  const {matchingHistoryId} = props;

  const updateCompleted = () => {
    setMatchingMate((prevState) => ({
      ...prevState,
      alreadyCompleted:true
    }))
  };
  
  const showReportModal = () => {
    setInfoShow(true);
  };

  return (
    <div className={styles.mateInfo}>
      <p>이름 : {matchingMate.nickname}</p>

 
      <Button disabled={matchingMate.alreadyCompleted} onClick={() => setModalOpen(true)} style={{margin:"0 3px 0 0"}}>평점 남기기</Button>
      {/* <Button onClick={() => setModalOpen(true)} style={{margin:"0 3px 0 0"}}>평점 남기기</Button> */}
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
            width: "500px",
            height: "500px",
          },
        }}
      >

        <InputRating setModalOpen={setModalOpen} updateCompleted={updateCompleted} targetMemberId={matchingMate.id} matchingHistoryId={matchingHistoryId}/>
                    
      </Modal>
      
      <Button onClick={() => showReportModal()}>신고하기</Button>
      <ReportModal infoShow={infoShow} setInfoShow={setInfoShow} memberNickname={matchingMate.nickname} reportType={reportType} targetId={matchingMate.id} />
    </div>
  );
};

export default HistoryMateItem;