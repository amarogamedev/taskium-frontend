import {CaretDoubleUp, CaretDown, CaretUp, Warning} from "phosphor-react";

export const getPriorityColor = (priority) => {
    switch (priority?.toUpperCase()) {
        case 'CRITICAL':
            return "#FF0C00";
        case 'HIGH':
            return "#FF5700";
        case 'MEDIUM':
            return "#FFC401";
        case 'LOW':
            return "#0000FF";
    }
};

export const getPriorityIcon = (priority) => {
    switch (priority?.toUpperCase()) {
        case 'CRITICAL':
            return <Warning size={20} color={getPriorityColor(priority)}/>;
        case 'HIGH':
            return <CaretDoubleUp size={20} color={getPriorityColor(priority)}/>;
        case 'MEDIUM':
            return <CaretUp size={20} color={getPriorityColor(priority)}/>;
        case 'LOW':
            return <CaretDown size={20} color={getPriorityColor(priority)}/>;
    }
};