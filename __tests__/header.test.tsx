import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { Header } from "@/modules/home/ui/components/header";

describe("Header component", () => {
  it("it renders the header with title and buttons", () => {
    render(<Header />);

    // verify that the header element is rendered by checking the test id
    const headerElement = screen.getByTestId("side-header");
    expect(headerElement).toBeInTheDocument();

    // check for the site title
    expect(screen.getByText("Next-starter")).toBeInTheDocument();

    // verify the presence of the sign in button
    const signInButton = screen.getByText(/sign in/i);
    expect(signInButton).toBeInTheDocument();

    // check for the github icon
    const githubIcon = headerElement.querySelector(".size-6");
    expect(githubIcon).toBeInTheDocument();
  });
});
