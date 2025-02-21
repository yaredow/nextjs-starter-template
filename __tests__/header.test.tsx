import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { Header } from "@/modules/home/ui/components/header";

describe("Header component", () => {
  it("renders an icon and a sign in button", () => {
    render(<Header />);

    const headerElement = screen.getByTestId("side-header");
    expect(headerElement).toBeInTheDocument();

    const iconElement = screen.getByRole("img", { name: /icon/i });
    expect(iconElement).toBeInTheDocument();

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });
});
