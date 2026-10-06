import type { CampaignProgressResponse } from "../../../shared/types/CampaignProgressType";

export async function getCampaignProgress(
  userId: string,
): Promise<CampaignProgressResponse> {
  const response = await fetch(`/api/v1/campaignprogress/user/${userId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
