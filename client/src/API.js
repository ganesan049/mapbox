// const API_URL = "http://localhost:1337";

// export async function listLogEntries() {
//   const response = await fetch(`${API_URL}/api/logs`);
//   console.log(response);
//   return response.json();
// }
// export async function crateLogEntry(entry) {
//   const response = await fetch(`${API_URL}/api/logs`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(entry),
//   });
//   console.log(response);
//   return response.json();
// }
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:1337"
    : "https://travel-log-api.now.sh";

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

export async function crateLogEntry(entry) {
  const apiKey = entry.apiKey;
  delete entry.apiKey;
  console.log(apiKey);
  const response = await fetch(`${API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(entry),
  });
  // const json = response.json();
  // if (response.ok) {
  //   return json;
  // }
  // console.log(json);
  // const error = new Error(json.message);
  // error.response = json;
  // throw error;
  let json;
  if (response.headers.get("content-type").includes("text/html")) {
    const message = await response.text();
    json = {
      message,
    };
  } else {
    json = await response.json();
  }
  console.log(json);
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}
