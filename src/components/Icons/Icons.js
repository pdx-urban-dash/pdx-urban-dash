import React from 'react';
import "./Icons.css";
import * as Icons from 'react-feather';

export default function Icon (props) {
    const size = {
        sm:15,
        md:25,
        lg:50,
    };

    const iconList = {
        'target': <Icons.Target size={size[props.size]} />,
        'off-target': <Icons.Target size={size[props.size]} color="red" />,
        'on-target': <Icons.Target size={size[props.size]} color="green" />,
        'trending-up': <Icons.TrendingUp size={size[props.size]} />,
        'trending-down': <Icons.TrendingDown size={size[props.size]} />,
        'maximize': <Icons.Maximize size={size[props.size]} />,
        'minimize': <Icons.Minimize size={size[props.size]} />,
        'github': <Icons.GitHub size={size[props.size]} />,
    };

    return <div>{iconList[props.type]}</div>;
}

