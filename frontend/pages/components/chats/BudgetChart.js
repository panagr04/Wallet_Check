import dynamic from 'next/dynamic';

import React from 'react';

const DualAxes = dynamic(
    () => import("@ant-design/charts").then((mod) => mod.DualAxes),
    { ssr: false }
  )

const DemoDualAxes = ({budgetRecords,expenseRecords}) => {

    if(!budgetRecords.length )
        return <h1 className="mb-5 text-3xl font-bold">⚠ Oops!<br/> You have not set budget for this month.</h1>

    let data = [
        {
            type:"Food",
            budget:budgetRecords[0].value,
            expenses:expenseRecords[0].value
            
        },
        {
            type:"Entertainment",
            budget:budgetRecords[1].value,
            expenses:expenseRecords[1].value
            
        },
        {
            type:"Clothing",
            budget:budgetRecords[2].value,
            expenses:expenseRecords[2].value
            
        },
        {
            type:"Transportation",
            budget:budgetRecords[3].value,
            expenses:expenseRecords[3].value
            
        },
        {
            type:"Medical",
            budget:budgetRecords[4].value,
            expenses:expenseRecords[4].value
            
        },
        {
            type:"Other",
            budget:budgetRecords[5].value,
            expenses:expenseRecords[5].value
            
        },
    ]
    var config = {
        data: [data,data],
        xField: 'type',
        yField: ['expenses','budget'],
        meta: {
            expenses: { sync: 'budget' },
            budget: { sync: true },
          },
          yAxis: {
            budget: false
          },
        geometryOptions: [
            { geometry: 'column' },
            {
                geometry: 'line',
                lineStyle: { lineWidth: 2 },
                point: {},
            },
        ],
    };
    return <DualAxes {...config}/>;
};
export default DemoDualAxes;