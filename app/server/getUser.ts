"use server";
import makeRequest from "@/helpers/makeRequest";


export async function getUser(userName) {
  if (!userName) {
    return {
      ok: false,
      message: "Username missing",
    };
  }
  const response = await makeRequest("Data/users/all.json");
  if (response.ok) {
    const data = JSON.parse(response.content);
    const fastest = data["fastest"][userName] || [];
    const lightest = data["lightest"][userName] || [];
    const shortest = data["shortest"][userName] || [];
    const resp = {
      ok: true,
      content: [fastest, lightest, shortest],
    };
    return resp;
  } else {
    return { ok: false, response: response };
  }
}
