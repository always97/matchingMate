import React, { useState } from 'react';
import styles from './BoardRegister.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from 'react-icons/fc';
import TimeInput from "react-input-time";
import { TextField } from '@mui/material';
import Modal from "react-modal";
import BoardPlaceInput from '../../components/home-board/BoardPlaceInput';
import Button from '@mui/material/Button';


const BoardRegister = () => {

  const [category, setCategory] = useState('');
  const [recruitments, setRecruitments] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('00:00');
  const [place, setPlace] = useState('');
  const [recommend, setRecommend] = useState('');
  const [modalOpen, setModalOpen] = useState(false);


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
                  value={category}
                  label="category"
                  onChange={(category) => setCategory(category)}
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
                  id="demo-simple-select"
                  value={recruitments}
                  label="recruitments"
                  onChange={(recruitments) => setRecruitments(recruitments)}
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
                <DatePicker className={styles.datePicker} selected={date} value={date} onChange={(date) => setDate(date)} label="dateSelect" />
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
                  value={time}
                  onChange={(event, time) => {
                    event.prevenDefault();
                    setTime(time);
                  }}
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
                  value={place}
                  onChange={(place) => setDate(place)}
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
              <BoardPlaceInput setPlace={setPlace} setModalOpen={setModalOpen} style={{ zIndex: "999" }} />
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
                  value={recommend}
                  label="recommend"
                  onChange={(recommend) => setRecommend(recommend)}
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
        <Box  sx={{width: "100%"}}>
          <TextField id="outlined-basic" label="제목" variant="outlined"  className={styles.title} />
        </Box>
        </ul>
        <ul className={styles.ul}>
          <Box sx={{width: "100%" , height: "500px"}}>
            <TextField 
              id="outlined-basic" 
              label="내용" 
              variant="outlined" 
              className={styles.contents}
              multiline
              rows={10}
              maxRows={15}
            />
            <div className={styles.btnBox}>
              <Button variant="outlined">취소</Button>
              <Button variant="outlined">등록하기</Button>
            </div>
          </Box>
          
        </ul>
      </section>
    </div>
  );
};

export default BoardRegister;