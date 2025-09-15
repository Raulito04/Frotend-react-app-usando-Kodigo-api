import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "El usuario debe tener mas 4 caracteres")
    .required("Usuario requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener mas 6 caracteres")
    .required("Contraseña requerida"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        reset();
      } else {
        alert(result.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4 text-light">Registrate en KODIGO</h2>
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center mb-4 text-light">
                  Registro de Usuario
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="mb-3">
                    <label
                      className="form-label text-info

"
                    >
                      Usuario:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("username")}
                    />
                    {errors.username && (
                      <div className="text-danger">
                        {errors.username.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label text-info

"
                    >
                      Contraseña:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      {...register("password")}
                    />
                    {errors.password && (
                      <div className="text-danger">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registrando..." : "Registrar"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
