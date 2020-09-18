export class RandomColorUtils {
  static getRandomColor() {
    return `#${Math.random().toString(16).substr(-6)}`
  }
}
