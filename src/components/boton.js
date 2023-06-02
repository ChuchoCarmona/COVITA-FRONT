//Comportamiento de editar y eliminar aqui

export default function Boton(props) {
  const editar = (e) => {
    let id_u = props.id;
    console.log(id_u);
    let filasTabla = props.filasTabla;
    console.log(filasTabla);
    // filasTabla.forEach((fila) => {
    //   fila.addEventListener("click", () => {
    //     const id = fila.getAttribute("key");
    //     console.log("ID de la fila:", id);
    //     // Realiza otras acciones con el ID capturado
    //   });
    // });
  };

  return (
    <>
      <button onClick={editar}>{props.etiqueta}</button>
    </>
  );
}
