import axios from "axios";

const apiHost =
  "https://avue5dzy10.execute-api.sa-east-1.amazonaws.com/Prod/api/v1/";
const POST_QUOTE_WEB_VEHICLE_URL = apiHost + "quote/vehicle/web";

export const postQuoteWeb = (payload, callback) => {
  const quoteVehicleCall = async () => {
    let response = await axios.post(POST_QUOTE_WEB_VEHICLE_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  quoteVehicleCall()
    .then((result) => {
      callback(result);
    })
    .catch((error) => {
      callback(error);
    });
};
