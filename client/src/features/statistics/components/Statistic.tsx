import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { CustomLabelListProps, SleepData } from "../../../common/types";
import { useEffect, useState } from "react";
import { getTextWidth } from "../../../common/helpers";


interface Props {
    data: SleepData[],
    xDataKey: keyof SleepData,
    yDataKey: keyof SleepData,
    title: string,
    units: string,
    color: string,
}


const renderLabel = (props: CustomLabelListProps, units: string) => {
    const { x, y, value, width, height, index } = props;
    const text = `${value} ${units}`;
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


const Statistic = ({ data, xDataKey, yDataKey, title, units, color }: Props) => {
    return (
        <div className="statistic container">
            <h2 className="statistic-title">{title}</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis
                        dataKey={xDataKey}
                        axisLine={false}
                        tickFormatter={(tick) => tick.slice(5)}
                    />
                    <Tooltip />
                    <Bar dataKey={yDataKey} fill={color} >
                        <LabelList
                            dataKey={yDataKey}
                            position="top"
                            content={props => renderLabel(props, units)}
                            // formatter={(label: string) => {
                            //     let newLabel = '';
                            //     if (Number(label) === highest.number && !highest.used) {
                            //         setHighest({...highest, used: true});
                            //         newLabel += label + ' ' + units;
                            //     }
                            //     if (Number(label) === lowest.number && !lowest.used) {
                            //         setLowest({...lowest, used: true});
                            //         newLabel += label + ' ' + units
                            //     }
                            //     return newLabel;
                            // }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


export default Statistic;