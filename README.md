## Admin UI Geektrust Challenge

### Deployed [here](https://admin-ui-tawny.vercel.app/)


## About The Project

- This project is a Geektrust Frontend Challenge. Using instructions from [here](https://www.geektrust.com/coding/detailed/admin-ui)
- This is a small Admin side user management dashboard which draws user data from [this](https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json) API Endpoint.
- The website is mobile responsive as well.
- Checks window.innerWidth<600 and Shows only 3 pagination buttons instead of 5, Shows "Delete" button instead of "Delete Selected" and abbreviates user role to fit the narrow screens
- Implemented a few important integration tests with Jest

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Screenshots

Main Screen
![Home](https://res.cloudinary.com/dubirhea4/image/upload/v1681843477/Admin%20UI/home.jpg)

Mobile View (pixel 5)
![Home mobile](https://res.cloudinary.com/dubirhea4/image/upload/v1681843477/Admin%20UI/admin-ui-tawny.vercel.app__Pixel_5.jpg)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Tech used

- React 18 + TypeScript setup using Next js
- Axios - to fetch data from API
- Tailwind CSS - for styling the components
- React Toastify - for showing alerts on performing actions like Delete or Edit
- React Icons - to look good

## Achievements

PERFECT Badges and Score
![Score](https://res.cloudinary.com/dubirhea4/image/upload/v1682410736/Admin%20UI/score.png)
