# Product Spec — The Corporate Double Materiality Matrix 2025

**Version:** 1.0
**Date:** 1 July 2026
**Author:** Sustainability Manager, The Corporate
**Status:** Confirmed

---

## Section 1 — Tool Summary

**Tool name:** The Corporate — Double Materiality Matrix 2025

**What it does:** An interactive scatter chart that visualizes the results of The Corporate's 2025 double materiality assessment. It plots 16 ESG material topics on Financial Risk and Impact axes, color-coded by pillar (Environmental, Social, Governance), with four background zones representing materiality classifications and toggle filters to isolate each pillar.

**Who uses it:** The Double Materiality Working Group and Executive Leadership Team at The Corporate. Used for executive review, CSRD readiness, and corporate strategy integration.

**Why it exists:** The Corporate completed a full stakeholder engagement and materiality assessment across four stakeholder groups (Employees, Suppliers, Investors, Customers). The aggregated scores exist but have no visual matrix to communicate the results. This tool delivers the final materiality matrix — the missing deliverable — in an interactive, auditable, and presentation-ready format.

**Build status:** First build — no prior version.

---

## Section 2 — Classification

This section defines the architecture of the tool. Every downstream decision follows from this.

### Data Model

**Decision:** D1

| Label | What it means | This tool? |
|-------|--------------|-----------|
| D1 — Hardcoded | All data is written into the code by the developer. Users cannot input anything that persists. The tool displays what the developer put in. | Yes |
| D2 — Session | Data enters the tool during use and disappears when the tab closes. No database. Covers both uploaded files and form inputs. | No |
| D3 — Persisted | Data is written to a database and survives after the session ends. Supabase is required. | No |

**Reason:** All 16 material topics and their aggregated scores are finalized outputs from a completed assessment. The data is fixed and written into the code — no user input, no uploads, no persistence needed.

**D3 triggers — none apply:**
- [ ] Data must be retrievable after the session ends
- [ ] Multiple sessions contribute to the same dataset
- [ ] An audit trail or history is needed
- [ ] Data submitted by one person must be visible to another
- [ ] Results must be accessible via a URL after the session ends
- [ ] Files uploaded by users must be stored and retrievable later

---

### Access Model

**Decision:** A1

| Label | What it means | This tool? |
|-------|--------------|-----------|
| A1 — Public | Anyone with the URL can use it. No login, no account required. | Yes |
| A2 — Authentication | Users must log in. All logged-in users see the same thing and have the same permissions. | No |
| A3 — Authorization | Users must log in and have different roles. Different roles see different data or have different permissions. | No |

**Reason:** The matrix is a read-only visualization shared via link with the working group and leadership. No login is needed — access is controlled by sharing the URL only with intended recipients.

---

### Tier

**Tier:** 1

| Tier | D+A combination | Stack | Deployment |
|------|----------------|-------|------------|
| **1** | **D1+A1** | **Netlify only** | **Netlify** |
| 2 | D3+A1 | Netlify + Supabase (no auth) | Netlify |
| 3 | D3+A2 or D3+A3 | Netlify + Supabase (auth + RLS) | Netlify |

---

### Standalone or Stack

**This tool is:** Standalone — it does not share a database with any other tool.

---

## Section 3 — Arms

Arms are capabilities added to the tool. They do not change the tier.

---

### AI API Arm

**Active:** No

---

### Export Arm

**Active:** Yes

| Detail | Answer |
|--------|--------|
| Format | PDF |
| What is exported | A PDF rendering of the full materiality matrix chart, including the branded header (The Corporate logo mark, company name, chart title "Double Materiality Matrix 2025"), the scatter chart with all visible topic dots and background zones, and the legend bar. The PDF captures the current filter state — if a pillar is toggled off, it is excluded from the export. |
| PDF design intent | Single landscape page. The Corporate branded header at the top (logo mark + company name + chart title). The full scatter chart occupies the main area with all four background zones visible, threshold lines, and topic dots at their plotted positions. The zone legend and pillar color legend appear below the chart. A footer line reads "The Corporate — Double Materiality Assessment 2025 — Confidential". Clean, professional layout suitable for executive distribution and board presentation. |

---

### Email Arm

**Active:** No

---

### Scheduled Automation Arm

**Active:** No

---

## Section 4 — Stack and Deployment

