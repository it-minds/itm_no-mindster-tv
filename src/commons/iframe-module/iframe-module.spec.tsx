import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import IframeModule from "./iframe-module";

test("renders iframe module", () => {
    // Arrange
    const src = "https://www.google.com";
    const title = "Google";
    render(<IframeModule src={src} title={title} />);
    // Act
    const iframe = screen.getByTitle(title);
    // Assert
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", src);
    expect(iframe).toHaveAttribute("title", title);
});
