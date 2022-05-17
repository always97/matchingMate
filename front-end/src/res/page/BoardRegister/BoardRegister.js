import React, { useState } from 'react';
import styles from './BoardRegister.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from 'react-icons/fc';
import TimeInput from "react-input-time";
import { TextField } from '@mui/material';
import Modal from "react-modal";
import BoardPlaceInput from '../../components/home-board/BoardPlaceInput';
import Button from '@mui/material/Button';


const BoardRegister = () => {

  const liveAddr = sessionStorage.getItem("liveAddr");

  const [postInfo, setPostInfo] = useState({
    postName: '',
    postContents: '',
    category: '',
    maxNumberOfPeople: '',
    matchingDate: new Date(),
    matchingTime: '00:00',
    place: liveAddr ? liveAddr : '',
    recommendedSkill: ''
  });

  const token = sessionStorage.getItem("jwtToken");

  const [modalOpen, setModalOpen] = useState(false);

  const onChange = (e) => {
    const { value, name } = e.target;
    setPostInfo({
      ...postInfo,
      [name]: value
    });
  };

  const onCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8050/matchingPost/create', postInfo, {
      headers: {
        'Authorization': token
      }
    })
  }

  return (
    <div className={styles.container}>
      <section>
        <div className={styles.header}>
          <h2>기본 정보 입력</h2>
        </div>
        <ul className={styles.ul}>
          <li className={styles.infoItem}>
            <label>운동 구분</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <InputLabel id="categorySelect">종목</InputLabel>
                <Select
                  labelId="categorySelect"
                  id="demo-simple-select"
                  value={postInfo.category}
                  label="category"
                  onChange={onChange}
                >
                  <MenuItem value={"축구"}>축구</MenuItem>
                  <MenuItem value={"농구"}>농구</MenuItem>
                  <MenuItem value={"탁구"}>탁구</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </li>
          <li className={styles.infoItem}>
            <label>모집 인원</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <InputLabel id="recruitSelect" style={{ zIndex: "-1" }}>인원(본인 포함)</InputLabel>
                <Select
                  labelId="recruitSelect"
                  id="maxNumberOfPeopleSelect"
                  value={postInfo.maxNumberOfPeople}
                  label="recruitSelect2"
                  onChange={onChange}
                >

                  <MenuItem value={2}>2명</MenuItem>
                  <MenuItem value={3}>3명</MenuItem>
                  <MenuItem value={4}>4명</MenuItem>
                  <MenuItem value={5}>5명</MenuItem>
                  <MenuItem value={6}>6명</MenuItem>
                  <MenuItem value={7}>7명</MenuItem>
                  <MenuItem value={8}>8명</MenuItem>
                  <MenuItem value={9}>9명</MenuItem>
                  <MenuItem value={10}>10명</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </li>
        </ul>
        <ul className={styles.ul}>
          <li className={styles.infoItem}>
            <label>운동 일자</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <InputLabel id="dateSelect" className={styles.inputCalendar}><FcCalendar style={{ marginLeft: "310px" }} /></InputLabel>
                <DatePicker className={styles.datePicker} selected={postInfo.matchingDate} value={postInfo.matchingDate} onChange={onChange} label="dateSelect" />
              </FormControl>
            </Box>
          </li>
          <li className={styles.infoItem}>
            <label>운동 시작시간</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <TimeInput
                  className={styles.inputTime}
                  initialTime="00:00"
                  value={postInfo.matchingTime}
                  onChange={onChange}
                />
              </FormControl>
            </Box>
          </li>
        </ul>
        <ul className={styles.ul}>
          <li className={styles.infoItem}>
            <label>운동 장소</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <TextField
                  value={postInfo.place}
                  onChange={onChange}
                  label="장소를 입력해주세요."
                  onClick={() => setModalOpen(true)}
                />
              </FormControl>
            </Box>
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
                  width: "600px",
                  height: "500px",

                },
              }}
            >
              <BoardPlaceInput postInfo={postInfo} setPostInfo={setPostInfo} setModalOpen={setModalOpen} style={{ zIndex: "999" }} />
              <button onClick={() => setModalOpen(false)}>닫기</button>
            </Modal>
          </li>
          <li className={styles.infoItem}>
            <label>추천 숙련도</label>
            <Box sx={{ minWidth: 120 }} className={styles.selectBox} >
              <FormControl sx={{ width: 350, marginTop: 2 }} >
                <InputLabel id="recommendSelect" style={{ zIndex: "-1" }}>추천 숙련도</InputLabel>
                <Select
                  labelId="recommendSelect"
                  id="demo-simple-select"
                  value={postInfo.recommendedSkill}
                  label="recommend"
                  onChange={onChange}
                >
                  <MenuItem value={"누구나"}>누구나</MenuItem>
                  <MenuItem value={"뉴비"}>뉴비</MenuItem>
                  <MenuItem value={"중급"}>중급</MenuItem>
                  <MenuItem value={"고급"}>고급</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </li>
        </ul>
      </section>
      <section>
        <div className={styles.header}>
          <h2>운동을 소개해주세요</h2>
        </div>
        <ul className={styles.ul}>
          <Box sx={{ width: "100%" }}>
            <TextField
              id="outlined-basic"
              label="제목"
              variant="outlined"
              className={styles.title}
              value={postInfo.postName}
              onChange={onChange}
            />
          </Box>
        </ul>
        <ul className={styles.ul}>
          <Box sx={{ width: "100%", height: "500px" }}>
            <TextField
              id="outlined-basic"
              label="내용"
              variant="outlined"
              value={postInfo.postContents}
              onChange={onChange}
              className={styles.contents}
              multiline
              rows={10}
              maxRows={15}
            />
            <div className={styles.btnBox}>
              <Button variant="outlined">취소</Button>
              <Button variant="outlined" onClick={onCreate}>등록하기</Button>
            </div>
          </Box>

        </ul>
      </section>
    </div>
  );
};

export default BoardRegister;