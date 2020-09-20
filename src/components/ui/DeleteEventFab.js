import React from 'react'
import {useDispatch} from 'react-redux'
import { eventDelete, eventsClearActiveEvent, eventStartDelete } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();
    const handleClick = ()=>{
        dispatch( eventStartDelete() );
    }
    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleClick}
        >
            <i className="fas fa-trash"></i>
            <span>Borrar evento</span>
        </button>
    )
}
