import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Head from "next/head";
import { ImageBlock, TextBlock, VideoBlock, BannerBlock, ButtonJson } from "../../components/molecules/contentBlocks";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";

const ContentPage = ({
    layout,
    pageLayoutBlocks,
    formScriptData,
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [appReviews, setAppReviews] = useState([])
    const [bookReviews, setBookReviews] = useState([])

    useEffect(() => {
        if (formScriptData && formScriptData.length > 0) {
            const script = document.createElement("script");
            script.setAttribute("charset", "utf-8");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", "//js-eu1.hsforms.net/forms/embed/v2.js");
            script.async = true;
            document.querySelector("#hubspotForm").appendChild(script);
            script.onload = () => {
                window.hbspt.forms.create({
                    region: formScriptData[0]?.formScript[0]?.hubspotRegion,
                    portalId: formScriptData[0]?.formScript[0]?.hubspotPortalId,
                    formId: formScriptData[0]?.formScript[0]?.hubspotFormId,
                });
            };
        }
    }, [])

    const handleBannerImageClick = (url) => {
        if (url) {
            router.push(url)
        } else {
            const elementToScrollTo = document.querySelector('#scrollTo');
            if (elementToScrollTo && Object.keys(elementToScrollTo).length > 0) {
                const distanceToElement = elementToScrollTo?.offsetTop;
                const finalScrollPosition = distanceToElement - 100;
                window.scrollTo({
                    top: finalScrollPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    const renderInnerNestedBlocks = (item) => {
        return (
            item?.contentBlocks?.length > 0 && (
                <Row
                    style={{
                        paddingTop: item?.contentBlocks?.length > 0 ? 10 : 0,
                        margin: "0px"
                    }}
                >
                    {item?.contentBlocks?.map(({ fields }, i) => (
                        <Col key={i + "renderInnerNestedBlocks"} lg={fields.colSpan ?? 12} md={fields.colSpan ?? 12} style={{ padding: "0px" }} id={item?.bannerClickJson?.innerSlide ? "scrollTo" : ""}>
                            {fields?.renderedFieldType?.includes("Image") &&
                                fields?.image?.[0]?.fields && (
                                    <ImageBlock
                                        item={fields}
                                        key={"nested-image-" + i}
                                        ind={i}
                                        nested={true}
                                        imageStyles={{ marginTop: "2rem" }}
                                    />
                                )}
                            {fields?.renderedFieldType?.includes("Context") &&
                                (fields?.header || fields?.content) && (
                                    <TextBlock
                                        item={fields}
                                        key={"nested-text-" + i}
                                        ind={i}
                                        baseUrls={baseUrls}
                                        nested={true}
                                    />
                                )}
                            {fields?.renderedFieldType?.includes("Video") &&
                                fields?.videoData && (
                                    <VideoBlock
                                        item={fields}
                                        key={"nested-video-" + i}
                                        ind={i}
                                        baseUrls={baseUrls}
                                        nested={true}
                                    />
                                )}
                            {fields?.buttonField && (
                                <ButtonJson
                                    item={fields}
                                    key={"nested-button-" + i}
                                />
                            )}
                        </Col>
                    ))}
                </Row>
            )
        );
    };
    const renderNestedBlocks = (item) => {
        return (
            item?.contentBlocks?.length > 0 && (
                <Row
                    style={{
                        paddingTop: item?.contentBlocks?.length > 0 ? 30 : 0,
                        margin: "0px"
                    }}
                >
                    {item?.contentBlocks?.map(({ fields }, i) => (
                        <>
                            <Col key={i + "renderNestedBlocks"} lg={fields.colSpan ?? 6} md={fields.colSpan ?? 6} id={item?.bannerClickJson?.innerSlide ? "scrollTo" : ""}>
                                {fields?.renderedFieldType?.includes("Image") &&
                                    fields?.image?.[0]?.fields && (
                                        <ImageBlock
                                            item={fields}
                                            key={"nested-image-" + i}
                                            ind={i}
                                            nested={true}
                                            imageStyles={{ marginTop: "2rem" }}
                                        />
                                    )}
                                {fields?.renderedFieldType?.includes("Context") &&
                                    (fields?.header || fields?.content) && (
                                        <TextBlock
                                            item={fields}
                                            key={"nested-text-" + i}
                                            ind={i}
                                            baseUrls={baseUrls}
                                            nested={true}
                                        />
                                    )}
                                {fields?.renderedFieldType?.includes("Video") &&
                                    fields?.videoData && (
                                        <VideoBlock
                                            item={fields}
                                            key={"nested-text-" + i}
                                            ind={i}
                                            baseUrls={baseUrls}
                                            nested={true}
                                        />
                                    )}
                                {fields?.contentBlocks ? renderInnerNestedBlocks(fields) : <></>}
                            </Col>
                        </>
                    ))}
                </Row>
            )
        );
    };

    const renderBlock = (item, ind) => {
        const fieldType = item?.renderedFieldType;
        const buttonLink =
            item?.buttonUrl && getFieldsByCountry(item?.buttonUrl);
        return (
            <div
                style={{ backgroundColor: item?.image?.[0]?.fields?.backgroundColor ? item?.image?.[0]?.fields?.backgroundColor : item?.divisionBackgroundColor ? item?.divisionBackgroundColor : "transparent" }}
                key={ind + "renderBlock"}
            >
                <Row
                    className={`contentBlock ${item.showFullWidth ? "" : "contentBlockResponsive"
                        }`}
                >
                    <div style={{ padding: 0, width: "100%" }}>
                        {fieldType?.includes("Image") && item?.image?.[0]?.fields && (
                            <BannerBlock
                                key={"image-" + ind}
                                item={item}
                                ind={ind}
                                bannerImageClick={(url) => handleBannerImageClick(url)}
                            />
                        )}
                        {fieldType?.includes("Context") &&
                            (item?.header || item?.content) && (
                                <TextBlock
                                    key={"text-" + ind}
                                    item={item}
                                    ind={ind}
                                    baseUrls={baseUrls}
                                />
                            )}
                        {fieldType?.includes("Slider") && item?.contentBlocks && (
                            <Carousel
                                key={"text-" + ind}
                                data={item?.contentBlocks}
                                item={item}
                                ind={ind}
                            />
                        )}
                        {fieldType?.includes("Video") && item?.videoData && (
                            <VideoBlock
                                item={item}
                                key={"text-" + ind}
                                ind={ind}
                                baseUrls={baseUrls}
                            />
                        )}
                        {fieldType?.includes("Offers") && (
                            <CitiesWiseOffers citiesDataRes={citiesDataRes} arrowImageUrl={arrowImageUrl} isLoader={receiveLoaderState} />
                        )}
                        {renderNestedBlocks(item)}
                        {item?.buttonText && (
                            <div
                                style={{
                                    marginTop: "2rem",
                                    display: "flex",
                                    borderRadius: 5,
                                    cursor: "pointer",
                                }}
                            >
                                <a
                                    className="content-block-button"
                                    href={
                                        buttonLink?.[0] +
                                        (buttonLink?.[0].includes("?") ? "&" : "?") +
                                        `redirect-url=${document.URL}`
                                    }
                                    style={{
                                        display: "flex",
                                        color: "#fff",
                                        textDecoration: "none",
                                        margin: "6px 30px",
                                        backgroundColor: item?.buttonBackground,
                                        ...item?.buttonStyles,
                                    }}
                                >
                                    <div class="text-block">{item?.buttonText}</div>
                                </a>

                            </div>
                        )}
                    </div>
                </Row>
            </div>
        );
    };
    const metaTags = layout?.pageConfiguration?.fields?.metaTags || {};
    return (
        <>
            {isLoading ? <Loader setMargin={"-5rem"} /> : <></>}
            <div className="content-page">
                {layout ? (
                    <>
                        <Head>
                            <meta
                                name="viewport"
                                content="initial-scale=1.0, width=device-width"
                            />
                            <title>{layout?.pageConfiguration?.fields?.title}</title>
                            {Object.keys(metaTags).map((key, index) => (
                                <meta name={key} content={metaTags[key]} key={index} />
                            ))}
                        </Head>
                        {layout?.bannerImage && (
                            <ImageBlock
                                imageStyles={{
                                    height: 550,
                                    width: "100%",
                                    backgroundPosition: "50% 50%",
                                    objectFit: "cover",
                                }}
                                item={{ image: [layout?.bannerImage] }}
                            />
                        )}
                        {(layout?.showTitle || layout?.content) && (
                            <Container className={`${layout?.title && "mt-5"}`}>
                                <span className="title-content-page mb-5">
                                    {layout?.showTitle && layout?.title}
                                </span>
                                <div
                                    className="content-page-richtext"
                                    dangerouslySetInnerHTML={{
                                        __html: documentToHtmlString(layout?.content).replace(
                                            /\n/g,
                                            `</br>`
                                        ),
                                    }}
                                />
                            </Container>
                        )}
                        <div>
                            {pageLayoutBlocks?.map(renderBlock)}
                        </div>
                        {formScriptData && formScriptData.length > 0 ? <Container>
                            <><div id="hubspotForm"></div><script
                                dangerouslySetInnerHTML={{
                                    __html: `
          hbspt.forms.create({
              region: ${formScriptData[0]?.formScript[0]?.hubspotRegion},
              portalId: ${formScriptData[0]?.formScript[0]?.hubspotPortalId},
              formId: ${formScriptData[0]?.formScript[0]?.hubspotFormId}
          });
        `,
                                }}
                            />
                            </>
                        </Container> : <></>}
                        <div>
                        </div>
                    </>
                ) : (
                    <div className="text-center p-5">
                        Not Found
                    </div>
                )}
            </div>
        </>

    );
};

export default ContentPage;
