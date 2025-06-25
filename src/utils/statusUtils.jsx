import {CalendarCheck, Checks, HourglassLow, ListBullets, PersonSimpleRun, Clipboard} from "phosphor-react";

export const getStatusIcon = (status) => {
    switch (status) {
        case 'TO_DO': return <Clipboard size={32}/>
        case 'IN_PROGRESS': return <PersonSimpleRun size={32}/>
        case 'WAITING': return <HourglassLow size={32}/>
        case 'REVIEW': return <Checks size={32}/>
        case 'DONE': return <CalendarCheck size={32}/>
        default: return <ListBullets size={32}/>
    }
}