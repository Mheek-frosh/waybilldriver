# Waybill Driver

Expo / React Native driver registration app, adapted from the Waybill customer app. Uses the same charcoal, lime (`#D4E903`), navy (`#01144E`), splash animation, illustrations, and screen/component/theme structure.

## Run

Use Node 22.13 or newer. Run `npm install`, then `npm start` for Expo, or `npm run web` for a browser preview. Run `npm test` for registration validation checks.

## Flow

Splash → introduction → Rider / Van / Truck popup → phone or email → driver details → vehicle details → review → completed profile draft. Fields stay available when going back or editing the review. Android back follows registration steps. Forms scroll and accommodate the keyboard.

## Current scope

This is a registration frontend. Drafts are stored in memory for the current session only. No SMS, email, authentication, document verification, or server submission is connected. The UI states that clearly and never marks drivers verified or approved. Connect those services before enabling actual applications or deliveries. Nigerian phone numbers are supported in this first flow.

Customer EAS project IDs, update URLs, credentials and customer booking screens were deliberately not copied. Configure a separate EAS project for this app before publishing.
