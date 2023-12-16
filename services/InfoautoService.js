import axios from "axios";
const HOST = "https://services.infoauto.com.ar/preciosa-service/";
const GET_INFO = HOST + "brands/download?vehicleType=cars";
const GET_BRANDS_URL = HOST + "brands?paginated=true&vehicleType=cars";
//const GET_YEARS_URL = HOST + "brands/{0}/groups/{1}/models?paginated=true&vehicleType=cars";
const VERSIONS_URL =
  "https://api.sancristobal.com.ar/marketing-marketing/api/InfoAuto/versions-by-brand-model-year-and-portal-category?year={0}&brandId={1}&modelId={2}";

export const acceptedYears = new Date().getFullYear() - 10; //vehicles upto 10 years back from now

export const getInfoAutoInfo = () => {
  return axios.get(GET_INFO, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getBrands = (callback) => {
  const brands = [];
  const payload = { features: {} };

  const firstCall = async () => {
    let response = await axios.post(GET_BRANDS_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  };

  firstCall().then((result) => {
    if (result) {
      const data = result.data;
      if (data && data.pagination && data.pagination.totalResults > 0) {
        data.response.forEach((element) => {
          brands.push({
            label: element.name,
            value: element.id,
          });
        });

        let axiosSubCalls = [];
        if (data.pagination.nextPage != null) {
          for (
            let index = data.pagination.nextPage;
            index <= data.pagination.totalPages;
            index++
          ) {
            axiosSubCalls.push(
              axios.post(GET_BRANDS_URL + "&page=" + index, payload, {
                headers: { "Content-Type": "application/json" },
              }),
            );
          }

          Promise.all(axiosSubCalls).then(function (results) {
            if (results) {
              results.forEach((resultPage) => {
                const dataPage = resultPage.data;
                if (
                  dataPage &&
                  dataPage.response &&
                  dataPage.response.length > 0
                ) {
                  dataPage.response.forEach((element) => {
                    brands.push({
                      label: element.name,
                      value: element.id,
                    });
                  });
                }
              });
            }
            return callback(brands);
          });
        } else {
          return callback(brands);
        }
      }
    }
  });
};
export const getVersions = (brandId, modelId, year, callback) => {
  axios
    .get(
      VERSIONS_URL.replace("{0}", year)
        .replace("{1}", brandId)
        .replace("{2}", modelId),
      {
        headers: {
          "Content-Type": "application/json",
          //'Authorization': 'Bearer ' + authToken
        },
      },
    )
    .then((response) => {
      if (!response || !response.data || !response.data.versions)
        callback(null);
      else {
        callback(
          response.data.versions.map((item) => {
            return {
              label: item.description,
              value: item.infoAutoCode,
            };
          }),
        );
      }
    });
};
