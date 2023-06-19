import { useState, useEffect } from "react";
import '../css/modal.css';
import '../css/formulario.css';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ isOpen, onClose, onSubmit, form, setForm }) => {
    const [fullName, setFullName] = useState(form.fullName);
    const [career, setCareer] = useState(form.career);

    useEffect(() => {
        setFullName(form.fullName);
        setCareer(form.career);
    }, [form]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ fullName, career, active: true });
        setFullName("");
        setCareer("");
    };

    return (
        <div className={`modal ${isOpen ? "open" : ""}`}>
        {isOpen && (
            <div className={'fondoModal'}>
            <div className="contenedor-modal">
                <form className={'formulario'} onSubmit={handleSubmit}>
                <h2>{form.fullName ? "Editar Estudiante" : "Registrar Estudiante"}</h2>
                <input
                    type="text"
                    value={fullName}
                    className={'input-basico'}
                    placeholder="Nombre Completo"
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="text"
                    value={career}
                    className={'input-basico'}
                    placeholder="Carrera"
                    onChange={(e) => setCareer(e.target.value)}
                />
                <button type="submit" className={'input-registrar'}>
                    {form.fullName ? "Guardar Cambios" : "REGISTRAR ESTUDIANTE"}
                </button>
                </form>
                <button className="boton-cerrar" onClick={onClose}>
                <AiOutlineClose/>
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default Modal;
