import checkMarker from '../../../assets/check-marker.png'
import s from './notification.module.css'

function Notification() {
  return (
    <div className={s.wrapper}>
      <img className={s.checkMarker} src={checkMarker} alt="checkmarker" />
      <p>Успешно!</p>
    </div>
  );
};

export default  Notification;