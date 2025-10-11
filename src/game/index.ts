import Phaser from 'phaser'
import FrogScene from './FrogScene'
import MenuScene from './MenuScene'

let game: Phaser.Game | null = null

export function initGame(parentId = 'game-container') {
  if (game) {
    try { game.destroy(true) }
    catch (e) {}
    game = null
  }

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: parentId,
    backgroundColor: '#87ceeb',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 500,
    },
    scene: [MenuScene, FrogScene],
  }

  game = new Phaser.Game(config)
  return game
}
