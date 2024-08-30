import DataContext from "../context/context";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Invites() {
  const notify = () => toast.success("Invite link copied!");
  const { user, invites } = useContext(DataContext);
  const copy = () => {
    const url = `https://t.me/blum_azizbek_bot?start=er_${user.telegram_id}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        notify();
      })
      .catch((err) => {
        alert("Failed to copy the URL.");
        console.error("Failed to copy the URL: ", err);
      });
  };

  return (
    <div className="Invites">
      <ToastContainer />
      <div className="invites_box">
        <div className="invites_top">
          <img src="/frends.png" alt="" />
          <h3 className="invite_title">Invite frens. Earn points</h3>

          <div className="works_box">
            <div className="works_box_top">
              <h6 className="works_title">How it works</h6>
            </div>
            <div className="works_box_bottom">
              <div className="works_bottom_right">
                <div className="works_bottom_card">
                  <h6 className="works_card_title">
                    Share your invitation link
                  </h6>
                  <p className="works_card_text">
                    Get a play pass for each fren
                  </p>
                </div>
                <div className="works_bottom_card">
                  <h6 className="works_card_title">Your friends joined blum</h6>
                  <p className="works_card_text">And start farming points</p>
                </div>
                <div className="works_bottom_card">
                  <h6 className="works_card_title">Score 10% from buddies</h6>
                  <p className="works_card_text">
                    Plus an extra 2.5% from their referals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="invites_bottom">
          <h3 className="works_title">Frends</h3>
          <div className="invites_cards">
            {invites.length > 0 ? (
              invites.map((invite) => (
                <div key={invite.id} className="invite_card">
                  <div className="invite_card_left">
                    <i
                      class="bx bx-user"
                      style={{ color: "#fff", fontSize: "30px" }}
                    ></i>
                  </div>
                  <div className="invite_card_right">
                    <h6>{invite.first_name}</h6>
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "12px",
                        fontFamily: "PT Mono",
                      }}
                    >
                      {invite.amount} MC
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <h5 style={{ color: "white", textAlign: "center" }}>
                <i
                  class="bx bxl-dropbox"
                  style={{
                    fontSize: "50px",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                ></i>
                <br />
                You don't have any friends yet
              </h5>
            )}
          </div>
        </div>
      </div>
      <button className="invite_button" onClick={() => copy()}>
        Copy Invite Link
      </button>
    </div>
  );
}

export default Invites;
