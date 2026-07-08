// 每月發表追蹤：查 Semantic Scholar，比對 DOI，新發表以 verified:false 追加到 data/records.json
// 由 .github/workflows/publication-tracker.yml 排程執行；本機 dry-run：node scripts/check-publications.mjs --dry-run
import fs from "node:fs";

const AUTHOR_ID = "40559614"; // Jou-Tsen Ou @ Semantic Scholar
const RECORDS_PATH = new URL("../data/records.json", import.meta.url).pathname;
const DRY_RUN = process.argv.includes("--dry-run");
const API = `https://api.semanticscholar.org/graph/v1/author/${AUTHOR_ID}`;

// 從任意字串（doi.org / chemrxiv / pubs.acs.org…）抽出 DOI（10.xxxx/...）
const normDoi = (s) => {
  const m = String(s || "").toLowerCase().match(/10\.\d{4,9}\/[^\s"'<>]+/);
  return m ? m[0].replace(/[.,;)\]]+$/, "") : "";
};

async function getJSON(url) {
  const res = await fetch(url, { headers: { "User-Agent": "jou-tsen-ou-timeline-tracker" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json();
}

const data = JSON.parse(fs.readFileSync(RECORDS_PATH, "utf8"));
const knownDois = new Set(data.records.map((r) => normDoi(r.source)).filter(Boolean));
const knownTitles = new Set(data.records.map((r) => r.title.toLowerCase().trim()));

const [author, papersResp] = await Promise.all([
  getJSON(`${API}?fields=paperCount,citationCount,hIndex`),
  getJSON(`${API}/papers?fields=title,year,venue,externalIds,publicationDate,publicationTypes&limit=100`),
]);

const added = [];
for (const p of papersResp.data || []) {
  const doi = normDoi(p.externalIds?.DOI);
  const title = (p.title || "").trim();
  if (!title) continue;
  if (doi && knownDois.has(doi)) continue;
  if (!doi && knownTitles.has(title.toLowerCase())) continue;

  const isPreprint =
    /rxiv|preprint/i.test(p.venue || "") || (p.publicationTypes || []).includes("Preprint");
  const date = p.publicationDate || (p.year ? String(p.year) : "");
  if (!date) continue;

  added.push({
    id: `${isPreprint ? "pre" : "pub"}-${date.slice(0, 4)}-${(doi || title).replace(/[^a-z0-9]+/gi, "").slice(-8).toLowerCase()}`,
    date,
    displayDate: String(p.year || date.slice(0, 4)),
    category: isPreprint ? "preprint" : "publication",
    title,
    detail: "由每月自動追蹤（Semantic Scholar）發現，作者序與摘要待人工補充。",
    venue: p.venue || "",
    tags: ["自動追蹤待審"],
    verified: false,
    source: doi ? `https://doi.org/${doi}` : "",
  });
}

// 更新統計（僅在有新發表、要開 PR 時一併帶入）
if (added.length) {
  const now = new Date();
  data.person.metrics = {
    papers: author.paperCount,
    citations: author.citationCount,
    hIndex: author.hIndex,
    asOf: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}（Semantic Scholar）`,
  };
  data.records.push(...added);
  data.records.sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

console.log(`已知 DOI ${knownDois.size} 筆；Semantic Scholar 回傳 ${papersResp.data?.length ?? 0} 篇；新發表 ${added.length} 筆`);
for (const r of added) console.log(`  + [${r.category}] ${r.date} ${r.title}`);

if (added.length && !DRY_RUN) {
  fs.writeFileSync(RECORDS_PATH, JSON.stringify(data, null, 2) + "\n");
  console.log("records.json 已更新");
}

// 給 GitHub Actions 的輸出
if (process.env.GITHUB_OUTPUT) {
  const titles = added.map((r) => `- ${r.title}`).join("\n");
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `found=${added.length}\ntitles<<EOF\n${titles}\nEOF\n`);
}
