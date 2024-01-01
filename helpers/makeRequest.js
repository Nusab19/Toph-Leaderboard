const PAT = process.env.PAT;
const USER = process.env.USER;
const REPO = process.env.REPO;
const BRANCH = process.env.BRANCH;

const options = {
  headers: {
    Authorization: `Bearer ${PAT}`,
    "User-Agent": "Node.js",
  },
  next: {
    revalidate: 60 * 10,
  },
};

export default async function makeRequest(filename) {
  const url = `https://api.github.com/repos/${USER}/${REPO}/contents/${filename}?ref=${BRANCH}`;

  try {
    const response = await fetch(url, options);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    const resp = {
      ok: true,
      content: content,
    };
    return resp;
  } catch (error) {
    console.error("Error:", error.message);

    const resp = {
      ok: false,
      error: error.message,
    };
    return resp;
  }
}
