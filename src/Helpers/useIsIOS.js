import React from "react";

// hooks/useIsIOS.ts
export function useIsIOS() {
  const [isIOS, setIsIOS] = React.useState(false);

  React.useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, []);

  return isIOS;
}
