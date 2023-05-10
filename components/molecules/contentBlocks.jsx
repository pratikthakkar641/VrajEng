import { useEffect, useState } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
export const BannerBlock = ({ item, imageStyles, bannerImageClick }) => {
  const [bannerImage, setBannerImage] = useState();
  const [appIcons, setAppIcons] = useState([])
  useEffect(() => {
    const imageURL = utils.image(
      item.image[0]?.fields,
      window.innerWidth
    );
    setBannerImage(imageURL);
  }, []);
  useEffect(() => {
    window.onresize = (event) => {
      const imageURL = utils.image(
        item.image[0]?.fields,
        window.innerWidth
      );
      setBannerImage(imageURL);
    };
  }, []);
  useEffect(() => {
    if (item && item?.iconsOverImage) {
      const iconsData = item?.iconsOverImage ? item?.iconsOverImage.length > 0 ? item.iconsOverImage.filter((i) => {
        if (i.fields.countrycode) {
          return i
        }
      }) : [] : []
      setAppIcons(iconsData)
    }
  }, [])

  return item?.textOverImage ? (
    <div
      onClick={() => bannerImageClick(item?.bannerClickJson ? item?.bannerClickJson?.innerSlide != true ? country == "nz" ? item?.bannerClickJson?.nzUrl : item?.bannerClickJson?.auUrl : "" : "")}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bannerImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: bannerImage ? item?.image[0]?.fields?.backgroundSize ? item?.image[0]?.fields?.backgroundSize : "100% 100%" : "100% 100%",
        objectFit: "cover",
        cursor:"pointer"
      }}

      className={"image-bg"}
    >
      <div className="contentBlock contentBlockResponsive textOverImageContainer" style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ marginBottom: 20, color: item?.textOverImageColor ? item.textOverImageColor : "#fff", maxWidth: item?.textOverImageWidth ? item.textOverImageWidth : "620px" }}
          className="textOverImage"
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(item?.textOverImage).replace(
              /\n/g,
              `</br>`
            ),
          }}
        />
        <div className="appIconOverImage">{appIcons ? appIcons.length > 0 ? appIcons.sort((a, b) => {
          return a?.fields?.order - b?.fields?.order;
        }).map((item, index) => <img src={item?.fields?.icon?.fields?.file?.url} key={"appIcon" + index} onClick={() => window.open(item?.fields?.url)} className="appOverImage" alt="icon" />) : <></> : <></>}</div>
      </div>
    </div>
  ) : (
    <img onClick={() => bannerImageClick(item?.bannerClickJson ? item?.bannerClickJson?.innerSlide != true ? country == "nz" ? item?.bannerClickJson?.nzUrl : item?.bannerClickJson?.auUrl : "" : "")} src={bannerImage} loading="lazy" alt="Image" style={{ imageStyles, cursor: "pointer", maxWidth: item?.image[0]?.fields?.maxWidth ? item?.image[0]?.fields?.maxWidth : "auto", height: "550px" }} />
  );
};

export const ImageBlock = ({ item, imageStyles }) => {
  const [bannerImage, setBannerImage] = useState();
  const [appIcons, setAppIcons] = useState([])
  useEffect(() => {
    const imageURL = utils.image(
      item.image[0]?.fields,
      window.innerWidth
    );
    setBannerImage(imageURL);
  }, []);
  useEffect(() => {
    window.onorientationchange = (event) => {
      const imageURL = utils.image(
        item.image[0]?.fields,
        window.innerWidth
      );
      setBannerImage(imageURL);
    };
  }, []);
  useEffect(() => {
    if (item && item?.iconsOverImage) {
      const iconsData = item?.iconsOverImage ? item?.iconsOverImage.length > 0 ? item.iconsOverImage.filter((i) => {
        if (i.fields.countrycode) {
          return i
        }
      }) : [] : []
      setAppIcons(iconsData)
    }
  }, [])

  return item?.textOverImage ? (
    <div
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bannerImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: bannerImage ? item?.image[0]?.fields?.backgroundSize ? item?.image[0]?.fields?.backgroundSize : "100% 100%" : "100% 100%",
        objectFit: "cover",
      }}
      className={"image-bg"}
    >
      <div className="contentBlock contentBlockResponsive textOverImageContainer" style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ marginBottom: 20, color: item?.textOverImageColor ? item.textOverImageColor : "#fff", maxWidth: item?.textOverImageWidth ? item.textOverImageWidth : "620px" }}
          className="textOverImage"
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(item?.textOverImage).replace(
              /\n/g,
              `</br>`
            ),
          }}
        />
        <div className="appIconOverImage">{appIcons ? appIcons.length > 0 ? appIcons.sort((a, b) => {
          return a?.fields?.order - b?.fields?.order;
        }).map((item, index) => <img src={item?.fields?.icon?.fields?.file?.url} key={"appIcon" + index} onClick={() => window.open(item?.fields?.url)} className="appOverImage" alt="icon" />) : <></> : <></>}</div>
      </div>
    </div>
  ) : (
    <img src={bannerImage} loading="lazy" alt="Image" style={{ imageStyles, maxWidth: item?.image[0]?.fields?.maxWidth ? item?.image[0]?.fields?.maxWidth : "auto" }} />
  );
};

