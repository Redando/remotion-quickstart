import { Composition } from "remotion";
import { QuoteComponent } from "./Composition";
import { Constants } from "./Constants.js";

export const RemotionRoot = () => {
  return (
    <>
      <QuoteComponent.quoteImageComposition quote={Constants.quote} query={'nature'} />
      <QuoteComponent.quoteVideoComposition quote={Constants.quote} query={'nature'} />
    </>
  );
};
