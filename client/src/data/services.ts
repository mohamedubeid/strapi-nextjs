import { getStrapiURL } from "@/utils/get-strapi-url";

const BASE_URL = getStrapiURL();

export async function subscribeService(email: string) {
  console.log("emailemailemailemailemailemailemailemailemailemailemailemailemailemailemail");
  const url = new URL("/api/newsletter-signps", BASE_URL);
  console.log("url", url.href);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          email,
        },
      }),
    });

    return response.json();
  } catch (error) {
    console.error("Subscribe Service Error:", error);
  }
}

export interface EventsSubscribeProps {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  event: {
    connect: [string];
  };
}