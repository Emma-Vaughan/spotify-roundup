import { generateRandomString } from "../../auth/generateRandomString";
import { generateCodeChallenge } from "../../auth/generateCodeChallenge";
import { clientId, redirectUri } from "../utils/constants";

function RedirectSpotifyAuthPage() {
  function userAuth() {
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
