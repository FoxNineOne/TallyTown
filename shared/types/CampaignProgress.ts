export interface CampaignProgressResponse {
  status: "success";
  data: {
    campaigns: CampaignProgress[];
  };
}

export interface CampaignProgress {
  _id: string;
  campaign: {
    _id: string;
    description: string;
  };
  merchant: {
    _id: string;
    name: string;
  };
  user: {
    _id: string;
    name: string;
  };
  requiredStamps: number;
  stamps: Stamp[];
  completedStamps: number;
  redeemed: boolean;
  redeemedAt?: string;
  redeemedBy?: string;
}

export interface Stamp {
  _id: string;
  stampedBy: string;
  createdAt: string;
}
