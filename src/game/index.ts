import Phaser from 'phaser'
import FrogScene from './FrogScene'
import MenuScene from './MenuScene'

let game: Phaser.Game | null = null

export function initGame(parentId = 'game-container') {
  if (game) {
    try {
      game.destroy(true)
    }
    catch {}
    game = null
  }

  const container = document.getElementById(parentId)
  const rect = container ? container.getBoundingClientRect() : { width: 800, height: 500 }
  const width = Math.max(300, Math.round(rect.width))
  const height = Math.max(300, Math.round(rect.height))

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: parentId,
    backgroundColor: '#87ceeb',
    scale: {
      mode: Phaser.Scale.RESIZE, // использует размеры контейнера — лучше для узких экранов
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width,
      height,
    },
    scene: [MenuScene, FrogScene],
  }

  game = new Phaser.Game(config)
  return game
}
