import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { FeedData } from "../../../common/types";
import { renderLabel } from "../../../common/utils/ui";


interface Props {
    data: FeedData[],
    xDataKey: keyof FeedData,
    yDataKey: keyof FeedData,
    title: string,
    units: string,
    color: string,
    timeBased: boolean,
}


const EatStatistic = ({ data, xDataKey, yDataKey, title, units, color, timeBased }: Props) => {
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
                            content={props => renderLabel(props, units, timeBased)}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


export default EatStatistic;