### All Tiers

| Detail | Answer |
|--------|--------|
| Frontend framework | React + Vite + Tailwind |
| Deployment target | Netlify |
| Netlify MCP | Not active — deployment will be done manually through the Netlify dashboard. |

**GitHub — pre-build requirement:**
The builder creates the GitHub repo before the first Claude Code session. The product-spec.md, CLAUDE.md, and PROGRESS.md must be uploaded to the repo root before Claude Code opens. Claude Code assumes the repo exists, commits changes regularly, and pushes to main. It does not create or configure the repo.

---

## Section 5 — Data Architecture

N/A — Data model is D1. All data is hardcoded. No database, no tables, no file storage.

**Hardcoded dataset — 16 material topics:**

| Topic | Pillar | Financial Risk Score | Impact Score |
|-------|--------|---------------------|-------------|
| GHG Emissions (Scopes 1, 2, 3) | E | 3.73 | 4.30 |
| Energy Management & Renewable Transition | E | 3.58 | 3.80 |
| Water Stewardship | E | 3.28 | 3.78 |
| Hazardous Materials & Chemical Management | E | 4.03 | 4.33 |
| Waste Generation & Circular Economy | E | 3.43 | 3.88 |
| Upstream Supply Chain Emissions (Scope 3 Cat. 1) | E | 3.70 | 4.28 |
| Air Quality & Process Emissions | E | 3.18 | 3.55 |
| Product End-of-Life & E-Waste | E | 3.48 | 4.13 |
| Occupational Health & Safety | S | 3.95 | 4.20 |
| Labor Rights & Working Conditions | S | 4.43 | 4.58 |
| Responsible Minerals Sourcing | S | 4.13 | 4.55 |
| Community Impact & Local Employment | S | 3.13 | 3.70 |
| Workforce Development & Skills | S | 3.63 | 3.35 |
| Diversity, Equity & Inclusion | S | 3.20 | 3.43 |
| ESG Governance & Board Accountability | G | 3.70 | 3.48 |
| Multi-Jurisdictional Regulatory Compliance & Ethics | G | 4.33 | 4.05 |

This data is the output of a completed stakeholder engagement process. Scores are blended averages across four stakeholder groups (Employees, Suppliers, Investors, Customers), each weighted equally at 25%. The data must be written into the code exactly as shown — no rounding, no modification.

---

## Section 6 — Access and Permissions

N/A — Access model is A1. No authentication, no authorization, no RLS.

---

## Section 7 — GDPR

N/A — Data model is D1. No database, no personal data collected. GDPR does not apply.

---

## Section 8 — Screen and UI Structure

This tool has a single view — the materiality matrix.

### Materiality matrix (single view)

- **Purpose:** Display the finalized double materiality assessment results as an interactive scatter chart for executive review and presentation.

- **What is visible:**
  - **Header bar:** The Corporate logo mark (dark near-black square containing "[ C ]" in white text), company name "The Corporate", subtitle "ESG Assessment" beneath the company name, chart title "Double Materiality Matrix" right-aligned, and "Assessment Year 2025" beneath the title.
  - **Filter bar:** Three toggle buttons labeled "Environmental", "Social", and "Governance". Each button has a colored dot indicator matching the pillar color (green, yellow, red). Buttons toggle between active (full opacity) and inactive (dimmed) states. A "Filter:" label precedes the buttons.
  - **Chart area:** A scatter plot with Financial Risk on the x-axis (1.0 to 5.0) and Impact on the y-axis (1.0 to 5.0). Four background zones fill the chart area based on materiality thresholds (see Section 9 for exact zone definitions). Dashed threshold lines at 2.0, 3.0, and 3.5 on both axes. Zone labels ("HIGHLY MATERIAL", "MATERIAL", "WATCH LIST", "NOT MATERIAL") positioned inside their respective zones. Each of the 16 topics is plotted as a colored dot — green for Environmental, yellow for Social, red for Governance. Dots are sized for clear visibility (not tiny, not overlapping). Hover tooltip appears on each dot showing the topic name, both scores, and its materiality classification.
  - **Legend bar:** Zone legend showing four swatches with labels (Highly Material = red-tinted, Material = orange-tinted, Watch List = light gray, Not Material = gray). Pillar legend showing three colored dots with labels (E, S, G).
  - **Export button:** A "Download PDF" button that generates a PDF of the current chart view.

