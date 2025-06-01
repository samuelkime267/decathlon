import localFont from "next/font/local";

const decathlonBrand = localFont({
  src: "../assets/fonts/Decathlon-Brand-Medium.woff2",
  variable: "--font-decathlon-brand",
  weight: "500",
});

const decathlonDisplay = localFont({
  src: [
    {
      path: "../assets/fonts/Decathlon-Display-Medium.woff2",
      weight: "500",
    },
    {
      path: "../assets/fonts/Decathlon-Display-Regular.woff2",
      weight: "400",
    },
  ],
  variable: "--font-decathlon-display",
});

const decathlonText = localFont({
  src: "../assets/fonts/Decathlon-Text-Regular.woff2",
  variable: "--font-decathlon-text",
  weight: "400",
});
const caseyRegular = localFont({
  src: "../assets/fonts/Casey-Regular.woff",
  variable: "--font-casey",
  weight: "400",
});

export const fonts = `${decathlonBrand.variable} ${decathlonDisplay.variable} ${decathlonText.variable} ${caseyRegular.variable}`;
