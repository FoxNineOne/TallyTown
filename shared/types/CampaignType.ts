export interface Campaign {
  _id: string;
  merchant: string;
  active: boolean;
  description: string;
  requiredStamps: number;
}

export interface CampaignResponse {
  status: "success";
  data: {
    campaigns: Campaign[];
  };
}
