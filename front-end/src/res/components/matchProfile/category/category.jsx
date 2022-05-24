import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosGet } from '../../axios/Axios';
import Modal from "react-modal";
import NoCategory from './noCategory';
import InCategory from './inCategory';
import InputCategory from './inputCategory';


const Category = () => {
  const [interestCategory, setInterestCategory] = useState([]);
  const [categorys,setCategorys] = useState('');
  const token = "Bearer " + sessionStorage.getItem("jwtToken");

  const [modalOpen, setModalOpen] = useState(false);

  const readInterestCategory = async () => {
    const res = await (await axiosGet("/profile/interestCategory",{Authorization: token})).data; 

      console.log(res);

      setInterestCategory(res.data);
  };

  const readCategorys = async () => {
    const res = await (await axiosGet("/category",{Authorization: token})).data; 

    console.log(res);

    setCategorys(res.data);
}
/*  const Show = () => {
    if (state=="empty") {
      return <NoCategory setState={setState}/>
    } else if (state=="exist") {
      return <InCategory interestCategory={interestCategory}/>
    } else if (state=="input") {
      return <InputCategory setState={setState} setInterestCategory={setInterestCategory}/>
    }
  };*/

  useEffect(() => {
    readInterestCategory();
    readCategorys();
  }, []);
  
  return (
    <>
      {
        interestCategory === null ? 
          <NoCategory setModalOpen={setModalOpen} /> : <InCategory  interestCategory={interestCategory} setInterestCategory={setInterestCategory} setModalOpen={setModalOpen}/>
      }
      <Modal
                isOpen={modalOpen}
                ariaHideApp={false}
                shouldFocusAfterRender={true}
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
                    height: "600px",
                  },
                }}
              >
                <InputCategory categorys={categorys} interestCategory={interestCategory} setInterestCategory={setInterestCategory} setModalOpen={setModalOpen}/>
                <button onClick={() => setModalOpen(false)}>닫기</button>
              </Modal>
      
    </>
  );
};

export default Category;