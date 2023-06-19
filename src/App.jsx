import { useState, useEffect, Fragment } from "react";
import Modal from "./componentes/Modal";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingForm, setEditingForm] = useState({ fullName: "", career: "", active: true });
  const [formList, setFormList] = useState(() => {
    const savedForms = localStorage.getItem("forms");
    return savedForms ? JSON.parse(savedForms) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFormList, setFilteredFormList] = useState([]);

  useEffect(() => {
    localStorage.setItem("forms", JSON.stringify(formList));
    const filteredList = formList.filter(
      (form) =>
        form.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.career.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFormList(filteredList);
  }, [formList, searchTerm]);

  const openModal = (index = -1) => {
    if (index >= 0) {
      setEditingIndex(index);
      setEditingForm(formList[index]);
    } else {
      setEditingIndex(-1);
      setEditingForm({ fullName: "", career: "", active: true });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (formData) => {
    if (editingIndex >= 0) {
      const updatedForms = [...formList];
      updatedForms[editingIndex] = formData;
      setFormList(updatedForms);
    } else {
      setFormList([...formList, formData]);
    }
    closeModal();
  };

  const handleDelete = (index) => {
    const updatedForms = [...formList];
    updatedForms.splice(index, 1);
    setFormList(updatedForms);
  };

  const toggleStatus = (index) => {
    const updatedForms = [...formList];
    updatedForms[index].active = !updatedForms[index].active;
    setFormList(updatedForms);
  };

  const totalPeople = formList.length;
  const activePeople = formList.filter((form) => form.active).length;

  return (
    <Fragment>
      <div className={"head"}>
        <h1 className={'titulo'}>HAY {activePeople}  ESTUDIANTES ACTIVOS DE {totalPeople} REGISTRADOS</h1>
      </div>
      <button className={"boton-abrir"} onClick={openModal}>+</button>
      <div className={"buscador"}>
        <input
          className={"barra"}
          type="text"
          placeholder='Buscar Estudiante'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <table className={"tabla"}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredFormList.map((form, index) => (
              <tr key={index}>
                <td>{form.fullName}</td>
                <td>{form.career}</td>
                <td>
                  <button onClick={() => toggleStatus(index)}>
                    {form.active ? "Activo" : "Inactivo"}
                  </button>
                </td>
                <td>
                  <button className={"configuracion"} onClick={() => openModal(index)}>Editar</button>
                  <button className={"configuracion"} onClick={() => handleDelete(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} onSubmit={handleSubmit} form={editingForm} setForm={setEditingForm} />
    </Fragment>
  );
};

export default App;
