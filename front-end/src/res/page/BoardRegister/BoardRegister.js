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

const BoardRegister = () => {

  const [category, setCategory] = useState('');
  const [recruitments, setRecruitments] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('00:00');


  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleRecruit = (event) => {
    setRecruitments(event.target.value);
  };

  return (
    <div className={styles.container}>
      <section>
        <div className={styles.header}>
          <h2>공고 기본 정보를 입력해주세요.</h2>
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
                  onChange={handleCategory}
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
                <InputLabel id="recruitSelect">인원을 선택해주세요.</InputLabel>
                <Select
                  labelId="recruitSelect"
                  id="demo-simple-select"
                  value={recruitments}
                  label="recruitments"
                  onChange={handleRecruit}
                >
                  <MenuItem value={1}>1명</MenuItem>
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
      </section>

    </div>
  );
};

export default BoardRegister;