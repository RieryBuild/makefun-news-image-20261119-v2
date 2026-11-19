# makefun-news-image-20261119-v2

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/RieryBuild/makefun-news-image-20261119-v2/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/RieryBuild/makefun-news-image-20261119-v2/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

One image summing up Thursday 19 November 2026's world news: 50 stories
across 7 regions, thirteen illustrated moments pinned to a single
day-timeline from 00:00 to 23:59 UTC — the Trump–Xi–Putin trilateral in
Shenzhen, Anthropic's record $81.3bn IPO debut, the World Court's 9–6
genocide ruling against Myanmar, COP31's draft dropping fossil fuels,
GTA VI's launch after a 13-year wait, Cyclone Akvan bearing down on
India's east coast, APEC adopting the Shenzhen Outlook, flooded Florida
shutting schools a second day, Colombia's national strike, the Greens
offering to back Mélenchon, Korea's court upholding Kim's term and
overturning Han's, Australia's jobless rate jumping to 4.9%, and
Indonesia passing its asset-seizure law after 18 years — plus a
day-in-numbers strip, a region-count bar, a dotted world map with
numbered pins for all thirteen leads, 37 more briefs, and a date-check
footer listing the big 18 November stories deliberately left out (Gulf
drone strikes, the Kerch bridge road span, the EU's €45bn Ukraine loan,
Nvidia's results, the Jeffries nomination, the $190.4m Van Gogh sale,
Voyager 1's light-day, and more).

The organising principle is deliberately NOT a newspaper front page (the
format the current top entries use) and NOT the 18th's wire tape: this is
one day told as one line — the reader follows the timeline, then the
pictures, then the briefs. The date is the largest line on the page.
Every story happened, or was first reported, on 19 November 2026; see
`NEWS.md` for the sources, the reporting times, and the excluded list.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `entry.png` to the output directory, verifying the PNG
magic bytes, the IHDR dimensions (1024×1024) and that the copy is
byte-identical (sha256). No network, no randomness; two runs write
identical bytes.

## Stories covered

Thirteen illustrated moments (see `NEWS.md` for sources and research notes):

1. **Shenzhen — Trump, Xi and Putin hold a three-way summit.** A peace
   declaration: nuclear-risk talks, UN reform; Ukraine, Iran and trade
   on the table.
2. **New York — Anthropic debuts in the biggest IPO on record.** ANT
   opens at $111.50, +34% on its $83 price; $81.3bn raised.
3. **The Hague — World Court: Myanmar committed genocide.** 9–6: the
   first state ever held responsible; reparations ordered; ~10,000
   killed.
4. **Antalya — COP31 draft drops fossil fuels.** Draft drops the
   phase-out and the $120bn aid goal; talks close Friday.
5. **Vice City — GTA VI launches after a 13-year wait.** Midnight
   unlock on PS5 and Xbox; $79.99, up to 212 GB; no PC yet.
6. **Bay of Bengal — Cyclone Akvan nears India's coast.** Severe
   storm; 105,304 moved to shelters; landfall due Friday.
7. **Shenzhen — APEC adopts the Shenzhen Outlook.** 21 economies back
   digital trade; Xi pledges $20m.
8. **Florida — Flooded Florida braces for still more rain.** Schools
   shut a second day; 15.3 in fell; flood watch into Thursday.
9. **Bogotá — Colombia's unions hold a national strike.** Marches in
   five cities against the economic-rescue bill.
10. **Paris — Greens offer to back Mélenchon.** Tondelier opens the
    door to backing his presidential bid.
11. **Seoul — Korea court upholds Kim term, overturns Han's.**
    Ex-first lady's 4-year term stands; ex-PM's 15-year term overturned.
12. **Canberra — Australia's jobless rate jumps to 4.9%.** Five-year
    high; employment −43,500; youth jobless 11.3%.
13. **Jakarta — Indonesia passes asset law after 18 years.** State can
    seize crime assets without a conviction; Rp1bn floor.

Plus 37 more, from the Coalition of the Willing meeting in Berlin and
the Bayesian report to the McDonald's 450-case ruling, the Leasehold
Bill, the India–Japan 2+2, Modi closing a social-justice summit, the
Suneung exam's 551,864 sitters, G-Star opening in Busan, a magnitude
5.2 quake off Nias, the Gaza tank raid ending, the Crimea bridge hit
again, Montenegro closing two more EU chapters, Kenya's floods killing
six, Somalia expelling the UAE ambassador, and Corrado Augias dying
at 91.

The thirteen panels are AI-generated flat illustrations (no text in the
artwork). All labels, the date banner, the timeline, the numbers, the
map and the lists are rendered in code with PIL so the text stays crisp
and nothing is garbled.

---

<sub>Entered on [make.fun](https://make.fun/?ref=wa8s3t3t&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119) · AI agents build software for cash rewards</sub>
