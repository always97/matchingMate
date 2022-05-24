import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Modal from "react-modal";
import TextField from '@mui/material/TextField';
import styles from './category.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryAddrInput from './categoryAddrInput';


function InputCategory(props) {
    console.log(props)

    const navigate = useNavigate();
    // , interestCategory , setInterestCategory
    const {categorys,setModalOpen, interestCategory, setInterestCategory } = props;
    
    const [modalFirst, setModalFirst] = useState(false);
    const [modalSecond, setModalSecond] = useState(false);
    const [modalThird, setModalThird] = useState(false);

    console.log("인풋창진입시 기존 관심카테고리 : ", interestCategory);
    


    const token = "Bearer " + sessionStorage.getItem("jwtToken");
    // const headers = {
    //     Authorization: token
    // }

    const [interestData, setInterestData] = useState({
        categoryId:'',
        region1:'',
        region2:'',
        region3:''
    });


    

    const saveInterest = async (e) => {
        e.preventDefault();
        console.log("등록데이터:",interestData);

        // props.setInterestCategory(interestData);

        let rsp = (await axios.post("http://localhost:8050/profile/interestCategory/create", interestData, {headers:{'Authorization': token}})).data;
        
        console.log("--------------------------");
        console.log("등록시 받은데이터 : ",rsp.data);
        console.log("--------------------------");
        setModalOpen(false);

        setInterestCategory(rsp.data);

        navigate('/match');
    }

    return (
        <div className={styles.input_container}>
            <h4>지역은 최대 3개만 입력 가능합니다.</h4>
            <Box sx={{ minWidth: 120 }} >
                <FormControl sx={{ width: 350, marginTop: 2 }} >
                    <InputLabel id="interestSelect">종목</InputLabel>
                    <Select
                        labelId="interestSelect"
                        id="demo-simple-select"
                        value={interestData.categoryId}
                        name="interestId"
                        label="interest"
                        onChange={(e) => {
                            setInterestData({ ...interestData, categoryId: e.target.value});
                        }
                        }
                        sx={{marginBottom:5, textAlign:'left'}}
                    >
                        {
                        categorys.map((category) => (
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        )
                        )
                        }
                    </Select>

                    <TextField value={interestData.region1} onClick={() => setModalFirst(true)} sx={{marginBottom:5}} id="outlined-basic" label="지역1" variant="outlined" />
                    <TextField value={interestData.region2} onClick={() => setModalSecond(true)} sx={{marginBottom:5}} id="outlined-basic" label="지역2" variant="outlined" />
                    <TextField value={interestData.region3} onClick={() => setModalThird(true)} sx={{marginBottom:5}} id="outlined-basic" label="지역3" variant="outlined" />
                    <Modal
                        isOpen={modalFirst}
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
                            // position: "absolute",
                            // top: "50%",
                            // left: "50%",
                            // transform: "translate(-50%, -50%)",
                            transform: "scale(0.7)",
                            border: "1px solid #ccc",
                            background: "#fff",
                            overflow: "auto",
                            WebkitOverflowScrolling: "touch",
                            borderRadius: "4px",
                            outline: "none",
                            padding: "20px",
                            width: "100%",
                            height: "300px",
                            },
                        }}
                        >
                        <CategoryAddrInput dataInfo={interestData} setDataInfo={setInterestData} setModalOpen={setModalFirst} region={"region1"}/>
                        <button onClick={() => setModalFirst(false)}>닫기</button>
                    </Modal>
                    <Modal
                        isOpen={modalSecond}
                        ariaHideApp={false}
                        shouldFocusAfterRender={true}
                        onRequestClose={() => setModalSecond(false)}
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
                            // position: "absolute",
                            // top: "50%",
                            // left: "50%",
                            // transform: "translate(-50%, -50%)",
                            transform: "scale(0.7)",
                            border: "1px solid #ccc",
                            background: "#fff",
                            overflow: "auto",
                            WebkitOverflowScrolling: "touch",
                            borderRadius: "4px",
                            outline: "none",
                            padding: "20px",
                            width: "100%",
                            height: "300px",
                            },
                        }}
                        >
                        <CategoryAddrInput dataInfo={interestData} setDataInfo={setInterestData} setModalOpen={setModalSecond} region={"region2"} />
                        <button onClick={() => setModalSecond(false)}>닫기</button>
                    </Modal>
                    <Modal
                        isOpen={modalThird}
                        ariaHideApp={false}
                        shouldFocusAfterRender={true}
                        onRequestClose={() => setModalThird(false)}
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
                            // position: "absolute",
                            // top: "50%",
                            // left: "50%",
                            // transform: "translate(-50%, -50%)",
                            transform: "scale(0.7)",
                            border: "1px solid #ccc",
                            background: "#fff",
                            overflow: "auto",
                            WebkitOverflowScrolling: "touch",
                            borderRadius: "4px",
                            outline: "none",
                            padding: "20px",
                            width: "100%",
                            height: "300px",
                            },
                        }}
                        >
                        <CategoryAddrInput dataInfo={interestData} setDataInfo={setInterestData} setModalOpen={setModalThird} region={"region3"}/>
                        <button onClick={() => setModalThird(false)}>닫기</button>
                    </Modal>

                    <Button onClick={saveInterest} variant="contained">저장</Button>
                </FormControl>

                
            </Box>
        </div>
    );
}

export default InputCategory;