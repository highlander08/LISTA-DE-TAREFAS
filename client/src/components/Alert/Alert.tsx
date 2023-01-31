import { useDispatch } from "react-redux";
import { hideAlert } from "../../redux/actions";
import { IAlertState } from "../../types";

interface IAlertProps {
  props: IAlertState;
}
const Alert = ({ props }: IAlertProps) => {
  const dispatch = useDispatch();
  const handleAlertClose = () => dispatch(hideAlert());
  return (
    <div className={`alert alert-wrapper alert-${props.alertStatus}`}>
      {props.alertText}
      <button
        onClick={handleAlertClose}
        className="btn-close alert-btn"
      ></button>
    </div>
  );
};

export default Alert;
