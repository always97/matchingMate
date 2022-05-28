import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MatchMain from '../../components/matchProfile/matchMain/matchMain';
//import { axiosGet } from '../../components/axios/Axios';

import MatchProfileNav from '../../components/matchProfile/matchProfileNav/matchProfileNav';
import UserProfile from '../../components/userProfile/userProfile';
import styles from './matchProfile.module.css';

const MatchProfile = () => {

  const [menu,setMenu] = useState('home');
  const [profileInfo, setProfileInfo] = useState("");

  const token = sessionStorage.getItem("jwtToken");
  console.log("매칭프로필 토큰잇제? ",token);

  function changeMenu(menu) {
    console.log("선택된 메뉴는 ", menu); //테스트
    return setMenu(menu);
  }
  
  const getProfileInfo = async () => {

    const res = await (await axios.get('http://localhost:8050/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )).data;

    /*const res = await (await axiosGet("/profile",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )).data;*/
    console.log("매칭프로필조회결과: ",res);

    setProfileInfo(res.data);
    
  };
  
  useEffect(() => {
    getProfileInfo();
  }, []);


  return (
    <>
    <div className={styles.home}>
      <div className={styles.header}></div>
      <MatchProfileNav changeMenu={changeMenu}/>
      <section className={styles.section}>
        <aside className={styles.profile_box}>
          <UserProfile profileInfo={profileInfo} />
        </aside>
        <div className={styles.main}>
          <MatchMain profileInfo={profileInfo} menu={menu} />
        </div>
      </section>
      </div>
    </>
  );
};

export default MatchProfile;