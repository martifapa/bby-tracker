import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { SleepData } from "../../../common/types";
import { renderLabel } from "../../../common/helpers/ui";


interface Props {
    data: SleepData[],
    xDataKey: keyof SleepData,
    yDataKey: keyof SleepData,
    title: string,
    units: string,
    color: string,
}


const SleepStatistic = ({ data, xDataKey, yDataKey, title, units, color }: Props) => {
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
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


export default SleepStatistic;