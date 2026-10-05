import type { MerchantResponse } from "../../../shared/types/MerchantType";

export async function getOneMerchant(
  merchantId: string,
): Promise<MerchantResponse> {
  const response = await fetch(
    `http://localhost:3000/api/v1/merchant/${merchantId}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
