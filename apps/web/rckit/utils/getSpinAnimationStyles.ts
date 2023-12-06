export function getSpinAnimationStyles(isSpin = true) {
  return {
    animation: isSpin ? `spin 1s linear infinite` : 'none',
  };
}
