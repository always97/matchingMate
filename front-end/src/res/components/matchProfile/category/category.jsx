import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosGet } from '../../axios/Axios';



import TestCategory from './testCategory';


const Category = () => {
  const [categorys,setCategorys] = useState('');
  const [update, setUpdate ] = useState(false);

  const token = "Bearer " + sessionStorage.getItem("jwtToken");
  
  
  

  const readCategorys = async () => {
    const res = await (await axiosGet("/category",{Authorization: token})).data; 

    console.log(res);

    setCategorys(res.data);
}


  useEffect(() => {
    readCategorys();
  }, []);
  
  return (
    <>
      <TestCategory categorys={categorys} update={update} setUpdate={setUpdate}/>
    </>
  );
};

export default Category;