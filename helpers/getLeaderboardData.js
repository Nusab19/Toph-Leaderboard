"use server"

import makeRequest from "@/helpers/makeRequest";

export default async function getLeaderboardData() {
  const res = await makeRequest("Data/leaderboard.json");
  const data = res.content;
  return JSON.parse(data);
}
