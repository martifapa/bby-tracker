import { CustomLabelListProps } from "../types";
import { getElapsedTimeString } from "./time";


export const renderLabel = (props: CustomLabelListProps, units: string, timeBased: boolean=false) => {
    const { x, y, value, width, height, index } = props;
    const xCoord = x as number;
    const yCoord = y as number;
    const labelValue = value as number;
    const labelWidth = width as number;
    const labelHeight = height as number;
    const labelIndex = index as number;

    if (xCoord === undefined || yCoord === undefined || labelValue === undefined || labelWidth === undefined || labelHeight === undefined || labelIndex === undefined) {
        return null;
    }

    const text = timeBased
        ? `${getElapsedTimeString(labelValue)} ${units}`
        : `${value} ${units}`;
    const textWidth = getTextWidth(text);

    const span = Math.ceil(textWidth / labelWidth);
    if (labelIndex % span === 0) {
        return (
            <text
                x={xCoord + labelWidth / 2 + 7}
                y={yCoord + labelHeight}
                dy={4}
                textAnchor="center"
                fontSize={12}
                transform={`rotate(270, ${xCoord + labelWidth / 2}, ${yCoord + labelHeight})`}
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