- **User actions:**
  - Toggle E, S, or G pillar filters on and off via the filter buttons — dots for that pillar appear or disappear from the chart with a smooth transition.
  - Hover over any topic dot to see its tooltip with name, scores, and classification.
  - Click "Download PDF" to export the current chart state as a branded PDF.

- **What happens next:** This is a single-view tool. No navigation. The user views, filters, hovers, and exports.

---

## Section 9 — Logic and Calculations

### Materiality classification logic

**What is calculated:** Each topic is classified into one of four materiality tiers based on its Financial Risk and Impact scores.

**Inputs:** The Financial Risk score (x) and Impact score (y) for each topic, both on a 1.0 to 5.0 scale.

**Classification rules — evaluated top-down, highest matching classification always applies:**

| Classification | Threshold criteria | Zone color |
|---|---|---|
| Highly Material | Financial Risk ≥ 3.5 AND Impact ≥ 3.5 | Red-tinted background |
| Material | Financial Risk ≥ 3.0 OR Impact ≥ 3.0, and does not qualify as Highly Material | Orange-tinted background |
| Watch List | At least one axis scores 2.0–2.9, and neither axis reaches 3.0 | Light gray background |
| Not Material | Both axes score below 2.0 | Gray background |

**Priority rule:** Classifications are evaluated top-down. The highest matching classification always applies. A strong score on one axis cannot be overridden by a weak score on the other.

**Worked example from the approved strategy:** A topic scoring 3.3 on Financial Risk and 2.5 on Impact is classified as Material. The Financial Risk axis clears the 3.0 threshold, which is sufficient. The 2.5 Impact score falls in the Watch List range but does not apply because the priority rule assigns the highest matching classification.

**Output:** Each topic receives one of four labels: Highly Material, Material, Watch List, or Not Material. The label appears in the hover tooltip and determines which background zone the topic sits in.

**Edge cases:** With all 16 topics scoring above 3.0 on at least one axis, no topics currently fall into Watch List or Not Material. The zones must still render correctly for completeness and auditability.

### Background zone rendering

The four zones are painted as background rectangles on the chart area:
- **Not Material zone:** Covers the full chart area from (1.0, 1.0) to (5.0, 5.0) as the base layer — gray.
- **Watch List zone:** Overlays where at least one axis is 2.0–2.9 — light gray.
- **Material zone:** Overlays where at least one axis is ≥3.0 — orange-tinted.
- **Highly Material zone:** Overlays where both axes are ≥3.5 — red-tinted.

Zones are painted back-to-front so higher-priority zones cover lower ones.

### Pillar color mapping

| Pillar | Category code | Dot color | Description |
|--------|--------------|-----------|-------------|
| Environmental | E | Green | 8 topics |
| Social | S | Yellow | 6 topics |
| Governance | G | Red | 2 topics |

---

## Section 10 — Brand and Visual Direction

**Brand reference:** No brand skill file. Direction derived from the approved strategy documents and builder's description.

