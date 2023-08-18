import { generateRandomString } from "../../auth/generateRandomString";
import { generateCodeChallenge } from "../../auth/generateCodeChallenge";

function RedirectSpotifyAuthPage() {
  function userAuth() {
    const clientId = "033bd76c920749448a253f79f4288697";
    // this Uri links to our spotify client dashboard
    const redirectUri = "http://localhost:3000";

    // generating random string and passing it into generateCodeChallenge
    // is required for PKCE auth - it prevents authorization code injection attacks
    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      let state = generateRandomString(16);
      let scope = "user-read-private user-read-email";

      localStorage.setItem("code_verifier", codeVerifier);

      let args = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      //typescript hack cos of Location / Location | String errors
      const win: Window = window;
      win.location = "https://accounts.spotify.com/authorize?" + args;
    });

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    let getCodeVerifier = localStorage.getItem("code_verifier");

    //@ts-ignore
    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: getCodeVerifier,
    });

    const response = fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          console.log("hello?");
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        console.log("access token", data.access_token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("response", response);
  }

  return (
    <div>
      <button onClick={userAuth} className="main">
        GO
      </button>
    </div>
  );
}

export default RedirectSpotifyAuthPage;
