import { useCallback, useEffect, useState } from 'react';

type Props = {
  offset: number;
  breakPoint: number;
};

export const useWindowWidth = ({ offset, breakPoint }: Props) => {
  const [width, setWidth] = useState(0);
  const updateChartWidth = useCallback(() => {
    const clientWidth = document.documentElement.clientWidth;
    setWidth(
      clientWidth < breakPoint ? clientWidth : clientWidth - offset
    );
  }, [offset, breakPoint]);

  useEffect(() => {
    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);
    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  }, [updateChartWidth]);

  return width;
};
