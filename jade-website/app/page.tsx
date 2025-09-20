"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import LaunchScreen from "@/app/components/LaunchScreen";
import FadeIn from "@/app/components/FadeIn";
import Hero from "@/app/components/Hero";
import Client from "@/app/components/Client";
import Blogs from "@/app/components/Blogs";
import ImgChanger from "@/app/components/ImageChanger";
import Solution from "@/app/components/Solution";
import Footer from "@/app/components/Footer";
import Stripe from "@/app/components/Stripe";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  const [showLaunchScreen, setShowLaunchScreen] = useState(true);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts (on refresh)
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setShowLaunchScreen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // The empty dependency array ensures this effect runs only once after the initial render
  
  return (
    <>
      <Head>
        <title>JADE Money - Portfolio Intelligence. Delivered.</title>
        <meta
          name="description"
          content="Portfolio Intelligence platform designed for Banks, Brokers & Wealth Managers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showLaunchScreen ? (
        <LaunchScreen />
      ) : (
        <div>
          <Navbar />
          <FadeIn>
            <Hero />
          </FadeIn>
          <FadeIn>
            <Stripe />
          </FadeIn>
          <FadeIn>
            <Client />
          </FadeIn>
          <FadeIn>
            <Blogs />
          </FadeIn>
          <FadeIn>
            <ImgChanger />
          </FadeIn>
          <FadeIn>
            <Solution />
          </FadeIn>
          <FadeIn>
            <Footer />
          </FadeIn>
        </div>
      )}
    </>
  );
}
