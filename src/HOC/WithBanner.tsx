import React from "react";
import Hero from "../components/Hero";

// ...existing code...
const withBanner = <P extends object = {}>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const Wrapped: React.FC<P> = (props) => (
    <>
      <Hero />
      <Component {...props} />
    </>
  );

  // Helpful for DevTools
  Wrapped.displayName = `withBanner(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default withBanner;
