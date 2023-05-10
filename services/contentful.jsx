import * as contentful from "contentful";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const spaceId = publicRuntimeConfig.SPACEID;
const accessToken = publicRuntimeConfig.ACCESSTOKEN;
const environment = publicRuntimeConfig.CONTENTFUL_ENVIRONMENT;

export const client = contentful.createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: environment,
});
