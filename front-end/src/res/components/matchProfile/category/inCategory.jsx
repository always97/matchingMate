import { Button } from 'react-bootstrap';
import React from 'react';
import { axiosDelete } from '../../axios/Axios';
import { useNavigate } from 'react-router-dom';


const InCategory = (props) => {
    const {interestCategory, setInterestCategory, setModalOpen, setUpdateCategoryId, setInputState} = props;

    const navigate = useNavigate();
    console.log(interestCategory);
    
    const categoryDelete = (id) => {
        axiosDelete(`/profile/interestCategory/delete/${id}`);
        alert("삭제 완료되었습니다.");
        navigate('/match');

        setInterestCategory(interestCategory.filter((item)=> item.id !== id));
    }

    const handleUpdate = (id) => {
        setUpdateCategoryId(id);
        setInputState("update");
        setModalOpen(true);
    }

    return (
        <div>
            <h1>관심카테고리 목록</h1>
            {
                interestCategory.map((category)=> 
                    <div key={category.id}>
                        <h2>{category.categoryName}</h2>
                        <h2>{category.region1}</h2>
                        <h2>{category.region2}</h2>
                        <h2>{category.region3}</h2>
                        <Button onClick={()=> handleUpdate(category.id)}>수정</Button>
                        <Button onClick={()=> categoryDelete(category.id)}>삭제</Button>
                    </div>
                )
            }
            <Button onClick={()=> setModalOpen(true)}>추가 하기</Button>
        </div>
    );
}

export default InCategory;