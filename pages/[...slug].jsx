import { LayoutContext, Layout } from "../components/context/layoutContext";
import {
    getPageContentLayout,
} from "../utils/apiCalls";
import LandingPage from "../components/templates/contentPage";

export default function Page({
    layout,
    pageLayoutBlocks,
    formScriptData,
}) {
    return (
        <Layout>
            <LayoutContext.Consumer>
                {() => {
                    return (
                        <LandingPage
                            pageLayoutBlocks={pageLayoutBlocks}
                            layout={layout}
                            formScriptData={formScriptData}
                        />
                    );
                }}
            </LayoutContext.Consumer>
        </Layout>
    );
}

export const getServerSideProps = async (ctx) => {
        var url = ctx.resolvedUrl.startsWith("/", 0)
            ? ctx.resolvedUrl.substr(1)
            : ctx.resolvedUrl;
        url = url?.split("?")[0];
        console.log("url",url)
        const layout = await getPageContentLayout(url?.toLowerCase());
        console.log("layout",layout)
        const blocks = layout?.contentBlocks?.map((d) => {
            return { ...d.fields, id: d.sys.id };
        });
        const formScriptData = blocks ? blocks.length > 0 ? blocks?.filter((i) => {
            if (i.name == "Form Script") {
                return i
            }
        }) : [] : []
        return {
            props: {
                layout: layout || null,
                pageLayoutBlocks: blocks || null,
                formScriptData,
            },
        };
    }
