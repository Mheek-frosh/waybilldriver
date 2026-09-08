# Waybill Driver

Expo / React Native driver registration app, adapted from the Waybill customer app. Uses the same charcoal, lime (`#D4E903`), navy (`#01144E`), splash animation, illustrations, and screen/component/theme structure.

## Run

Use Node 22.13 or newer. Run `npm install`, then `npm start` for Expo, or `npm run web` for a browser preview. Run `npm test` for registration validation checks.

## Flow

Splash → introduction → Rider / Van / Truck popup → phone or email → driver details → vehicle details → review → Verify details → success bottom sheet → driver dashboard. Fields stay available when going back or editing the review. Android back follows registration steps. Forms scroll and accommodate the keyboard.

The dashboard includes Home, Earnings, Activity and Account tabs; an earnings card; online/offline controls; a sample delivery request with pickup and completion steps; and wallet, notifications, safety, support, profile and document information sheets. Completing the sample delivery updates earnings and activity once. Drivers cannot go offline during an active sample delivery.

## Current scope

This is a registration and driver dashboard frontend. Drafts, availability and sample earnings are stored in memory for the current session only. Verify details checks local form completeness, not identity. No SMS, email, authentication, document verification, server submission, real dispatch, live navigation, support messaging or payments are connected. The UI labels sample data and pending verification. Connect those services before enabling actual applications or deliveries. Nigerian phone numbers are supported in this first flow. The decorative delivery area is not a live map; the sample request uses Lagos addresses.

EAS is linked to `@michaelusd/waybill-driver` (project `cd37baa3-f7c0-45d6-8576-34932b18ac85`), separate from the customer app. `expo-updates` uses runtime version policy `appVersion`.

Publish preview updates with `eas update --channel preview --environment preview --message "Describe changes"`. The preview build profile creates an internal Android APK using the preview channel. A compatible native build containing Expo Updates must be installed to receive these updates; create the initial Android build with `eas build --platform android --profile preview`. Production has its own channel.
