// src/components/ImagePicker.jsx
import { useRef } from "react";

export default function ImagePicker({ file, setFile, previewUrl, setPreviewUrl }) {
  const ref = useRef();

  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  };

  const clear = () => {
    setFile(null);
    setPreviewUrl("");
    if (ref.current) ref.current.value = "";
  };

  return (
    <div>
      {previewUrl ? (
        <div className="relative">
          <img src={previewUrl} alt="Cover" className="w-full rounded-xl object-cover aspect-video" />
          <div className="absolute top-2 right-2 flex gap-2">
            <button type="button" className="bb-btn bg-white/80 dark:bg-dark-card/80" onClick={clear}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-xl p-6 text-center">
          <p className="mb-3">Add a cover image (optional)</p>
          <button type="button" className="bb-btn border" onClick={() => ref.current?.click()}>
            Choose Image
          </button>
          <input
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onPick}
          />
        </div>
      )}
    </div>
  );
}
