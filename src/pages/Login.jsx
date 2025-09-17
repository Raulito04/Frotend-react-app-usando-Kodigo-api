import { useForm } from "react-hook-form";
import { loginUser } from "../services/KodigoApi";
import { use, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const onSubmit = async(data) => {
    //console.log(data);
    setError("");
    try{
      const respuesta= await loginUser(data.username, data.password);
      //console.log("Login exitoso:", respuesta.token);
      navigate("/dashboard");
    }
    catch(error){
      console.log("Error de login:", error.message);
      setError("Nombre de usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Iniciar Sesión</h2>

        <label htmlFor="username">Nombre de usuario</label>
        <input
          type="text"
          id="username"
          placeholder="Nombre de usuario"
          {...register("username")}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="********"
          {...register("password")}
        />

        <button type="submit">Entrar</button>
         {error && <p className="error">{error}</p>}

        <p className="register-text">
          ¿No tienes cuenta?   <Link to="/register">Registrate</Link>
        </p>
      </form>
    </div>
  );
}
