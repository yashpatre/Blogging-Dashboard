// src/components/TagInput.jsx
import { useState } from "react";

export default function TagInput({ value = [], onChange }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const t = input.trim();
    if (!t) return;
    if (!value.includes(t)) onChange?.([...value, t]);
    setInput("");
  };

  const removeTag = (t) => onChange?.(value.filter((x) => x !== t));

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !input && value.length) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((t) => (
          <span key={t} className="px-2 py-1 bg-secondary dark:bg-dark-card rounded-full text-sm">
            #{t}
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-primary"
              onClick={() => removeTag(t)}
              aria-label={`Remove ${t}`}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="bb-input"
          placeholder="Add a tag and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button type="button" className="bb-btn border" onClick={addTag}>
          Add
        </button>
      </div>
    </div>
  );
}
