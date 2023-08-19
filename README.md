  
# Orbital Edge Imaging - Web-App

## Purpose

This is a proof-of-concept web application for a (fictional) startup called "Orbital Edge Imaging" that enables users to search the company's API using a specified Area of Interest.

## Getting Started

This project uses the [OGC API of Sentinel Hub](https://www.sentinel-hub.com/develop/api/ogc/) to search and download satellite imagery. You're required to sign up for an account to use this project, a free trial account receives 30 000 units.

## Installation

First, clone the repo, then install the dependencies:

```bash

npm install

```

Create a file called '.env.local' in the main project folder (not in src), copy and paste this content, finally add in your own Sentinel Instance ID.

```env

SENTINEL_INSTANCE_ID='YOUR_SENTINEL_INSTANCE_ID'

```

Then, run the development server:

```bash

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

## Libraries and Frameworks

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Mantine](https://mantine.dev/)
- [Leaflet](https://leafletjs.com/)
  - [React-Leaflet](https://react-leaflet.js.org/)
  - [React-Leaflet-Draw](https://www.npmjs.com/package/react-leaflet-draw)
- [Turf.js](https://turfjs.org/)
