import { BlockRenderer } from "@/components/BlockRenderer";
import { getHomePageData } from "@/data/loaders";
import { notFound } from "next/navigation";

async function loader() {
  const data = await getHomePageData();
  if(!data) notFound();

  console.log("data", data);
  return { ...data.data };
}


export default async function Home() {
  const data = await loader();
  const blocks = data.blocks || [];
  console.log('------------------------------------------------------------------------------------------')
  console.log(data);
  console.log('------------------------------------------------------------------------------------------')
  return <BlockRenderer blocks={blocks} />;
}
