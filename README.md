This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Access the production build:

You can access the final deployed version of this app [here](https://pawfect-match-zeta.vercel.app/)

 Alternatively you can follow the steps to get the app running locally:

## Prerequisites:
Make sure you have Node installed on the computer or VM that you'll be using to run the application. 
We recommend using version 20.17.0 or later in order to ensure the application works properly.

To check your current version simply run this command in the terminal:

```bash
node -v
```

## Getting Started

Firstly, once you are in the correct directory of the application, run the following command in the terminal:
```bash
npm install
```

This will install all the node packages and dependencies need to run the application.

Then in the root of the application create a file called ".env.local" as so:

![img](<public/images/Screenshot 2024-11-20 144316.png>)



Paste the following lines of code in this new file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://bxhgcdlewjbpmuboftdf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4aGdjZGxld2picG11Ym9mdGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0Mjg1MTgsImV4cCI6MjA0MzAwNDUxOH0.Nd7qBTZ4o57QzGwGCyIO7KVhGaGNJI9U2B2wPJP0aug
```

This will allow the application to correctly connect to the database


## Running the application locally

You can then run the application locally. Use the following command in the terminal:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
