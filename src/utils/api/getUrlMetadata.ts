"use client";
import { isValidUrl } from "../isValidUrl";

const api_url = `${process.env.NEXT_PUBLIC_MACOS_API_URL}/api/get-url-metadata`

export type UrlApiResponse = {
  title: string | null,
  description: string | null,
  image: string | null,
  webpage_url: string,
  error?: boolean
}

export async function getUrlMetadata(url: string): Promise<UrlApiResponse | null> {
  if (!isValidUrl(url)) return null;
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url
      })
    });

    if (!response.ok) {
      const baseUrl = new URL(url);
      return {
        title: null,
        description: null,
        image: null,
        webpage_url: baseUrl.hostname.replace(/^www\./, ''),
        error: true
      }
    }

    const data: UrlApiResponse = await response.json();

    return data
  } catch (e: any) {
    throw new Error(e);
  }
}