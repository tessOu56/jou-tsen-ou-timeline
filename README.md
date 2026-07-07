# Jou-Tsen Ou｜Academic Record（學術歷程時間軸）

獨立展示專案：收錄歐柔岑（Jou-Tsen Ou）的學術參與紀錄（論文、預印本、里程碑、學經歷）。
資料與展示完全自包含，不依賴其他專案。GitHub：<https://github.com/tessOu56/jou-tsen-ou-timeline>

## 使用

瀏覽器直接開 `index.html`。功能：

- 關鍵字搜尋（標題／作者／期刊／標籤，含高亮）與類別、驗證狀態篩選
- 私有紀錄顯示切換、目前篩選結果匯出 JSON
- 每筆附公開來源連結；點標籤快速搜尋

## 資料模型：公開 vs 私有

| 檔案 | 內容 | 版本控制 |
|------|------|----------|
| `data/records.js` | 公開紀錄 SSOT（皆有公開來源或明確標示待確認） | ✅ 進 git，可對外部署 |
| `data/records.private.js` | 私有補充（未公開職位、個人細節、家人提供資訊） | ❌ `.gitignore` 排除，僅存本機 |
| `data/records.private.example.js` | 私有檔範本 | ✅ 進 git |

`index.html` 會自動載入私有檔（不存在則靜默略過）：公開部署（GitHub Pages 等）只要不上傳私有檔，即天然隔離。私有紀錄在介面上有「私有」標記與左側紫邊。

**原則**：任何要對外公開的資訊，必須先確認 `verified: true` 且家人同意，才從私有檔移入 `records.js`。

## 資料維護

新增紀錄照現有格式複製一筆物件。`verified: false` 顯示「待確認」，確認後改 `true` 並補 `source`。

待補充：台大／交大年份學位、UMD 入學年份（推估 2021）、日本博後機構（建議先寫入私有檔）、會議發表與獎項。

## 自動追蹤

排程任務 `jou-tsen-ou-publication-tracker` 每月 1 日檢查 Semantic Scholar / Taylor Lab / 網路搜尋，新發表自動比對 DOI 後寫入 `records.js` 並更新統計。

## 資料來源

- [UMD 化學系人員頁](https://chem.umd.edu/people/jou-tsen-ou)、[博士口試公告 2025-10-17](https://chem.umd.edu/events/ms-jou-tsen-ou-chemistry-phd-defense-self-assembly-drives-rare-earth-separation-m4l4-cages)
- [Taylor Lab 著作清單](https://www.mercedestaylorlab.com/publications)
- [Semantic Scholar 作者頁](https://www.semanticscholar.org/author/Jou-Tsen-Ou/40559614)（引用統計）
- [ResearchGate](https://www.researchgate.net/profile/Jou-Tsen-Ou-2)

最後更新：2026-07-07
