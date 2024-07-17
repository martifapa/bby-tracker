import { CustomLabelListProps } from "../types";
import { getElapsedTimeString } from "./time";


export const renderLabel = (props: CustomLabelListProps, units: string, timeBased: boolean=false) => {
    const { x, y, value, width, height, index } = props;
    const text = timeBased
        ? `${getElapsedTimeString(value)} ${units}`
        : `${value} ${units}`;
    const textWidth = getTextWidth(text);

    const span = Math.ceil(textWidth / width);
    if (index % span === 0) {
        return (
            <text
                x={x + width / 2 + 7}
                y={y + height}
                dy={4}
                textAnchor="center"
                fontSize={12}
                transform={`rotate(270, ${x + width / 2}, ${y + height})`}
            >
                {text}
            </text>);
    }
}

export const getTextWidth = (text: string): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        context.font = getComputedStyle(document.body).font;   
        return context.measureText(text).width;
    }
    return 0;
}