import {BookBookmark, BugBeetle, Intersect} from "phosphor-react";

export const getTypeColor = (type) => {
    switch (type?.toUpperCase()) {
        case 'STORY':
        case 'TASK':
            return "#0000FF";
        case 'BUG':
            return "#FF5700";
    }
};

export const getTypeIcon = (type) => {
    switch (type?.toUpperCase()) {
        case 'STORY':
            return <BookBookmark size={20} color={getTypeColor(type)}/>;
        case 'TASK':
            return <Intersect size={20} color={getTypeColor(type)}/>;
        case 'BUG':
            return <BugBeetle size={20} color={getTypeColor(type)}/>;
    }
};