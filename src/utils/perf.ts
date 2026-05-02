/** Cap DPR so retina displays do not render 3–4× native pixels. */
export function getRendererPixelRatio(max = 1.75): number {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, max);
}
