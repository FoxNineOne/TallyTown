import { useState, useEffect } from "react";
import type { MerchantResponse } from "../../../shared/types/Merchant";
import { getOneMerchant } from "../api/merchant.ts";
import "../App.css";
import { data, useParams } from "react-router-dom";

function Merchant() {
  // TEMP
  let { id } = useParams();
  const { merchantId } = useParams();

  //
  const [merchant, setMerchant] = useState<
    MerchantResponse["data"]["merchant"] | null
  >(null);

  useEffect(() => {
    async function fetchMerchant() {
      try {
        const data = await getOneMerchant(id);

        // console.log(data);
        // console.log(data.data.merchant);
        setMerchant(data.data.merchant);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMerchant();
  }, []);

  let openingHours;

  {
    /* <p>{merchant.location.coordinates[0]}</p>
      <p>{merchant.location.coordinates[1]}</p> 
      
      const openTime = merchant.openingHours.map((day) => {
        !day.open
        ? `<p>${day} CLOSED </p>`
        : ` <p> ${day} ${day.open} - ${day.closed} </p>`;
    });
    */
  }
  if (merchant) {
    let text: string = ``;

    if (merchant.openingHours && merchant.openingHours !== null) {
      Object.entries(merchant.openingHours).map(([day, hours]) => {
        day = day[0].toUpperCase() + day.slice(1);
        !hours.open
          ? (text += `${day} CLOSED |`)
          : (text += `${day}: ${hours.open} - ${hours.close} |`);
      });
    }

    return (
      <div>
        <h1>{merchant.name}</h1>
        <h3>{merchant.description}</h3>
        <h4>"This string means something!: "{merchant.merchantType}</h4>

        <img
          src={`http://localhost:3000/img/merchants/${merchant.photo}`}
          alt={merchant.name}
          height={200}
          width={200}
        />
        <br />
        <br />
        <span>
          <p>{merchant.address}</p> <br />
        </span>
        <div>
          {Object.entries(merchant.openingHours).map(([day, hours]) => (
            <div key={day}>
              <span>
                <b>{day[0].toUpperCase() + day.slice(1)} </b>:{" "}
              </span>
              <span>
                {hours.open ? `${hours.open} - ${hours.close} ` : <b>CLOSED</b>}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Merchant;
