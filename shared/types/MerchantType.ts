export interface MerchantResponse {
  status: "success";
  data: {
    merchant: Merchant[];
  };
}

export interface Merchant {
  _id: string;
  name: string;
  description: string;
  merchantType: object;
  address: string;
  photo: string;
  location: object;
  openingHours: object;
  merchantTypeIcon: string;
  merchantTypeDescription: string;
  //  MISSING OPENING HOURS FROM THE MODEL
}
