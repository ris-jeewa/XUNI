# XUNI - Movie App (React Native + Expo)

A mobile application for browsing trending movies using TMDB API.

## Features

- User authentication with Firebase
- Trending movies display with card view
- Detailed movie information
- Click counter for movie interactions
- State management using Zustand

## Tech Stack

- React Native
- Expo
- NativeWind (TailwindCSS)
- Firebase Authentication
- TMDB API
- Zustand
- Expo Router

## Prerequisites

- Node.js
- npm
- Expo CLI
- Firebase account
- TMDB API key

## Screenshot of Home page

<img src="/assets/images/homeSS.jpg" alt="App Screenshot" width="300" />

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ris-jeewa/XUNI

```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file in root directory
   - Add your API keys:
```
TMDB_API_KEY=your_tmdb_api_key
```

4. Configure Firebase:
   - Create a Firebase project
   - Add Firebase configuration in `firebaseConfig.js`

## Running the App

```bash
npx expo start
```

## Project Structure

```
XUNI/
├── app/
│   ├── _layout.js
│   ├── home.js     
├── components/
│   ├── MovieStore.js   
├── constants/
└── firebaseConfig.js
```

## Features Implementation

### Authentication
- Firebase email/password authentication
- Protected routes
- User session management

### Movie Browsing
- Trending movies display
- Movie cards with image, title, rating
- Click tracking for user interactions

### Movie Details
- Detailed movie information
- High-resolution images
- Ratings

Git hub repository: https://github.com/ris-jeewa/XUNI

