import { Card, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import "../../css/signup/signup.css";
import AddressInput from "./AddressInput";
import Modal from "react-modal";
import { checkURL } from "../checkURL/CheckURL";
import { axiosPost } from '../../axios/Axios';


export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [sex, setSex] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  function postData(e) {
    e.preventDefault();
    const data = {
      userId: id,
      userPw: password,
      address: address,
      birthday: birthDay,
      name: name,
      nickname: nickname,
      phone: phoneNumber,
      sex: sex,
    };

    axiosPost("/signUp", data)
      .then(() => {
        const url = checkURL();
        window.location.replace(url + "login");
      })
      .catch(() => {
        alert("정보를 다시 입력해주세요.");
      });
  }

  return (
    <div className="container signup-component">
      <Card>
        <Card.Header>
          <p className="header-title">회원가입</p>
          <p>운동메이트에 오신것을 환영합니다!</p>
        </Card.Header>
        <Card.Body>
          <div className="card-text">
            <Form>
              <div className="signup-separate">
                <div className="signup-part1">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ID"
                      onChange={(e) => {
                        e.preventDefault();
                        setId(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        e.preventDefault();
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>주소</p>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="주소"
                      readonly
                      value={address}
                    // onChange={(e) => {
                    //   e.preventDefault();
                    //   setAddress(e.target.value);
                    // }}
                    />
                    <Button onClick={() => setModalOpen(true)}>주소찾기</Button>
                  </Form.Group>

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
                        width: "700px",
                        height: "500px",
                      },
                    }}
                  >
                    <AddressInput
                      setAddress={setAddress}
                      setModalOpen={setModalOpen}
                    />
                    <button onClick={() => setModalOpen(false)}>닫기</button>
                  </Modal>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>생일</p>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      onChange={(e) => {
                        e.preventDefault();
                        setBirthDay(e.target.value);
                      }}
                    />
                  </Form.Group>
                </div>
                <div className="signup-part2">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>이름</p>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="이름"
                      onChange={(e) => {
                        e.preventDefault();
                        setName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>별명</p>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="별명"
                      onChange={(e) => {
                        e.preventDefault();
                        setNickname(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>전화번호</p>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="전화번호"
                      onChange={(e) => {
                        e.preventDefault();
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <p>성별</p>
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="남성"
                      label="남성"
                      onChange={(e) => {
                        setSex(e.target.value);
                      }}
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="여성"
                      label="여성"
                      onChange={(e) => {
                        setSex(e.target.value);
                      }}
                    />
                  </Form.Group>{" "}
                </div>
              </div>
              <div className="signup-btn">
                <Button type="submit" variant="primary" onClick={postData}>
                  Signup
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
