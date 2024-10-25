import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BtnGoBack() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="m-2 flex items-center gap-2 rounded-md bg-blue-900 p-2 text-blue-100"
        onClick={() => navigate("/")}
      >
        <FaLongArrowAltLeft /> Go Back
      </button>
    </>
  );
}

export default BtnGoBack;
