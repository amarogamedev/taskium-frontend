import {CaretDoubleUp, CaretDown, CaretUp, Warning} from "phosphor-react";

export const getPriorityColor = (priority) => {
    switch (priority?.toUpperCase()) {
        case 'CRITICAL':
            return "#FF0C00";
        case 'HIGH':
            return "#FF5700";
        case 'MEDIUM':
            return "#FFD100";
        case 'LOW':
            return "#0000FF";
    }
};

export const getPriorityIcon = (priority) => {
    switch (priority?.toUpperCase()) {
        case 'CRITICAL':
            return <Warning weight="bold" size={16} color={getPriorityColor(priority)}/>;
        case 'HIGH':
            return <CaretDoubleUp weight="bold" size={16} color={getPriorityColor(priority)}/>;
        case 'MEDIUM':
            return <CaretUp weight="bold" size={16} color={getPriorityColor(priority)}/>;
        case 'LOW':
            return <CaretDown weight="bold" size={16} color={getPriorityColor(priority)}/>;
    }
};