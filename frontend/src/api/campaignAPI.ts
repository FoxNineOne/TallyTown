import type { CampaignResponse } from "../../../shared/types/CampaignType";

export async function getAllCampaignsForOneMerchant(
  merchantId: string,
): Promise<CampaignResponse> {
  const response = await fetch(
    `http://localhost:3000/api/v1/campaign/merchant/${merchantId}`,
    { credentials: "include" },
  );

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
