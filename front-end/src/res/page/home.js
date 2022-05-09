// import Body from "./Body";
import HomeHeader from "../components/home/HomeHeader";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import HomeCarousel from "../components/home/HomeCarousel";
import Board from "../components/home-board/HomeBoard";
import NavToChat from "../components/nav/NavToChat";
// import { axiosGet } from '../axios/Axios';
import axios from 'axios';


function Home() {
  const [boards, setBoards] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longtitue, setLongitude] = useState("");

  const getPopularBoards = async (lat, lng) => {
    // const res = await (await axiosGet("/popular")).data;
    const res = await (await axios.get(`http://localhost:8050/recent?lat=${lat}&lng=${lng}`)).data;
    setBoards(res.data);
  };

  // 기본 조회는 최신순 zz

  const getBoards = async (lat, lng) => {
    console.log("axios 조회 시작!!");
    console.log("위도 ! 경도 ! ", lat, lng);
    // const res = await (await axiosGet("")).data;
    const res = await (await axios.get(`http://localhost:8050/recent?lat=${lat}&lng=${lng}`)).data;
    console.log("통신데이터", res);
    setBoards(res.data);
  };

  const categoryFilter = (e, category) => {
    e.preventDefault();
    const filterData = boards.filter(
      (board) => board.categoryName === category
    );
    setBoards(filterData);
  };

  const getLocation = async () => {

    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        getBoards(lat, lng);
        alert('위도 : ' + lat + ' 경도 : ' + lng);
        console.log('위도 : ' + latitude + ' 경도 : ' + longtitue); // 일단 but never used 에러창 방지
      }, function (error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
      return;
    }
  }

  useEffect(() => {
    getLocation();

  }, []);

  return (
    <div className="Home">
      <NavToChat></NavToChat>
      <Nav></Nav>
      <HomeHeader></HomeHeader>
      <HomeCarousel categoryFilter={categoryFilter}></HomeCarousel>
      <Board
        boards={boards}
        getPopularBoards={getPopularBoards}
        getBoards={getBoards}
        getLocation={getLocation}
        lat={latitude}
        lng={longtitue}
      />
    </div>
  );
}

export default Home;
