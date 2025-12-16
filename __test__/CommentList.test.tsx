import { render, screen } from "@testing-library/react";
import CommentList from "../src/components/CommentList";
import { type Comment } from "../src/App";

// Test empty state message when no comments.
// Test single comment rendering.
// Test multiple comments rendering in order.
// Test CommentItem integration.
// Test edge cases (empty text, large lists).

describe("Test for CommentList Component.", () => {
  it("should render no comments when item is 0", async () => {
    const mockDataItems: Comment[] = [];
    render(<CommentList comments={mockDataItems} />);

    const commentListEmpty = screen.getByTestId("comment-list-empty");
    expect(commentListEmpty).toBeInTheDocument();
    expect(commentListEmpty).toHaveTextContent(
      "No comments yet. Be the first to comment!"
    );
  });

  it("should single comment rendering", async () => {
    const mockDataItems: Comment[] = [
      {
        id: "1",
        text: "comment 1",
        timestamp: new Date(),
      },
    ];

    render(<CommentList comments={mockDataItems} />);

    const commentList = screen.getAllByTestId("comment-item");
    expect(commentList.length).toEqual(1);
  });

  it("should multiple comments rendering in order", async () => {
    const comments: Comment[] = [
      {
        id: "1",
        text: "comment 1",
        timestamp: new Date(),
      },
      {
        id: "2",
        text: "comment 2",
        timestamp: new Date(),
      },
      {
        id: "3",
        text: "comment 3",
        timestamp: new Date(),
      },
    ];

    render(<CommentList comments={comments} />);

    const commentList = screen.getAllByTestId("comment-item");
    expect(commentList.length).toEqual(3);
    expect(commentList[0]).toHaveTextContent("comment 1");
    expect(commentList[1]).toHaveTextContent("comment 2");
    expect(commentList[2]).toHaveTextContent("comment 3");
  });

  it("should render a large number of comments without error", async () => {
    const numberOfComments = 1000;
    const comments: Comment[] = Array.from(
      { length: numberOfComments },
      (_, i) => ({
        id: `${i}`,
        text: `comment ${i + 1}`,
        timestamp: new Date(),
      })
    );

    render(<CommentList comments={comments} />);

    const commentList = screen.getAllByTestId("comment-item");
    expect(commentList.length).toEqual(numberOfComments);
  });
});
