import React from "react";
import { beforeEach, describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NotFound from "../src/pages/NotFound";
import { BrowserRouter as Router } from "react-router-dom";
import { Rutas } from "../src/routes";

// Descripción del componente
describe("NotFound.tsx", () => {

	beforeEach(() => {
		// Renderizar el componente
		render(<Router> <NotFound /> </Router>);
	});

	// Test 1
	test("Se espera que haya una imagen", () => {
		// Buscar la imagen
		expect(screen.getByRole("img")).toBeDefined();
	});

	// Test 2
	test("Se espera que haya un texto: Ruta no encontrada", () => {
		// Buscar el texto
		expect(screen.getByText("Ruta no encontrada")).toBeDefined();
	});

	// Test 3
	test("Se espera que haya un botón: Regresar a la página principal", () => {
		// Buscar el botón
		expect(screen.getByText("Regresar a la página principal")).toBeDefined();
	});

	// Test 4
	test("Se espera que el botón al hacer click nos rediriga a la ruta principal de los chats", () => {
		// Buscar el botón
		const button = screen.getByRole("button");

		// Hacer click en el botón
		fireEvent.click(button);

		// Navegar a la ruta principal
		expect(window.location.pathname).toContain(Rutas.chats);

	});

});
