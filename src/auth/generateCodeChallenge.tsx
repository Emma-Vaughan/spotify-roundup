export async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(hashedString: ArrayBuffer) {
    return btoa(String.fromCharCode.apply(new Uint8Array(hashedString)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  // transforms from string to uft-8 binary
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);

  // hashes the bytes for encryption
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}
