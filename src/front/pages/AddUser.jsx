import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AddUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    
    const navigate = useNavigate();

    // Función principal para crear el usuario
    const handleCreateUser = async () => {
        // Limpiar los errores anteriores
        setErrorMessages([]);
        const errors = [];

        // Validación de los campos
        if (!email.trim()) errors.push("Correo Electrónico");
        if (!password.trim()) errors.push("Contraseña");
        if (!confirmPassword.trim()) errors.push("Confirmar Contraseña");
        if (password && confirmPassword && password !== confirmPassword) {
            errors.push("Las contraseñas no coinciden");
        }

        // Si hay errores, mostrar el mensaje y salir
        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }

        // Crear el objeto de datos que se enviará al servidor
        const data = { 
            email: email,
            password: password,
        };

        try {
            // Hacer la solicitud POST para registrar el usuario
            const res = await fetch("https://curly-space-bassoon-qg4xv49rp5gcqjr-3001.app.github.dev/api/registro", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }                    
            });

            // Si la respuesta es exitosa, redirigir al login
            if (res.ok) {
                alert("Registro Exitoso");
                console.log("Usuario agregado correctamente");
                navigate("/login"); // Redirige después de un registro exitoso
            } else {
                // Si hay un error, mostrar el mensaje
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al registrar usuario");
            }
        } catch (error) {
            console.warn(error);
            setErrorMessages([error.message]); // Mostrar mensaje de error si ocurre algún fallo
        }

        // Limpiar los campos solo después de un registro exitoso
        setEmail("");        
        setPassword("");
        setConfirmPassword("");        
    };

    return (
        <div className="d-flex justify-content-center align-items-center py-3">
            <div className="form-container bg-secundary shadow p-4 formRegistro" style={{ width: "400px" }}>
                <h1 className="text-center mb-4 tituloJoin">Registro de Usuario</h1>
                {errorMessages.length > 0 && (
                    <div className="alert alert-danger">
                        <h5>Por favor completa los siguientes campos:</h5>
                        <ul>
                            {errorMessages.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mb-3">
                    <label>Correo Electrónico</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa tu correo electrónico"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Ingresa tu contraseña"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="mb-3">
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirma tu Contraseña"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center">                    
                    <button className="btn btn-primary btnRegistrar text-dark" onClick={handleCreateUser}>
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    );
};