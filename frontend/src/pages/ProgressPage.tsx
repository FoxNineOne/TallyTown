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
      <h1>My Cards</h1>

      {campaigns.map((campaign) => (
        <div key={campaign._id}>
          <h2>{campaign.merchant.name}</h2>
          <p>{campaign.campaign.description}</p>
          <p>
            Stamps: {campaign.completedStamps} / {campaign.requiredStamps}
          </p>
          <p>{campaign.redeemed ? "Redeemed" : "Not redeemed"}</p>
        </div>
      ))}
    </div>
  );
}

export default Progress;
