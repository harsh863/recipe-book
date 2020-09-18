export class RandomSpinnerUtils {
  private static spinners: string[] = [
    'ball-8bits', 'ball-atom', 'ball-beat', 'ball-circus',
    'ball-climbing-dot', 'ball-clip-rotate', 'ball-clip-rotate-multiple',
    'ball-clip-rotate-pulse', 'ball-elastic-dots', 'ball-fall', 'ball-fusion',
    'ball-grid-beat', 'ball-grid-pulse', 'ball-newton-cradle', 'ball-pulse',
    'ball-pulse-rise', 'ball-pulse-sync', 'ball-rotate', 'ball-running-dots',
    'ball-scale', 'ball-scale-multiple', 'ball-scale-pulse', 'ball-scale-ripple',
    'ball-scale-ripple-multiple', 'ball-spin', 'ball-spin-clockwise',
    'ball-spin-clockwise-fade', 'ball-spin-clockwise-fade-rotating', 'ball-spin-fade',
    'ball-spin-fade-rotating', 'ball-spin-fade', 'ball-spin-rotate',
    'ball-spin-clockwise-pin', 'ball-square-pin', 'ball-triangle-path', 'ball-zig-zag',
    'ball-zig-zag-deflect', 'cube-transition', 'fire', 'line-scale', 'line-scale-party',
    'line-scale-pulse-out', 'line-spin-clockwise-fade',
    'line-spin-clockwise-fade-rotating', 'line-spin-fade', 'line-spin-fade-rotating',
    'pacman', 'square-jelly-box', 'square-loader', 'square-spin', 'timer',
    'triangle-skew-spin'];

  static getRandomSpinner(): string {
   return this.spinners[Math.floor(Math.random() * this.spinners.length)];
  }
}
