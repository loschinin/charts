import { useCallback, useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState(0);

  const updateChartWidth = useCallback(() => {
    const clientWidth = document.documentElement.clientWidth;
    setWidth(clientWidth);
  }, []);

  useEffect(() => {
    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);
    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  }, [updateChartWidth]);

  return width;
};
