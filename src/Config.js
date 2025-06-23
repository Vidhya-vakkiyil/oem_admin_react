export default {
  SAP_SSO_ENABLED: process.env.REACT_APP_MODE === "prod" ? true : false,
  LOCAL_DEV_NODE_URL: "http://localhost:4000",
}