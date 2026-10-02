import type { CampaignProgressResponse } from "../../../shared/types/CampaignProgress";

export async function getCampaignProgress(
  userId: string,
): Promise<CampaignProgressResponse> {
  const response = await fetch(
    `http://localhost:3000/api/v1/campaignprogress/user/${userId}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
