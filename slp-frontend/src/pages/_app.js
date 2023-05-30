import '@/styles/globals.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";
import PageLayout from "@/components/page_layout";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return(
      <div>
        <QueryClientProvider client={queryClient}>
            <PageLayout>
                <Component {...pageProps} />
            </PageLayout>

        </QueryClientProvider>
      </div>


  )
}
