import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/chattingList/chattingList.css";
import Person1 from "../../img/person1.png";
import Person2 from "../../img/person2.png";
import Person3 from "../../img/person3.png";
import Person4 from "../../img/person4.png";
import Person5 from "../../img/person5.png";

export default function ChattingListComponent() {
  return (
    <Container className="chatting-list-component">
      <ul>
        <li>
          <Link to="/chatting">
            <img src={Person1} alt="person1" />
            <div className="detail">
              <h2>
                같이 러닝하실분? <span>4</span>
              </h2>
              <h5>안녕하세요!</h5>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/chatting">
            <img src={Person2} alt="person2" />
            <div className="detail">
              <h2>
                배드민턴 고? <span>3</span>
              </h2>
              <h5>저희 어디서 보나요?</h5>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/chatting">
            <img src={Person3} alt="person3" />
            <div className="detail">
              <h2>
                축구한판? <span>3/12</span>
              </h2>
              <h5>수고하셨습니다!</h5>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/chatting">
            <img src={Person4} alt="person4" />
            <div className="detail">
              <h2>
                볼링칩시다! <span>4</span>
              </h2>
              <h5>전 100정도 쳐요!</h5>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/chatting">
            <img src={Person5} alt="person5" />
            <div className="detail">
              <h2>
                같이 러닝하실분? <span>4</span>
              </h2>
              <h5>안녕하세요!</h5>
            </div>
          </Link>
        </li>
      </ul>
    </Container>
  );
}
