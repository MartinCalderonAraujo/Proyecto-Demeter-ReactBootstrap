import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from "react-router-dom";
import Registro from '../pages/Registro'
import { describe, expect, test } from "vitest";

describe("Testing Registro", () => {

    test("Permite escribir en los inputs y enviar el formulario para registrarse", async () => {
        render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
        );

        const usuario = userEvent.setup();

        const nombreInput = screen.getByPlaceholderText(/^Nombre$/i);
        const emailInput = screen.getByPlaceholderText(/^Correo$/i);
        const passwordInput = screen.getByPlaceholderText(/^Contraseña$/i);
        const confirmarPasswordInput = screen.getByPlaceholderText(/^Confirmar contraseña$/i);
        const boton = screen.getByRole("button", { name: /^Registrarse$/i });

        await usuario.type(nombreInput, "Pepito");
        await usuario.type(emailInput, "pepito@gmail.com");
        await usuario.type(passwordInput, "pepe1234");
        await usuario.type(confirmarPasswordInput, "pepe1234");
        await usuario.click(boton);

        expect(emailInput.value).toBe("pepito@gmail.com");
        expect(passwordInput.value).toBe("pepe1234");
    })

    test("Muestra error si contraseña es corta", async () => {
        render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^Nombre$/i), "Pepito");
        await user.type(screen.getByPlaceholderText(/^Correo$/i), "pepito@gmail.com");
        await user.type(screen.getByPlaceholderText(/^Contraseña$/i), "12");
        await user.type(screen.getByPlaceholderText(/^Confirmar contraseña$/i), "12");
        
        await user.click(screen.getByRole("button", { name: /registrarse/i }));

        expect(await screen.findByText(/al menos 6 caracteres/i)).toBeInTheDocument();
    })

    test("Muestra error si correo no es duoc o gmail", async () => {
        render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^Nombre$/i), "Pepito");
        await user.type(screen.getByPlaceholderText(/^Correo$/i), "pepito@yahoo.com");
        await user.type(screen.getByPlaceholderText(/^Contraseña$/i), "12345678");
        await user.type(screen.getByPlaceholderText(/^Confirmar contraseña$/i), "12345678");
        
        await user.click(screen.getByRole("button", { name: /registrarse/i }));

        expect(await screen.findByText(/Correo inválido/i)).toBeInTheDocument();
    })

    test("Muestra error si no hay nombre", async () => {
        render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^Nombre$/i), " ");
        await user.type(screen.getByPlaceholderText(/^Correo$/i), "pepito@gmail.com");
        await user.type(screen.getByPlaceholderText(/^Contraseña$/i), "12345678");
        await user.type(screen.getByPlaceholderText(/^Confirmar contraseña$/i), "12345678");
        
        await user.click(screen.getByRole("button", { name: /registrarse/i }));

        expect(await screen.findByText(/El nombre es obligatorio/i)).toBeInTheDocument();
    })

    test("Muestra error si las contraseñas no coinciden", async () => {
        render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByPlaceholderText(/^Nombre$/i), "Pepito");
        await user.type(screen.getByPlaceholderText(/^Correo$/i), "pepito@gmail.com");
        await user.type(screen.getByPlaceholderText(/^Contraseña$/i), "12345678");
        await user.type(screen.getByPlaceholderText(/^Confirmar contraseña$/i), "abcdefgh");
        
        await user.click(screen.getByRole("button", { name: /registrarse/i }));

        expect(await screen.findByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
    })
    
});
