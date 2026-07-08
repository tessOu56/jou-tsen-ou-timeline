# Jou-Tsen Ou｜Academic Record（學術歷程時間軸）

展示歐柔岑（Jou-Tsen Ou）學術歷程的靜態網頁：論文、預印本、里程碑、學經歷。
純 HTML/JS、無需建置。本機瀏覽請起本機伺服器（`python -m http.server`）後開 `index.html`
（資料改為 fetch 載入，`file://` 直開會被瀏覽器阻擋）。

## 功能

- 關鍵字搜尋（標題／作者／期刊／標籤，含高亮）
- 類別與驗證狀態篩選；點標籤快速搜尋
- 每筆紀錄附公開來源連結
- 目前篩選結果可匯出 JSON

## 內容管理（CMS）

`/admin/` 為 [Sveltia CMS](https://github.com/sveltia/sveltia-cms) 管理介面（純前端、Git-based，無後端）：

1. 請 repo 擁有者將你加為 collaborator（write 權限）
2. 開 `https://tessou56.github.io/jou-tsen-ou-timeline/admin/`，點 **Sign In with Token**，
   貼上你的 GitHub fine-grained PAT（僅需本 repo 的 Contents read/write）
3. 編輯後存檔即 commit 到 `main`，GitHub Pages 自動重新部署

## 資料

紀錄集中於 `data/records.json`（SSOT），每筆皆有公開來源；標示「待確認」者代表尚未取得公開佐證。

## 自動追蹤

GitHub Actions [`publication-tracker`](.github/workflows/publication-tracker.yml) 每月 1 日查
Semantic Scholar，比對 DOI 後把新發表以 `verified: false` 開 PR 供審核（不直接上線）。
可從 Actions 頁籤手動觸發；本機測試：`node scripts/check-publications.mjs --dry-run`。

## 資料來源

- [UMD 化學系人員頁](https://chem.umd.edu/people/jou-tsen-ou)、[博士口試公告 2025-10-17](https://chem.umd.edu/events/ms-jou-tsen-ou-chemistry-phd-defense-self-assembly-drives-rare-earth-separation-m4l4-cages)
- [Taylor Lab 著作清單](https://www.mercedestaylorlab.com/publications)
- [Semantic Scholar 作者頁](https://www.semanticscholar.org/author/Jou-Tsen-Ou/40559614)（引用統計）
- [ResearchGate](https://www.researchgate.net/profile/Jou-Tsen-Ou-2)

最後更新：2026-07-07
