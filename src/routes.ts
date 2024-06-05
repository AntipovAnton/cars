import { lazy } from "react";

import ListingPage from "./pages/ListingPage";
const About = lazy(() => import(/* webpackChunkName: "about" */ "./pages/AboutPage"));
const DetailsPage = lazy(() => import(/* webpackChunkName: "details-page" */ "./pages/DetailsPage"));
const NotFound = lazy(() => import(/* webpackChunkName: "404-page" */ "./pages/Page-404"));

export const appRoutes = [
    {
        path: "/",
        component: ListingPage,
    },
    {
        path: "/details/:carId",
        component: DetailsPage,
    },
    {
        path: "/about",
        component: About,
    },
    {
        path: "*",
        component: NotFound,
    },
];