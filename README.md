# Fitlogs

Fitlogs is an open source browser only application aimed to mobile users to be used in your lifting sessions and outside to save your numbers, track your progression and share it easely.

## Technical Aspect of the Application

Fitlogs is a PWA (Progresive Web App) so it can be installed from a chromium based browser (chrome, edge, etc...) directly on your machine. The application work 100% offline.

Fitlogs use Svelte as its javascript framework. The main reason was because I wanted to learn Svelte and using it for a small project was the way to go. And I like it a lot (speaking from an Angular professionnal).

## What to do after git cloning this repo ?

First make sure you are on the latest version of npm and nodejs.

Install all the depencies first running this command in the root of the project :
```bash
npm install
```

To run the app :
```bash
npm run dev 
```

### Deving

Make sure you test the application of a chromium based browser. This being a PWA, I don't care about supporting other browsers that cannot install the app.


## Possible problems when trying to run

### Failed to load url /src/main.ts (resolved id: C:/Data/DVLT/fitlogs/src/main.ts). Does the file exist?

**MAKE SURE** that you are not in a virtual driver ! I had this problem because I tried to run while being in : ```D:/DVLT/fitlogs```

Instead of : ```C:/Data/DVLT/fitlogs```

It may happen only on Windows, who knows