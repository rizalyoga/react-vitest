import { render, screen } from "@testing-library/react";
import CommentBox from "../src/components/CommentBox";
import userEvent from "@testing-library/user-event";

// Test rendering of textarea and submit button.
// Test user input updates textarea value.
// Test form submission calls onAddComment with trimmed text.
// Test textarea clears after submission.
// Test empty/whitespace-only submissions are prevented.

describe("CommentBox Component", () => {
  const user = userEvent.setup();

  it("should render", () => {
    const mockAddComponent = vi.fn();
    render(<CommentBox onAddComment={mockAddComponent} />);
    const textArea = screen.getByTestId("comment-box");
    expect(textArea).toBeDefined();

    const submitButton = screen.getAllByRole("button");
    expect(submitButton).toBeDefined();
  });

  it("Test user input updates textarea value", async () => {
    const mockAddComponent = vi.fn();
    render(<CommentBox onAddComment={mockAddComponent} />);
    const textArea = screen.getByTestId("comment-box") as HTMLTextAreaElement;
    expect(textArea).toBeInTheDocument();

    await user.type(textArea, "This is textarea component");
    expect(textArea.value).toBe("This is textarea component");
  });

  it("should calls onAddComment with trimmed text", async () => {
    const mockAddComponent = vi.fn();
    render(<CommentBox onAddComment={mockAddComponent} />);
    const textArea = screen.getByTestId("comment-box") as HTMLTextAreaElement;
    const submitBtn = screen.getByRole("button") as HTMLButtonElement;

    expect(textArea).toBeDefined();
    expect(submitBtn).toBeVisible();

    await user.type(textArea, "  Task 1  ");
    await user.click(submitBtn);

    expect(mockAddComponent).toBeCalledTimes(1);
    expect(mockAddComponent).toHaveBeenCalledWith("Task 1");
  });

  it("should clears textarea after submission.", async () => {
    const mockAddComponent = vi.fn();
    render(<CommentBox onAddComment={mockAddComponent} />);
    const textArea = screen.getByTestId("comment-box") as HTMLTextAreaElement;
    const submitBtn = screen.getByRole("button") as HTMLButtonElement;

    expect(textArea).toBeDefined();
    expect(submitBtn).toBeVisible();

    await user.type(textArea, "  Task 1  ");
    await user.click(submitBtn);

    expect(mockAddComponent).toBeCalledTimes(1);
    expect(mockAddComponent).toHaveBeenCalledWith("Task 1");
    expect(textArea.value).toBe("");
  });

  it("should not call onAddComment when textarea empty.", async () => {
    const mockAddComponent = vi.fn();
    render(<CommentBox onAddComment={mockAddComponent} />);
    const submitBtn = screen.getByRole("button") as HTMLButtonElement;
    expect(submitBtn).toBeVisible();

    await user.click(submitBtn);
    expect(mockAddComponent).toBeCalledTimes(0);
  });
});
