import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactUs from "@/app/contact-us/page";

describe("Contact us page", () => {
  it("should render properly", () => {
    render(<ContactUs />);

    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toHaveTextContent("Contact Us");
  });
});
