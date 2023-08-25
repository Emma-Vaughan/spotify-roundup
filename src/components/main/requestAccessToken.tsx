import { useEffect } from "react";
import { clientId, redirectUri } from "../utils/constants";

export default function RequestAccessToken({ code }: { code: string }) {
  useEffect(() => {
    let getCodeVerifier = localStorage.getItem("code_verifier");

    // we are redirected back to our app with the authorisation code
    // as a URL parameter
    //@ts-ignore
    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: getCodeVerifier,
    });

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [code]);

  return <div>I have an access token now</div>;
}
