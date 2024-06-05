import React from 'react';
import { render, screen } from "@testing-library/react";
import Footer from "components/Footer";

describe("Footer", () => {
    test('renders footer text', () => {
        render(<Footer />);
        const footerText = screen.getByText(/All rights reserved./i);
        expect(footerText).toBeInTheDocument();
    });
});
