import { colors } from '../constants';
import '../components/viz/LineChart';
import React from 'react';

export const GenChart = (chartJson, colorScheme) => {
    if(chartJson === undefined){
        return null;
    }
    if(chartJson["chart_type"] === "LINE"){
        var data = []
        chartJson["data_sets"].forEach(chart_data => {
            var values = chart_data["data_values"][0].map(function(e, i) {
                  return [e, chart_data["data_values"][1][i]];
            });
            data.push({
                dataSetName: chart_data["title"],
                lineColor: chart_data["color"],
                description: chart_data["description"],
                showTrendLine: chart_data["show_trendLine"],
                values: values,
            });
        });
        const f_input = { title: chartJson["title"], colorScheme: colorScheme, data: data };
        return <LineChart {...f_input}/>;
    }
}
