"""
    Dummy Data Generator
    
    Creates a json file containing an array of objects containing mock data.

"""

import json
import random

def normalize_list(list_x):
    my_sum = sum(list_x)
    for i in range(len(list_x)):
        list_x[i] = (list_x[i]/ my_sum) * 100
    return list_x

chart_types = ["BAR", "LINE", "DONUT"]
categories = ["category " + str(x) for x in range(1,8)]
trends = ["UP", "DOWN", "STABLE"]
colors = ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "INDIGO", "VIOLET" ]

chart_list = [
    ("donut1", "Dummmy donut chart 1: 5 even slices", 2, random.sample(categories, 3), 100.0, "STABLE", ["solo donut"],
    [
        (False, [random.sample(colors, 5),["label " + str(x) for x in range(1, 6)],[20.0 for x in range(1,6)]])
    ]
    ),
    ("donut2", "Dummmy donut chart 2: 5 uneven slices", 2, random.sample(categories, 3), 100.0, "STABLE", ["solo donut"],
    [
        (False, [random.sample(colors, 5),["label " + str(x) for x in range(1, 6)], normalize_list([random.randint(1,100) for x in range(1,6)])])
    ]
    ),
    ("donut3", "Dummmy donut chart 3: 2 charts with 3 uneven slices", 2, random.sample(categories, 3), 100.0, "STABLE", ["donut 1", "donut 2"],
    [
        (False, [random.sample(colors, 3), ["label " + str(x) for x in range(1, 4)], normalize_list([random.randint(1,100) for x in range(1,4)])]),
        (False, [random.sample(colors, 3), ["label " + str(x) for x in range(1, 4)], normalize_list([random.randint(1,100) for x in range(1,4)])])
    ]
    ),
    ("line1", "Dummy line chart 1: random coordinates with STABLE trend.", 1, random.sample(categories, len(categories)), 30.0, "STABLE", [["x-values", "y_values"]],
    [
        (True, [[x for x in range(20)], [y + random.randint(-y, y) for y in range(20)]])
    ]
    ),
    ("line2", "Dummy line chart 2: ascending coordinates with UP trend.", 1, random.sample(categories, len(categories)), 30.0, "UP", [["x-values", "y_values"]],
    [
        (True, [[x for x in range(20)], [(y * 2) + random.randint(-3, 3) for y in range(20)]])
    ]
    ),
    ("line3", "Dummy line chart 3: ascending coordinates with DOWN trend.", 1, random.sample(categories, len(categories)), 5.0, "DOWN", [["x-values", "y_values"]],
    [
        (True, [[x for x in range(20)], [(y * 2) + random.randint(-3, 3) for y in range(20)]])
    ]
    ),
    ("bar1", "Dummy bar chart 1: 7 bars of random positive size.", 0, random.sample(categories, len(categories)), 30.0, "STABLE", [["bar_labels", "bar values"]],
    [
        (True, [["bar " + str(x) for x in range(1,9)], [random.randint(5, 100) for y in range(8)]])
    ]
    ),
    ("bar2", "Dummy bar chart 2: 7 bars of ascending positive size.", 0, random.sample(categories, len(categories)), 30.0, "UP", [["bar_labels", "bar values"]],
    [
        (True, [["bar " + str(x) for x in range(1,9)], [(y * 2) + random.randint(-3, 3) for y in range(8)]])
    ]
    ),
    ("bar3", "Dummy bar chart 3: 7 bars of descending size from positive to negative.", 0, random.sample(categories, len(categories)), 30.0, "DOWN", [["bar_labels", "bar values"]],
    [
        (True, [["bar " + str(x) for x in range(1,9)], [6 - (y * 2) for y in range(8)]])
    ]
    ),
]

data_objects = []

for chart in range(len(chart_list)):
    chart_obj = {}
    chart_obj["metadata"] = "Metadata placeholder"
    chart_obj["title"] = chart_list[chart][0]
    chart_obj["description"] = chart_list[chart][1]
    chart_obj["chart_type"] = chart_types[chart_list[chart][2]]
    chart_obj["categories"] = chart_list[chart][3]
    chart_obj["target"] = chart_list[chart][4]
    chart_obj["target_trend"] = chart_list[chart][5]
    chart_obj["axis_labels"] = chart_list[chart][6]
    chart_obj["data_sets"] = []
    for data_obj in range(len(chart_list[chart][7])):
        data_point = {}
        data_point["metadata"] = "Metadata placeholder."
        data_point["title"] = chart_obj["title"] + " dataset member " + str(data_obj + 1) + ". Axis label(s): " + str(chart_obj["axis_labels"][data_obj])
        data_point["description"] = "Contains " + chart_obj["title"] + " data for type " + chart_obj["chart_type"] + " chart."
        data_point["color"] = random.choice(colors)
        data_point["show_trendline"] = chart_list[chart][7][data_obj][0]
        data_point["data_values"] = chart_list[chart][7][data_obj][1]
        chart_obj["data_sets"].append(data_point)

    data_objects.append(chart_obj)

# Create list of JSON objects.

with open('dummy_data.json', 'w') as outfile:
    json.dump(data_objects, outfile, indent=4)