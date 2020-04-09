import React, { useState } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
const Sub_Chart2 = (props) => {
    const {
        Api_TH_Today
    } = props;
    const [activeIndex, setActiveIndex] = useState(0)
    const dataArray = [];
    const dataArray_Count = [];
    var DisplayToday = Object.keys(Api_TH_Today).map((data, index) => {
        if (index < 4) {
            dataArray.push(data)
            dataArray_Count.push(Api_TH_Today[data])
        }
    })
    const data =
        [
            { name: dataArray[0], value: dataArray_Count[0] },
            { name: dataArray[1], value: dataArray_Count[1] },
            { name: dataArray[2], value: dataArray_Count[2] },
            { name: dataArray[3], value: dataArray_Count[3] },
        ];
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
        let PC = (dataArray_Count[0] / 69040000) * 100;
        if (percent === 0.006331785563528915) {
            PC = (dataArray_Count[1] / 69040000) * 100;
        }
        else if (percent === 0.3062473617560152) {
            PC = (dataArray_Count[2] / 69040000) * 100;
        }
        else if (percent === 0.18742085268045588) {
            PC = (dataArray_Count[3] / 69040000) * 100;
        }
        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#5bc0de" fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="#5bc0de" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#5bc0de">{`Count ${value} OF ${69.04}M`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#5bc0de">
                    {`(Percent ${(PC).toFixed(5)}%)`}
                </text>
            </g>
        );
    };
    const onPieEnter = (dataArray, index) => {
        setActiveIndex(index)
    }
    return (
        <div>
            <PieChart className="grahp-2" width={600} height={600}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx={300}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#5bc0de"
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </div>
    )
}
export default Sub_Chart2;