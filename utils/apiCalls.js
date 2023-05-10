import { client } from "../services/contentful";
import Cache from "memory-cache";

const longPeriodOfTime = 24 * 60 * 60 * 1000;  /* 24 hours Cache timeout */
const mediumPeriodOfTime = 1 * 60 * 60 * 1000; /* 1 hour Cache timeout */
const shortPeriodOfTime = 30 * 60 * 1000; /* 30 minutes Cache timeout */

export const getPageContentLayout = async (
    reference,
  ) => {
    let pageContent = {
      content_type: "page",
      include: 3,
      "fields.reference": reference
    };
      console.log("pageContent",pageContent)
    let res;
    let getCacheData = await getCacheValue(`${reference}`)
    if (getCacheData) {
      res = getCacheData
    }
    else {
      res = await client.getEntries(pageContent);
      Cache.put(`${reference}`, res, shortPeriodOfTime)
    }
    console.log("resssssss",res)
    let layoutData = res.items[0]?.fields;
    if (!layoutData) {
      return null;
    }
    return { ...res.items[0].fields };
  };
  export const getCacheValue = async (name) => {
    let value = Cache.get(name);
    if (value) {
      return value
    }
    else {
      return false
    }
  };