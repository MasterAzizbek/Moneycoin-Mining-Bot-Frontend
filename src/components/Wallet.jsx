import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Wallet() {
  const connect = () => toast.info("Connect Wallet coming soon...");
  return (
    <div className="Wallet">
      <ToastContainer />
      <img src="/wait.gif" alt="" />
      <p className="wallet_text">
        Connect your wallet to access upcoming crypto features. Our team is
        working hard to bring.
      </p>
      <button onClick={() => connect()} className="start_farming">
        Connect
      </button>
    </div>
  );
}

export default Wallet;
