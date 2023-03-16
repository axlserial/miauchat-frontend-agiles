import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "../src/pages/NotFound";

// Descripción del componente
describe("NotFound.tsx", () => {
	// Test 1
	test("Se espera que haya un texto: 404 - Not Found", () => {
		// Renderizar el componente
		render(<NotFound />);

		// Buscar el texto
		expect(screen.getByText("404 - Not Found")).toBeDefined();
	});
});
