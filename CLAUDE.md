# aly + shay Studio — Claude Instructions

## Branch-Workflow
- Immer direkt auf `main` arbeiten — **kein Feature-Branch**
- Nach jeder Änderung sofort committen und auf `main` pushen
- Kein Pull Request nötig

## Deployment
- Vercel ist mit GitHub `main` verbunden — jeder Push deployt automatisch live
- Kein manuelles Deployen nötig

## Projekt
- Statische HTML/CSS/JS Website (kein Framework, kein Build-Step)
- Alle Seiten: index.html, about.html, portfolio.html, kontakt.html, impressum.html, datenschutz.html, service-*.html
- Shared styles: styles.css, home.css, about.css, portfolio.css, service.css, kontakt.css
- Shared logic: shared.js (Burger-Menu, Clock), i18n.js (Sprachumschaltung EN/DE)
