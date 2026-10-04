export interface MerchantResponse {
  status: "success";
  data: {
    merchant: Merchant[];
  };
}

export interface Merchant {
  _id: string;
  name: string;
  merchantType: string;
  address: string;
  photo: string;
  location: object;
  openingHours: object;
  //  MISSING OPENING HOURS FROM THE MODEL
}
