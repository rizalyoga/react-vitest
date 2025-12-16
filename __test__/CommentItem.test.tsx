import { render, screen } from "@testing-library/react";
import CommentItem from "../src/components/CommentItem";
import { type Comment } from "../src/App";

// Test comment text is rendered correctly.
// Test timestamp is formatted and displayed.
// Test date formatting works correctly.
// Test handling of long text and special characters.

describe("Test for CommentItem component", () => {
  const mockDataItem: Comment = {
    id: "1",
    text: "mock-data",
    timestamp: new Date("2025-12-16T01:10:02"),
  };

  it("should comment text is rendered correctly", async () => {
    render(<CommentItem comment={mockDataItem} />);

    const commentItem = screen.getByTestId("comment-item");
    expect(commentItem).toBeVisible();
    expect(commentItem).toBeInTheDocument();
  });

  it("should formated date & timestamp in the displayed", async () => {
    render(<CommentItem comment={mockDataItem} />);

    const commentItem = screen.getByTestId("comment-item");
    const tampstamp = screen.getByTestId("comment-item-tampstamp");

    expect(commentItem).toBeVisible();
    expect(tampstamp).toHaveTextContent("Dec 16, 2025, 01:10 AM");
  });

  it("should handle long text.", async () => {
    const longText = "A".repeat(500);
    const mockDataItems: Comment = {
      id: "1",
      text: longText,
      timestamp: new Date(),
    };
    render(<CommentItem comment={mockDataItems} />);

    const commentItem = screen.getByTestId("comment-item");
    expect(commentItem).toHaveTextContent("AAAA");
  });

  it("should handle special text character.", async () => {
    const mockDataItems: Comment = {
      id: "1",
      text: "Special Character &<>",
      timestamp: new Date(),
    };
    render(<CommentItem comment={mockDataItems} />);

    const commentItem = screen.getByTestId("comment-item");
    expect(commentItem).toHaveTextContent("&<>");
  });
});
