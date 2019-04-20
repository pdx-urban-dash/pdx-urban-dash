"""
    Dummy Data Generator
    
    Creates a json file containing an array of objects containing mock data.

    To Do:
    -Understand how each chart type should be populated.
    -Create method for populating each object.

"""

import json

chart_types = ["BAR", "LINE", "DONUT", "TREE"]
trends = ["UP", "DOWN", "STABLE"]
colors = ["RED", "GREEN", "BLUE"]

# Create chart examples here: (metadata, title, desc, type, categories[], target, trend, axis_labels[], datasets{})
# for datasets: (metadata, title, desc, color, show_trendline(bool), data_values[[]]) 
chart_list = [
    ("","dummy bar graph","", 1, ["cat1", "cat2"], 100, 0, ["x","y"], 
    [
        ("", "bar1", "first datapoint", 0, True, [[100],[200]]),
        ("", "bar2", "second datapoint", 0, False, [[100],[100, 100],[100]])
    ])
]

# Loop through chart examples and create dictionaries of each one.

data_objects = []

for chart in range(len(chart_list)):
    chart_obj = {}
    chart_obj["metadata"] = chart_list[chart][0]
    chart_obj["title"] = chart_list[chart][1]
    chart_obj["description"] = chart_list[chart][2]
    chart_obj["chart_type"] = chart_types[chart_list[chart][3]]
    chart_obj["categories"] = chart_list[chart][4]
    chart_obj["target"] = chart_list[chart][5]
    chart_obj["target_trend"] = trends[chart_list[chart][6]]
    chart_obj["axis_labels"] = chart_list[chart][7]
    chart_obj["data_sets"] = []
    for data_obj in range(len(chart_list[chart][8])):
        data_point = {}
        data_point["metadata"] = chart_list[chart][8][data_obj][0]
        data_point["title"] = chart_list[chart][8][data_obj][1]
        data_point["description"] = chart_list[chart][8][data_obj][2]
        data_point["color"] = colors[chart_list[chart][8][data_obj][3]]
        data_point["show_trendline"] = chart_list[chart][8][data_obj][4]
        data_point["data_values"] = chart_list[chart][8][data_obj][5]
        chart_obj["data_sets"].append(data_point)

    data_objects.append(chart_obj)

# Create list of JSON objects.

with open('dummy_data.json', 'w') as outfile:
    json.dump(data_objects, outfile, indent=4)