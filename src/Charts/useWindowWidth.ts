import {useCallback, useEffect, useState} from "react";

const OFFSET = 350;
const BREAK_POINT = 700;

export const useWindowWidth = () => {
    const [width, setWidth] = useState(0);
    const updateChartWidth = useCallback(() => {
        const clientWidth = document.documentElement.clientWidth;
        setWidth(
            clientWidth < BREAK_POINT ? clientWidth : clientWidth - OFFSET
        );
    }, []);

    useEffect(() => {
        updateChartWidth();
        window.addEventListener('resize', updateChartWidth);
        return () => {
            window.removeEventListener('resize', updateChartWidth);
        };
    }, [updateChartWidth]);

    return width
}