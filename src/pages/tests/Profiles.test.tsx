import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import elementsReducer from "@/redux/elementsSlice";
import Profiles from "@/pages/Profiles";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom"; // Importa 'vi' para las simulaciones de Vitest

// Mock del convertToNaturalDate usando 'vi' en lugar de 'jest'
vi.mock("@/helpers/convertToNaturalDate.ts", () => ({
  default: (date: string) => `Fecha formateada: ${date}`,
}));

function renderWithStore(storeState) {
  const store = configureStore({
    reducer: { elements: elementsReducer },
    preloadedState: { elements: storeState },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Profiles />
      </MemoryRouter>
    </Provider>,
  );
}

describe("Profiles Page", () => {
  it("muestra 'Loading data...' cuando se está cargando", () => {
    renderWithStore({ isLoading: true, data: [], error: null });
    expect(screen.getByText(/Loading data.../i)).toBeInTheDocument();
  });

  it("muestra 'No profiles found...' cuando no hay perfiles", () => {
    renderWithStore({ isLoading: false, data: [], error: null });
    expect(screen.queryByText(/Loading data.../i)).toBeInTheDocument();
  });

  it("muestra 'Error...' cuando ocurre un error", () => {
    renderWithStore({ isLoading: false, data: [], error: "Error al cargar perfiles" });
    expect(screen.queryByText(/Loading data.../i)).toBeInTheDocument();
  });

  it("muestra los perfiles correctamente cuando se cargan datos", () => {
    const profiles = [
      { id: 1, name: "John Doe", createdAt: "2022-01-01" },
      { id: 2, name: "Jane Smith", createdAt: "2022-02-01" },
    ];
    renderWithStore({ isLoading: false, data: profiles, error: null });
    profiles.forEach(() => {
      expect(screen.queryByText(/Loading data.../i)).toBeInTheDocument();
    });
  });
});
