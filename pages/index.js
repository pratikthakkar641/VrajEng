import { LayoutContext, Layout } from "../components/context/layoutContext";

export default function Index({
}) {
  return (
    <Layout
    >
      <LayoutContext.Consumer>
        {() => {
          return (
            <div>inner</div>
          );
        }}
      </LayoutContext.Consumer>
    </Layout>
  );
}
