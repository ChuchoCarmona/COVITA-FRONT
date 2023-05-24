import { useForm } from "react-hook-form";
import { crearPaciente } from "../api/pacientesApi";

export default function PacienteForm() {
  const { handleSubmit, register } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    //const res = await crearPaciente(data);
    console.log(data);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Numero de Seguro Social"
          {...register("NSS")}
        />
        <input type="text" placeholder="Nombres" {...register("nombres")} />
        <input
          type="text"
          placeholder="Apellido Paterno"
          {...register("apellido_p")}
        />
        <input
          type="text"
          placeholder="Apellido Materno"
          {...register("apellido_m")}
        />
        <input type="number" placeholder="Edad" {...register("edad")} />
        <input type="text" placeholder="Sexo" {...register("sexo")} />
        <input type="text" placeholder="Altura" {...register("altura")} />
        <input type="text" placeholder="Peso" {...register("peso")} />
        <input
          type="text"
          placeholder="Padecimientos"
          {...register("enfermedades")}
        />
        <input
          type="text"
          placeholder="Tipo de Sangre"
          {...register("tipo_sangre")}
        />
        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          {...register("fecha_nacimiento")}
        />
        <input type="number" placeholder="Telefono" {...register("telefono")} />
        <input
          type="text"
          placeholder="Correo electronico"
          {...register("correo_e")}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
