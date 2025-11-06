import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { describe, expect, test } from "vitest";

describe("testing login", () => {

  test("Permite escribir en los inputs y enviar el formulario pafa iniciar sesion", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usuario = userEvent.setup();

    const emailInput = screen.getByPlaceholderText(/correo/i);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);
    const boton = screen.getByRole("button", { name: /ingresar/i });

    await usuario.type(emailInput, "pepito@gmail.com");
    await usuario.type(passwordInput, "pepe1234");
    await usuario.click(boton);

    expect(emailInput.value).toBe("pepito@gmail.com");
    expect(passwordInput.value).toBe("pepe1234");
  });

});
