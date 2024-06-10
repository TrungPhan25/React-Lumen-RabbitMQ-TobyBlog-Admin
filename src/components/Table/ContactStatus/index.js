import React from 'react';

const ContactStatus = ({ status }) => {
  let buttonClass = '';
  let buttonText = '';
  let iconClass = '';

  switch (status) {
    case 0:
      buttonClass = 'btn btn-warning';
      buttonText = 'Chưa giải quyết';
      iconClass = 'bi bi-info-circle';
      break;
    case 1:
      buttonClass = 'btn btn-success';
      buttonText = 'Đã giải quyết';
      iconClass = 'bi bi-check-circle';
      break;
    case 2:
      buttonClass = 'btn btn-info';
      buttonText = 'Đang giải quyết';
      iconClass = 'bi bi-info-circle';
      break;
    default:
      break;
  }

  return (
    <button type="button" className={buttonClass}>
      <i className={iconClass}></i>
      &nbsp; {buttonText}
    </button>
  );
};

export default ContactStatus;
