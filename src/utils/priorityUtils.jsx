import {CaretDoubleUp, CaretDown, CaretUp, Warning} from "phosphor-react";

export const getPriorityColor = (priority) => {
    switch (priority?.toUpperCase()) {
        case 'CRITICAL':
        case 'HIGH':
            return "#FF5700";
        case 'MEDIUM':
            return "#0000FF"
        case 'LOW':
            return "#29B000";
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