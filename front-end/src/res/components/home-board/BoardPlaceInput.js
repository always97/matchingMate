import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const BoardPlaceInput = (props) => {
  const { postInfo, setPostInfo, setModalOpen } = props;

  const handleComplete = (data) => {
    let fullAddress = data.address;
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
    console.log(fullAddress);
    setPostInfo({ ...postInfo, place: fullAddress });
    setModalOpen(false);
  }
  // eslint-disable-next-line react/react-in-jsx-scope
  return (<DaumPostcode onComplete={handleComplete} className="post-code" />);

};

export default BoardPlaceInput;