**Brand direction for The Corporate:**
- **Primary color:** Near-black (#1a1a1a) — used for the logo mark background and header elements
- **Secondary color:** White (#ffffff) — used for the logo mark text and card backgrounds
- **Accent colors:** Defined by ESG pillar mapping — green (#3a8c3f) for Environmental, yellow/amber (#e6a817) for Social, red (#c0392b) for Governance
- **Logo mark:** A dark near-black square with rounded corners containing "[ C ]" in white text, 14–15px, weight 500
- **Font:** System sans-serif (Inter or equivalent) — clean, professional
- **Logo text:** "The Corporate" in 15px weight 500, with "ESG Assessment" as a subtitle in 11px uppercase tracking

**Visual feel:** Professional and corporate. Clean lines, generous whitespace, minimal decoration. The chart is the hero — everything else stays quiet and disciplined. Suitable for executive distribution and board-level presentation. The confidential footer reinforces the internal nature of the document.

---

## Section 11 — API and Credentials

No external services required. This is a Tier 1 tool with no database, no AI, no email, and no scheduled automation.

The PDF export is handled entirely client-side using a JavaScript library (e.g. html2canvas + jsPDF, or equivalent). No API key is needed.

| Service | What it does in this tool | Key required | Where key is stored |
|---------|--------------------------|-------------|-------------------|
| None | N/A | N/A | N/A |

**Credentials readiness:** No credentials needed. The builder can proceed directly to the build session.

---

## Section 12 — Out of Scope — Phase 2

| Deferred feature | Reason it is deferred |
|-----------------|----------------------|
| No features deferred | Builder confirmed nothing is being held back for this build |

---

## Section 13 — Acceptance Criteria

| # | What to verify | Expected result | Done? |
|---|---------------|-----------------|-------|
| 1 | Matrix chart loads with all 16 topic dots plotted at correct coordinates | All dots visible at their exact Financial Risk (x) and Impact (y) positions matching the hardcoded data table | [ ] |
| 2 | Background zones render correctly with four distinct colors | Highly Material (red-tinted) covers ≥3.5 on both axes, Material (orange-tinted) covers ≥3.0 on either axis, Watch List (light gray) covers 2.0–2.9, Not Material (gray) covers below 2.0 — painted back-to-front | [ ] |
| 3 | Pillar color coding is correct | Environmental topics = green dots, Social topics = yellow dots, Governance topics = red dots | [ ] |
| 4 | E/S/G filter toggles work independently | Clicking each filter button shows/hides only the dots for that pillar. Multiple filters can be toggled independently. Smooth transition animation. | [ ] |
| 5 | Hover tooltip displays correct information | Hovering over any dot shows: topic name, Financial Risk score, Impact score, and materiality classification. Tooltip positions correctly near the dot. | [ ] |
| 6 | Materiality classification logic matches the approved thresholds | Each topic's tooltip classification matches the priority rule: Highly Material if both ≥3.5, Material if either ≥3.0, Watch List if at least one 2.0–2.9 and neither ≥3.0, Not Material if both below 2.0 | [ ] |
| 7 | Header displays correct branding | The Corporate logo mark ([ C ] in dark square), company name, "ESG Assessment" subtitle, "Double Materiality Matrix" title, and "Assessment Year 2025" all render correctly | [ ] |
| 8 | Legend bar is complete and accurate | Zone legend shows all four classifications with correct color swatches. Pillar legend shows E, S, G with correct colored dots. | [ ] |
| 9 | PDF export produces a branded document | Clicking "Download PDF" generates a PDF with the header, chart (reflecting current filter state), legends, and confidential footer. Layout is landscape, professional, and suitable for executive distribution. | [ ] |
| 10 | Tool deploys and is accessible at the Netlify URL | Live URL loads correctly on desktop and mobile. Chart is responsive and readable at common screen widths. | [ ] |

---

## Section 14 — Build Path

**This tool's tier:** Tier 1

---

### Pre-build steps — complete these before opening Claude Code

- [ ] Tool Architect skill — interview complete, this spec is written and confirmed by the builder
- [ ] Project Governor skill — CLAUDE.md and PROGRESS.md produced from this spec
- [ ] GitHub repo created by the builder
- [ ] product-spec.md uploaded to the GitHub repo root
- [ ] CLAUDE.md uploaded to the GitHub repo root
- [ ] PROGRESS.md uploaded to the GitHub repo root
- [ ] Brand skill file uploaded to the GitHub repo root (not applicable — no brand file)
- [ ] Netlify connected to the GitHub repo (manual deploy — Netlify MCP not active)

---

### Tier 1 — build session

- [ ] Open Claude Code in the project folder (GitHub repo connected to Netlify)
- [ ] Claude Code runs First Session Setup: creates docs/, moves reference files
- [ ] Claude Code reads product-spec.md, CLAUDE.md, and PROGRESS.md
- [ ] Claude Code builds the tool
- [ ] Test locally before deploying
- [ ] Push to main → Netlify deploys, then verify live URL

---

## Section 15 — Open Questions

| Question | Who answers it | Blocking? |
|----------|---------------|-----------|
| No open questions | N/A | N/A |

---

## Section 16 — Tool Version History

| Version | Date | What changed in the tool |
|---------|------|--------------------------|
| v1.0 | 1 July 2026 | Initial build |

---

*This spec is written for Claude Code. It assumes zero prior context. Every decision, rule, and requirement must be explicit enough that the builder can hand this document to Claude Code without a single verbal explanation.*