export const TextBlock = ({ item, ind, baseUrls = {}, idMerchant, nested }) => {
  const [appIcons, setAppIcons] = useState([])
  useEffect(() => {
    if (item && item?.iconsOverImage) {
      const iconsData = item?.iconsOverImage ? item?.iconsOverImage.length > 0 ? item.iconsOverImage.filter((i) => {
        if (i.fields.countrycode) {
          return i
        }
      }) : [] : []
      setAppIcons(iconsData)
    }
  }, [])
  return (
    <div
      className="textBlock"
      style={{ marginTop: item?.image?.[0].fields ? 25 : 64 }}
      id={idMerchant}
    >
      {item?.header ? <h2
        style={{
          textAlign: item?.headerCentered ? "center" : "left",
          marginTop: nested ? "2rem" : 0,
          fontSize: "30px",
          color: item?.headerColor,
        }}
      >
        {item.header}
      </h2> : <></>}
      <div style={{ textAlign: item?.contentCentered ? "center" : "left" }} className="contextHeading">
        {documentToReactComponents(item?.content, renderLinkOptions(baseUrls))}
      </div>
      {item?.buttonField && (
        <div className="buttonsJsonDiv" style={{ flexDirection: item?.buttonField ? item?.buttonField.length > 0 ? item?.buttonField[0]?.flexDirection == "column" ? "column" : "row" : "row" : "" }}>
          {item?.buttonField.length > 0 && (
            item.buttonField.map((item, index) =>
              <div key={index + "buttons"} style={{ width: item?.width ? item?.width : "fit-content", textAlign: "center", backgroundColor: item?.backgroundColor ? item.backgroundColor : "black", color: item?.color ? item.color : "white", padding: item?.padding ? item.padding : "10px", margin: item?.margin ? item.margin : "10px", borderRadius: item?.borderRadius ? item.borderRadius : "0px", cursor: "pointer", fontFamily: "Roboto, sans-serif", fontSize: item?.fontSize ? item.fontSize : "1rem", fontWeight: item?.fontWeight ? item.fontWeight : "400" }}><a style={{ color: item?.color ? item.color : "white", textDecoration: "none" }} href={country == "au" ? item?.auUrl ? item.auUrl : "#" : item?.nzUrl ? item.nzUrl : ""} download={item?.use ? item.use == "download" ? true : false : false} target={item?.use ? item.use == "innerNavigate" ? "_self" : "_blank" : "_self"}>{item?.text}</a></div>)
          )}
        </div>)}
      {appIcons ? appIcons.length > 0 ? <div className="appIconTextBlock">{appIcons ? appIcons.length > 0 ? appIcons.sort((a, b) => {
        return a?.fields?.order - b?.fields?.order;
      }).map((item, index) => <img src={item?.fields?.icon?.fields?.file?.url} key={"appIcon" + index} onClick={() => window.open(item?.fields?.url)} className="textBlockAppIcon" alt="icon" />) : <></> : <></>}</div> : <></> : <></>}
    </div>
  );
};

export const VideoBlock = ({ item, ind, baseUrls = {}, idMerchant, nested }) => {
  return (
    <div className="textBlock" style={{ marginTop: item?.image?.[0].fields ? 25 : 64 }} id={idMerchant}>
      <div class="w-embed-youtubevideo">
        <iframe
          src={item?.videoData?.src}
          frameBorder="0"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "auto",
          }}
          allow="autoplay; encrypted-media"
          allowFullScreen=""
          title={item?.videoData?.title}
          sandbox
        ></iframe>
      </div>
    </div>
    
  );
};
export const ButtonJson = ({ item }) => {
  return (
    <>
      {item?.buttonField && (
        <div className="buttonsJsonDiv" style={{ flexDirection: item?.buttonField ? item?.buttonField.length > 0 ? item?.buttonField[0]?.flexDirection == "column" ? "column" : "row" : "row" : "" }}>
          {item?.buttonField.length > 0 && (
            item.buttonField.map((item, index) =>
              <div key={index + "buttons"} style={{ width: item?.width ? item?.width : "fit-content", textAlign: "center", backgroundColor: item?.backgroundColor ? item.backgroundColor : "black", color: item?.color ? item.color : "white", padding: item?.padding ? item.padding : "10px", margin: item?.margin ? item.margin : "10px", borderRadius: item?.borderRadius ? item.borderRadius : "0px", cursor: "pointer", fontFamily: "Roboto, sans-serif", fontSize: item?.fontSize ? item.fontSize : "1rem", fontWeight: item?.fontWeight ? item.fontWeight : "400" }}><a style={{ color: item?.color ? item.color : "white", textDecoration: "none" }} href={country == "au" ? item?.auUrl ? item.auUrl : "#" : item?.nzUrl ? item.nzUrl : ""} download={item?.use ? item.use == "download" ? true : false : false} target={item?.use ? item.use == "innerNavigate" ? "_self" : "_blank" : "_self"}>{item?.text}</a></div>)
          )}
        </div>)}
    </>
  );
};
