import React from "react";

export default function Arrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.43881 24.3324C7.88825 17.7567 8.88025 11.9731 16.6149 8.08369C22.5479 5.10031 21.6583 4.83756 29.0123 4.88693"
        stroke="#2A2928"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M1.5408 17.2341C3.97436 20.5691 3.39877 20.4268 6.16308 23.5169C6.37572 23.7546 6.7095 24.385 7.05364 24.4217C9.50651 24.6834 11.9905 22.1452 13.7023 21.0517"
        stroke="#2A2928"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  );
}
