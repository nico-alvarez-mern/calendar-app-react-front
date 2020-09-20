import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import moment from 'moment';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventsClearActiveEvent, eventStartUpdate, startAddNew } from '../../actions/events';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');
const endDate = moment(now).add(1,'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endDate.toDate()
}

export const CalendarModal = () => {
    const {modalOpen} = useSelector( state => state.ui );
    const {activeEvent} = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [titleValid, setTitleValid] = useState(true);
    const [formvalues, setFormvalues] = useState(initEvent);
    const { title,notes,start,end } = formvalues;

    useEffect(() => {
        if(activeEvent){
            setFormvalues( activeEvent );
        }else{
            setFormvalues( initEvent );
        }

    }, [activeEvent,setFormvalues])


    const handleInputChange = ({target})=>{
        setFormvalues({
            ...formvalues,
            [target.name]: target.value
        });
    }
    const closeModal = ()=>{
        dispatch( uiCloseModal() );
        dispatch( eventsClearActiveEvent() );
        setFormvalues(initEvent);
    }
    const handleStartDateChange = (e)=>{
        setDateStart( e );
        setFormvalues({
            ...formvalues,
            start: e
        });
    }
    const handleEndDateChange = (e)=>{
        setDateEnd( e );
        setFormvalues({
            ...formvalues,
           end: e
        });
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);
        if( momentStart.isSameOrAfter( momentEnd ) ){
            return Swal.fire('Error','La fecha fin debe ser mayor a la fecha de inicio','error');
        }
        if(title.trim().length < 2){
            setTitleValid(false);
            return;
        }
        if( activeEvent ){
            dispatch( eventStartUpdate(formvalues) );
        }else{
            dispatch( startAddNew(formvalues) );

        }
        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
          isOpen={ modalOpen }
          /* onAfterOpen={afterOpenModal} */
          onRequestClose={closeModal} 
          style={customStyles}
          closeTimeoutMS={200}
          className="modal"
          overlayClassName="modal-fondo"
        >
            <h1>{ (activeEvent) ? "Editar Evento" : "Nuevo Evento" }</h1>
            <hr />
            <form   className="container"
                    onSubmit={handleOnSubmit}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                        
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        className="form-control"
                        minDate={dateStart}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !titleValid && 'is-invalid' }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
