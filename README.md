

https://github.com/user-attachments/assets/6fa422ad-8d63-455b-8d08-d793dcb3f759

# TenTwenty Assignment: Movie App (React Native + TypeScript)

A movie app built with **Expo**, **React Native** and **TypeScript**. It shows popular movies from the TMDB API, lets you search and view movie details, and has a ticket-booking flow (pick a date and showtime, then choose seats). It works in **portrait and landscape**, and keeps working **offline** with saved data.

## Features

- **Watch tab:** list of popular movies from TMDB
- **Search:** find movies by name
- **Movie details:** poster, overview and genres
- **Booking:** choose a date and showtime, then pick seats on a seat map (regular and VIP, with a running price)
- **Offline support:** data and images you have already loaded still show without internet
- **Portrait and landscape layouts** on both Android and iOS
- Tabs: Watch, Media Library, More

## Tech stack

| What | Used for |
|---|---|
| Expo + Expo Router | App setup and file-based navigation |
| React Native + TypeScript | UI and type safety |
| Axios | API requests |
| AsyncStorage | Saving API responses for offline use |
| TMDB API | Movie data |

## Getting started

**Requirements:** Node.js 18+, and Android Studio and/or Xcode if you want to run on an emulator.

```bash
# 1. Install packages
npm install

# 2. Create a .env file in the project root (see below)

# 3. Start the app
npx expo start
```

Press `a` for Android, `i` for iOS simulator, or scan the QR code with Expo Go.

### Environment variables

Create a `.env` file in the project root:

```
EXPO_PUBLIC_API_URL=https://api.themoviedb.org/3
EXPO_PUBLIC_IMAGE_BASE=https://image.tmdb.org/t/p/w500
EXPO_PUBLIC_BEARER_TOKEN=your_tmdb_read_access_token
```

Get a free token from your TMDB account under **Settings → API → API Read Access Token**. Restart Expo with `npx expo start -c` after changing `.env`.

## Project structure

```
app/                     Screens. With Expo Router, the file name is the route.
  _layout.tsx            Root layout of the app
  +not-found.tsx         Screen shown for unknown routes
  (tabs)/                Bottom tab screens
    _layout.tsx          Tab bar setup
    index.tsx            First tab
    media-library.tsx    Media Library tab
    more.tsx             More tab
    watch/               Watch tab and everything inside it
      _layout.tsx        Stack navigation for the Watch screens
      index.tsx          Movies list
      [id].tsx           Movie details (the id comes from the URL)
      searchmovies.tsx   Search screen
      booking.tsx        Choose date and showtime
      select-seats.tsx   Seat map and seat selection

components/              Reusable UI pieces used across screens
constants/
  booking.data.ts        Booking data (dates, showtimes, seat layout), kept apart from the UI
  Colors.ts              App colors in one place
services/                API code (axios client and movie requests)
assets/                  Images and fonts
android/, ios/           Native projects created by Expo
```

### In simple words

- **`app/`** is what the user sees. Each file is one screen.
- **`components/`** holds small building blocks (cards, loaders, headers) so screens stay short.
- **`services/`** is the only place that talks to the internet. Screens call simple functions like `getMovies()` and never deal with URLs or tokens.
- **`constants/`** holds fixed values. The booking data lives here, so changing a showtime or the seat layout never touches screen code.

## How it works

**Data flow:** Screen → function in `services/` → axios client → TMDB.

**Offline support:** every successful API response is saved on the phone. If a request fails because there is no internet, the saved copy of that same request is returned instead, so screens need no special offline code. Images are cached on disk the same way. Only content you have loaded at least once while online is available offline.

**Portrait and landscape:** screens read the window size and switch layouts. For example, the seat screen stacks the seat map above the legend in portrait, and puts the map on the left with the legend and button on the right in landscape. Safe-area insets are respected on all sides.

**Booking data:** the seat map is generated from a short text layout per row (`R` regular, `V` VIP, `X` unavailable, `.` empty), so changing the hall means editing a few strings.

## Building an Android APK locally

```bash
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
```

The APK is created at `android/app/build/outputs/apk/release/app-release.apk`. The `.env` file must exist in the project root before building, because the values are baked into the build.

## AI usage

I used **GitHub Copilot** (in VS Code) and **Claude** as coding assistants. I reviewed and adjusted what they produced. The git history shows how the work progressed, including a place where I overrode an AI suggestion.

## Known gaps and next steps

- Genre labels on the search results are not finished yet. I plan to add them as static UI.
- Tests are started and still in progress.
  
