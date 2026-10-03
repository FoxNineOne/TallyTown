import { useState, useEffect } from "react";
import type { CampaignProgressResponse } from "../../../shared/types/CampaignProgress";
import { getCampaignProgress } from "../api/campaignProgress";
import "../App.css";

function Progress() {
  // TEMP
  const userId = "6a1eebac333ddc7e8f19c6e7";
  //
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

  return (
    <div>
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

          return (
            <div className={`loyalty-card ${cardStatus}`} key={campaign._id}>
              <h2>{campaign.merchant.name}</h2>

              <table>
                <tr>
                  <th>
                    <img
                      src={`http://localhost:3000/img/merchants/${campaign.merchant.photo}`}
                      alt={campaign.merchant.name}
                    />
                  </th>

                  <th>
                    <p>{campaign.campaign.description}</p>
                  </th>
                </tr>
              </table>

              <div className="stamps">
                {Array.from({ length: campaign.requiredStamps }, (_, index) => (
                  <span
                    key={index}
                    className={`stamp ${
                      index < campaign.stamps.length ? "stamped" : ""
                    }`}
                  />
                ))}
              </div>
              {
                /* <p> Stamps: {campaign.stamps.length} / {campaign.requiredStamps}</p>*/ ""
              }
              <p className="cardStatus">
                {cardStatus === "redeemed" ? `Redeemed on ${redeemedDate}` : ""}
                {cardStatus === "ready-to-redeem" ? "READY TO REDEEM" : ""}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default Progress;
