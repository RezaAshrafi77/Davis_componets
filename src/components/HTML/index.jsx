import { Label } from "../Label";
// Optionally import a library like DOMPurify for sanitization
// import DOMPurify from "dompurify";

export function HTML({ data }) {
  // Helper function to check if the input is valid HTML
  const isValidHTML = (content) =>
    typeof content === "string" &&
    content.trim() !== "" &&
    content.includes("<");

  // Render the component
  return isValidHTML(data) ? (
    <div
      dangerouslySetInnerHTML={{
        // Replace "." with "", optionally sanitize if needed
        __html: data.replace(".", ""),
        // For sanitization, use: DOMPurify.sanitize(data.replace(".", ""))
      }}
    />
  ) : (
    <Label title="داده‌ای برای نمایش موجود نیست." />
  );
}
