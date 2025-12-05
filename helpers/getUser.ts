import safeFetch from "@/helpers/safeFetch";

export default async function getUser(userName) {
  const res = await safeFetch(
    `https://toph-backend.netlify.app/api/getUser?userName=${userName}`,
  );

  const data = res.data;
  return data;
}
