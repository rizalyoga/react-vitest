import { screen, render } from "@testing-library/react";
import App from "../src/App";
import userEvent from "@testing-library/user-event";

describe("Rendering and Basic Queries.", () => {
  describe("1. Component rendered", () => {
    it("1.1 Confirm the component can be rendered", async () => {
      render(<App />);

      const title = screen.getByRole("heading", { level: 1 });
      expect(title).toHaveTextContent("Comments");
    });

    it("1.2 Form elements appear", () => {
      render(<App />);

      const textarea = screen.getByPlaceholderText("Write a comment...");
      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
    });
  });
});

describe("User Input & Interaction", () => {
  describe("2.1 Typing updates the textarea", () => {
    it("Simulate typing into the textarea.", async () => {
      render(<App />);
      const user = userEvent.setup();
      const textarea = screen.getByPlaceholderText(
        "Write a comment..."
      ) as HTMLTextAreaElement;
      expect(textarea).toBeInTheDocument();

      await user.type(textarea, "this is typing from integration test.");
      expect(textarea.value).toEqual("this is typing from integration test.");
    });
  });

  describe("2.2 Submitting adds a comment", () => {
    it("should verify that comment appear in the list when user submit comment", async () => {
      render(<App />);
      const user = userEvent.setup();
      const textarea = screen.getByPlaceholderText(
        "Write a comment..."
      ) as HTMLTextAreaElement;
      const button = screen.getByRole("button");
      const emptyCommentArea = screen.getByTestId("comment-list-empty");

      expect(button).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
      expect(emptyCommentArea).toBeInTheDocument();

      await user.type(textarea, "comment-1");
      expect(textarea.value).toEqual("comment-1");

      await user.click(button);
      const commentList = screen.getAllByTestId("comment-item");
      expect(commentList.length).toEqual(1);
      expect(commentList[0]).toHaveTextContent("comment-1");
    });
  });
});

describe("Form Behavior", () => {
  describe("3.1 Textarea clears after submit", () => {
    it("After submitting, textarea should be empty.", async () => {
      render(<App />);
      const user = userEvent.setup();
      const textarea = screen.getByPlaceholderText(
        "Write a comment..."
      ) as HTMLTextAreaElement;
      const button = screen.getByRole("button");
      const emptyCommentArea = screen.getByTestId("comment-list-empty");

      expect(button).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
      expect(emptyCommentArea).toBeInTheDocument();

      await user.type(textarea, "comment-1");
      await user.click(button);
      const commentList = screen.getAllByTestId("comment-item");
      expect(commentList.length).toEqual(1);
      expect(textarea.value).toEqual("");
    });
  });

  describe("3.2 Prevent empty comments", () => {
    it("Ensure submitting with an empty or whitespace-only textarea does **not** add anything to the list.", async () => {
      render(<App />);
      const user = userEvent.setup();
      const textarea = screen.getByPlaceholderText(
        "Write a comment..."
      ) as HTMLTextAreaElement;
      const button = screen.getByRole("button");
      const emptyCommentArea = screen.getByTestId("comment-list-empty");

      expect(button).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
      expect(emptyCommentArea).toBeInTheDocument();

      expect(textarea.value).toEqual("");
      await user.click(button);
      expect(emptyCommentArea).toBeInTheDocument();
    });
  });
});

describe("Comment list behavior", () => {
  describe("4.1 Multiple comments rendered in order", () => {
    it("Submit several comments and ensure all appear in the list in the order submitted.", async () => {
      render(<App />);
      const user = userEvent.setup();

      const textarea = screen.getByPlaceholderText(
        "Write a comment..."
      ) as HTMLTextAreaElement;
      const button = screen.getByRole("button");
      const emptyCommentArea = screen.getByTestId("comment-list-empty");

      expect(button).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
      expect(emptyCommentArea).toBeInTheDocument();

      await user.type(textarea, "comment-1");
      await user.click(button);
      await user.type(textarea, "comment-2");
      await user.click(button);
      await user.type(textarea, "comment-3");
      await user.click(button);

      const commentList = screen.getAllByTestId("comment-item");
      expect(commentList).toBeDefined();
      expect(commentList.length).toEqual(3);

      expect(commentList[0]).toHaveTextContent("comment-3");
      expect(commentList[1]).toHaveTextContent("comment-2");
      expect(commentList[2]).toHaveTextContent("comment-1");
    });
  });
});
