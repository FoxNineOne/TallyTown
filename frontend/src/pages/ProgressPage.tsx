import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import type { CampaignProgressResponse } from "../../../shared/types/CampaignProgressType";
import { getCampaignProgress } from "../api/campaignProgressAPI";
import "../App.css";

import { QRCodeSVG } from "qrcode.react";

interface JwtPayload {
  id: string;
  merchantId?: string;
  role: string;
}

function Progress() {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return <p>You need to log in to view your loyalty cards.</p>;
  }
  const decoded = jwtDecode<JwtPayload>(token!);
  const userId = decoded.id;

  const [campaigns, setCampaigns] = useState<
    CampaignProgressResponse["data"]["campaigns"]
  >([]);
  const [showRedeemed, setShowRedeemed] = useState(false);

  useEffect(() => {
    async function fetchCampaignProgress() {
      try {
        const data = await getCampaignProgress(userId);

        console.log(data);

        setCampaigns(data.data.campaigns);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCampaignProgress();
  }, []);

  const [qrData, setQrData] = useState<string>("");
  const [showQr, setShowQr] = useState(false);
  let modalText: string;
  const stampClick = (campaignProgressRef, userRef, cardStatus) => {
    modalText = cardStatus;
    console.log(modalText);
    console.log(cardStatus);
    const qrData = JSON.stringify({
      campaignProgressRef,
      userRef,
    });

    setQrData(qrData);
    setShowQr(true);
  };

  return (
    <div className="page">
      <br></br>
      <h1>My Cards</h1>
      <br></br>
      <div className="active-view">
        <span>Show redeemed </span>
        <label className="switch">
          <input
            type="checkbox"
            checked={showRedeemed}
            onChange={() => setShowRedeemed(!showRedeemed)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {campaigns
        .filter((campaign) => showRedeemed || !campaign.redeemed)
        .map((campaign) => {
          const redeemedDate = campaign.redeemedAt
            ? new Date(campaign.redeemedAt).toLocaleDateString("en-GB")
            : null;
          let cardStatus;

          if (campaign.redeemed) {
            cardStatus = "redeemed";
          } else if (campaign.stamps.length === campaign.requiredStamps) {
            cardStatus = "ready-to-redeem";
          } else {
            cardStatus = "active";
          }
          let cardclickTitle: string = "Click to ";
          if (cardStatus) {
          }
          if (campaign.stamps.length === campaign.requiredStamps) {
            cardclickTitle += "redeem!";
          } else {
            cardclickTitle += "stamp your loyalty card!";
          }

          return (
            <div
              className={`loyalty-card allowLineBreak ${cardStatus}`}
              key={campaign._id}
            >
              <Link
                to={`/merchant/${campaign.merchant._id}`}
                className="merchant-card"
              >
                <div>
                  <h2>{campaign.merchant.name}</h2>
                </div>
              </Link>
              {
                // Card Click Area
              }

              <div
                id="StampLink"
                title={cardclickTitle}
                onClick={() =>
                  stampClick(
                    campaign.reference,
                    campaign.user.reference,
                    cardStatus,
                  )
                }
              >
                {
                  //qrData && <QRCodeSVG value={qrData} />
                }

                <table>
                  <tr>
                    <th>
                      <img
                        src={`/img/merchants/${campaign.merchant.photo}`}
                        alt={campaign.merchant.name}
                      />
                    </th>

                    <th>
                      <p>{campaign.campaign.description}</p>
                    </th>
                  </tr>
                </table>

                <div className="stamps">
                  {Array.from(
                    { length: campaign.requiredStamps },
                    (_, index) => (
                      <span
                        key={index}
                        className={`stamp ${
                          index < campaign.stamps.length ? "stamped" : ""
                        }`}
                      />
                    ),
                  )}
                </div>
                <p className="cardStatus">
                  {cardStatus === "redeemed"
                    ? `Redeemed on ${redeemedDate}`
                    : ""}
                  {cardStatus === "ready-to-redeem" ? "READY TO REDEEM" : ""}
                </p>
              </div>
            </div>
          );
        })}
      {showQr && (
        <div className="qr-overlay" onClick={() => setShowQr(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <QRCodeSVG className="qr-code" value={qrData} />
            <button className="qr-btn" onClick={() => setShowQr(false)}>
              X
            </button>
            <p className="qr-text allowLineBreak">{` Show this to a member of staff \n ${modalText === "ready-to-redeem" ? "to REDEEM!" : "to get more stamps!"}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Progress;
