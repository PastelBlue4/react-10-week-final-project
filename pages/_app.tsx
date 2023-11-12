import "../global.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="flex justify-center w-screen ">
        <div className="w-full max-w-screen-lg ">
          <Component {...pageProps} />
        </div>
      </div>
    </SWRConfig>
  );
}
