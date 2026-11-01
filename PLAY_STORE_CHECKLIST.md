# Shree Khata — Android / Play Store readiness

## Current state
- GitHub Pages contains a promotional website, **not** the Android app source.
- No verified APK or AAB is attached. Do not advertise an APK download yet.
- Existing live web app: https://shree-khata.princesaini2344.chatgpt.site

## Before Android packaging
1. Obtain original app source or build a separate Android wrapper with an explicit data and login compatibility plan.
2. Back up existing customer ledger data; never uninstall the working app before verifying backups and restore.
3. Determine whether the installed shortcut is a PWA or native Android APK.
4. Decide Android application ID, app icon, name, signing key ownership and versioning.
5. Test mobile login, ledger updates, offline behavior, navigation and data persistence.
6. Check permissions, authentication, secrets, network security and access to personal financial data.

## GitHub Release
1. Build and sign a release APK from verified source.
2. Test installation and upgrade on real Android devices.
3. Publish APK as a GitHub Release asset; update the website download link only after verification.

## Google Play
1. Register and verify Play Console developer account; pay applicable registration fee.
2. Produce signed release AAB with a stable package name and target SDK matching current Play requirements.
3. Prepare icon, screenshots, descriptions, support contact, privacy policy and account/data deletion procedures if applicable.
4. Complete Data Safety, permissions, content rating, app access and other Play Console declarations truthfully.
5. Implement appropriate privacy disclosures for the *actual app*; the current website notice is not sufficient.
6. Complete required testing (including any account-specific closed-testing requirements), resolve policy warnings and submit for review.

Do not upload customer records, private keys, signing keys or credentials to a public repository.
