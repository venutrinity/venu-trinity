"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  label?: string;
};

export default function BackButton({
  label = "Back",
}: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/50 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
    >
      <span className="text-base leading-none transition-transform duration-300 group-hover:-translate-x-0.5">
        ←
      </span>

      <span>{label}</span>
    </button>
  );
}