# Shree Khata Windows desktop builder

This packages the existing https://shree-khata.princesaini2344.chatgpt.site app in a sandboxed desktop window. The root index.html remains the promotional website.

## Download the installer

Open GitHub Actions → Build Shree Khata Windows → latest successful run → Artifacts → Shree-Khata-Windows-Setup. Extract the ZIP and run Shree-Khata-Setup-1.0.0.exe on Windows 10/11 x64. Choose installation folder; desktop and Start Menu shortcuts are created. Artifacts expire after 30 days; run the workflow again when needed.

## Build on your laptop

Install Node.js 22, download this repository with Code → Download ZIP, extract it, and double-click BUILD-WINDOWS.cmd. Internet is needed to download dependencies. Installer appears in dist. Exact top-level Electron and electron-builder versions are pinned; npm resolves transitive dependencies at build time.

## Use

- Sign in with your existing Shree Khata account. Internet is required for the hosted app; this does not add offline ledger storage or synchronization.
- Cloud records are available subject to the existing app's account permissions. Browser-local records and browser login sessions are not automatically imported. This builder does not modify cloud records.
- Ctrl+P: print current page. Ctrl+Shift+S: save current page as PDF. For full statements, use the existing app's statement export. Popup-based print flows may need Ctrl+P instead.
- Ctrl+H: return home / retry after network failure. Ctrl+R: refresh.
- External HTTPS links ask before opening the system browser. No Node.js access is exposed to website content. Camera/microphone and other permission requests are denied.
- Installer is unsigned. No signing certificate or automatic update service is configured. Cloud website updates appear when the app reloads; desktop shell updates require a new installer.

## Validation limits

Source syntax is checked before packaging. A successful Actions run establishes installer packaging only. Real Windows installation, account login, printer, downloads, and app-specific PDF/WhatsApp flows still require a Windows smoke test. Embedded third-party OAuth may require separate support from the hosted app.
