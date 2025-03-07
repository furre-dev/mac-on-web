import { isValidUrl } from "../isValidUrl";

const api_url = `${process.env.NEXT_PUBLIC_MACOS_API_URL}/api/get-url-metadata`

export type UrlApiResponse = {
  title: string,
  description: string,
  image: string,
  webpage_url: string
}

export async function getUrlMetadata(url: string) {
  if (!isValidUrl(url)) return null;


  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url
    })
  });

  const data: UrlApiResponse = await response.json();

  return data
}