import {CalendarCheck, Checks, HourglassLow, ListBullets, PersonSimpleRun, Clipboard} from "phosphor-react";

export const getStatusIcon = (status) => {
    switch (status) {
        case 'TO_DO': return <Clipboard size={20}/>
        case 'IN_PROGRESS': return <PersonSimpleRun size={20}/>
        case 'WAITING': return <HourglassLow size={20}/>
        case 'REVIEW': return <Checks size={20}/>
        case 'DONE': return <CalendarCheck size={20}/>
        default: return <ListBullets size={20}/>
    }
}