import "./flow.css";
import { MdAddIcCall } from "react-icons/md";
import { FaFacebookMessenger } from "react-icons/fa";
const Flow = () => {
  return (
    <div id="flow_contract">
      <div className="flow_call">
        <MdAddIcCall />
      </div>
      <div className="flow_mess">
        <FaFacebookMessenger />
      </div>
    </div>
  );
};

export default Flow;
