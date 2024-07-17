import { CustomLabelListProps } from "../types";
import { getElapsedTimeString, getTextWidth } from "../helpers";


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