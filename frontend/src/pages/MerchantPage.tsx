import { useState, useEffect } from "react";
import type { MerchantResponse } from "../../../shared/types/MerchantType.ts";
import { getOneMerchant } from "../api/merchantAPI.ts";

import type { CampaignResponse } from "../../../shared/types/CampaignType.ts";
import { getAllCampaignsForOneMerchant } from "../api/campaignAPI.ts";

import "../App.css";
import { data, useParams } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Merchant() {
  let { id } = useParams();
  const currentTime = new Date();
  const today = currentTime
    .toLocaleDateString("en-GB", { weekday: "long" })
    .toLowerCase();

  const [activeTab, setActiveTab] = useState<"map" | "loyalty">("map");

  //Main Merchant info
  const [merchant, setMerchant] = useState<
    MerchantResponse["data"]["merchant"] | null
  >(null);

  useEffect(() => {
    async function fetchMerchant() {
      try {
        const data = await getOneMerchant(id);
        setMerchant(data.data.merchant[0]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMerchant();
  }, []);

  // Merchant Active Campaigns
  const [merchantCampaigns, setMerchantCampaigns] = useState<
    CampaignResponse["data"]["campaigns"] | null
  >(null);

  const [stampCounter, setStampCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStampCounter((current) => (current < 3 ? current + 1 : current - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchMerchantCampaigns() {
      try {
        const data = await getAllCampaignsForOneMerchant(id);
        //console.log(data);

        setMerchantCampaigns(data.data.campaigns);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMerchantCampaigns();
  }, [merchantCampaigns]);

  // End
  if (merchant) {
    const todayHours = merchant.openingHours[today];

    const isOpen =
      todayHours.open !== null &&
      todayHours.close !== null &&
      currentTime >= todayHours.open &&
      currentTime < todayHours.close;

    return (
      <div key={merchant.name}>
        <h1>
          <img
            src={`/img/merchantTypes/${merchant.merchantTypeIcon}`}
            alt={merchant.merchantTypeDescription}
            height={50}
            width={50}
            title={merchant.merchantTypeDescription}
          />
          {"  "}
          {merchant.name}
          {"  "}
          <img
            src={`/img/icons/${isOpen ? "opensign.png" : "closedsign.png"}`}
            alt={isOpen ? "OPEN TODAY!" : "Closed Today"}
            height={50}
            width={50}
            title={isOpen ? "OPEN TODAY!" : "Closed Today"}
          />
        </h1>
        <h3>{merchant.description}</h3>
        <img
          src={`/img/merchants/${merchant.photo}`}
          alt={merchant.name}
          height={200}
          width={200}
        />
        <br />
        <span>
          <p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${merchant.location.coordinates[0]},${merchant.location.coordinates[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Click to find directions!"
            >
              {merchant.address}
            </a>
          </p>
          <br />
        </span>
        <div>
          {Object.entries(merchant.openingHours).map(([day, hours]) => (
            <div key={day}>
              {today === day ? (
                <span id="today">
                  <b>{day.toUpperCase()} </b>:
                  {hours.open ? (
                    `${hours.open} - ${hours.close} `
                  ) : (
                    <b> CLOSED</b>
                  )}
                </span>
              ) : (
                <span>
                  <b>{day[0].toUpperCase() + day.slice(1)} </b>:{" "}
                  {hours.open ? (
                    `${hours.open} - ${hours.close} `
                  ) : (
                    <b>CLOSED</b>
                  )}
                </span>
              )}
            </div>
          ))}
        </div>
        <br />
        <br />
        {/* MAP / LOYALTY AREA */}
        <div id="tab-module">
          {/* TABS */}
          <div className="panel-buttons">
            <button
              className={activeTab === "map" ? "active" : ""}
              onClick={() => setActiveTab("map")}
            >
              Map
            </button>

            <button
              className={activeTab === "loyalty" ? "active" : ""}
              onClick={() => setActiveTab("loyalty")}
            >
              Loyalty Cards
            </button>

            <br />
            <br />
          </div>
          {/* CONTENT */}
          <div className="map-viewport">
            <div
              className="map-track"
              style={{
                transform:
                  activeTab === "map" ? "translateX(0)" : "translateX(-50%)",
              }}
            >
              {/* MAP */}
              <div className="active-panel">
                <center>
                  <br />
                  <br />
                  <MapContainer
                    center={merchant.location.coordinates}
                    zoom={100}
                    style={{ height: "400px", width: "60%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Marker position={merchant.location.coordinates}>
                      <Popup>{merchant.name}</Popup>
                    </Marker>
                  </MapContainer>
                </center>
              </div>

              {/* LOYALTY */}
              <div className="active-panel">
                {merchantCampaigns ? (
                  <div className={`campgaign`}>
                    {merchantCampaigns.map((campaign) => {
                      return (
                        <a href="">
                          <div
                            className="loyalty-card"
                            key={campaign._id}
                            title="Click to add to your account!"
                          >
                            <br />
                            <h2 className="allowLineBreak">
                              {campaign.description}
                            </h2>
                            <br />
                            <br />
                            <div className="stamps">
                              {Array.from(
                                { length: campaign.requiredStamps },
                                (_, index) => (
                                  <span
                                    key={index}
                                    className={`stamp ${
                                      index < stampCounter ? "stamped" : ""
                                    }`}
                                  />
                                ),
                              )}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <img
                      src={"/img/icons/TT_loading.gif"}
                      alt="loading"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* END MAP / LOYALTY AREA */}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <img
          src={"/img/icons/TT_loading.gif"}
          alt="loading"
          height={100}
          width={100}
        />
      </div>
    );
  }
}
export default Merchant;
