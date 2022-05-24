import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const CategoryAddrInput = (props) => {
  const { dataInfo,setDataInfo, setModalOpen , region} = props;

  console.log("카테고리 주소창 입력 지역몇? : ", region);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let jibunAddress = data.jibunAddress;
    let autoJibunAddress = data.autoJibunAddress

    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log("이건 도로명 주소::::::", fullAddress);
    console.log("지번 주소는 ?? :::::::", jibunAddress);
    console.log("예상 지번 주소는 ?? :::::::", autoJibunAddress);
    setDataInfo({ ...dataInfo, [region]: jibunAddress ? jibunAddress : autoJibunAddress });
    setModalOpen(false);
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return (<DaumPostcode onComplete={handleComplete} className="post-code" />);

};

export default CategoryAddrInput;