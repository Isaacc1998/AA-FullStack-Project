export function storeCSRFToken(response) {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) {
    sessionStorage.setItem("X-CSRF-Token", csrfToken);
  }
}

export async function restoreCSRF() {
  const res = await csrfFetch("/api/session");
  storeCSRFToken(res);
  return res;
}

async function csrfFetch(url, options = {}) {
  if (!options.headers) {
    options.headers = {};
  }

  if (!options.method) {
    options.method = "GET";
  }

  if (options.method.toUpperCase() !== "GET") {
    // options.headers["Content-Type"] =
    //   options.headers["Content-Type"] || "application/json";
    if (
      !options.headers["Content-Type"] &&
      !(options.body instanceof FormData)
    ) {
      options.headers["Content-Type"] = "application/json";
    }
    options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");
  }
  // console.log(options);
  const res = await fetch(url, options);

  if (res.status >= 400) throw res;
  return res;
}

export default csrfFetch;
