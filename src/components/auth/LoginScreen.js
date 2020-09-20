import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './login.css';
import {useForm} from '../../hooks/useForm';
import validator from 'validator'
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {
    
    const [isFormValid, setIsFormValid] = useState({
        vEmail: false,
        vPassword: false
    });
    const dispatch = useDispatch();
    const { vEmail, vPassword} = isFormValid;

    const [formLoginValues,handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: '',
    });
    const [formRegisterValues,handleRegisterInputChange] = useForm({
        rName: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: '',
    });
    const {rName, rEmail,rPassword1,rPassword2} = formRegisterValues;

    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = (e)=>{
        e.preventDefault();
        if( !validator.isEmail(lEmail)){
            setIsFormValid({...isFormValid, vEmail: true});
            return;
        }else if(lPassword.trim().length < 6){
            setIsFormValid({...isFormValid, vPassword: true});
            return;
        }
        setIsFormValid({
            vEmail: false,
            vPassword: false
        });
        dispatch( startLogin(lEmail,lPassword) );
    }
    const handleRegister = (e)=>{
        e.preventDefault();
        if(rPassword1 !== rPassword2){
            return Swal.fire('Error','Las contraseñas deben ser iguales','error');
        }else if( !validator.isEmail(rEmail)){
            return Swal.fire('Error','Email no valido','error');
        }else if(rPassword1.trim().length < 6){
            return Swal.fire('Error','La contraseña debe tener 6 caracteres o mas','error');
        }
        dispatch( startRegister(rName,rEmail,rPassword1));

    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className={`form-control ${ vEmail && 'is-invalid' }`}
                                placeholder="Correo"
                                autoComplete="off"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={`form-control ${ vPassword && 'is-invalid' }`}
                                placeholder="Contraseña"
                                autoComplete="off"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                                autoComplete="off"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                autoComplete="off"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                autoComplete="off"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                autoComplete="off"
                                name="rPassword1"
                                value={rPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                autoComplete="off"
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                autoComplete="off"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}