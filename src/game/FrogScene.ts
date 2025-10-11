import Phaser from 'phaser'
import { playClick, playSpawn, playWin } from './audio'

export default class FrogScene extends Phaser.Scene {
  score = 0
  goal = 10
  scoreText!: Phaser.GameObjects.Text

  constructor() {
    super('FrogScene')
  }

  init(data: any) {
    if (data?.goal)
      this.goal = Number(data.goal) || 10
  }

  create() {
    this.score = 0
    const { width } = this.scale

    this.scoreText = this.add.text(12, 12, `Очки: ${this.score}`, {
      fontSize: `${Math.round(Math.min(width, this.scale.height) * 0.03)}px`,
      color: '#003300',
      backgroundColor: 'rgba(255,255,255,0.6)',
      padding: { x: 6, y: 4 },
    })

    // Кнопка возврата в меню
    const btn = this.add.text(this.scale.width - 12, 12, 'Меню', {
      fontSize: `${Math.round(Math.min(width, this.scale.height) * 0.025)}px`,
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: { x: 6, y: 4 },
    }).setOrigin(1, 0).setInteractive()

    btn.on('pointerdown', () => {
      this.scene.start('MenuScene')
    })

    this.time.addEvent({ delay: 800, callback: this.spawnFrog, callbackScope: this, loop: true })
  }

  spawnFrog() {
    const w = this.scale.width
    const h = this.scale.height
    const size = Math.round(Math.min(w, h) * 0.12) // размер эмодзи

    const x = Phaser.Math.Between(size / 2 + 8, w - size / 2 - 8)
    const y = Phaser.Math.Between(Math.round(h * 0.2), h - Math.round(h * 0.12))

    const frog = this.add.text(x, y, '🐸', {
      fontSize: `${size}px`,
    }).setOrigin(0.5).setInteractive()

    playSpawn()

    frog.on('pointerdown', () => {
      playClick()
      frog.destroy()
      this.score++
      this.scoreText.setText(`Очки: ${this.score}`)

      if (this.score >= this.goal) {
        playWin()
        const big = Math.round(Math.min(w, h) * 0.12)
        this.add.text(w / 2, h / 2, 'Победа! 🎉', {
          fontSize: `${big}px`,
          backgroundColor: 'rgba(255,255,255,0.8)',
          padding: { x: 12, y: 8 },
        }).setOrigin(0.5)

        // остановим появление новых лягушек и через 2 сек вернёмся в меню
        this.time.removeAllEvents()
        this.time.delayedCall(1800, () => this.scene.start('MenuScene'), [], this)
      }
    })

    // Авто-уничтожение через 1.5с, если не кликнута
    this.time.delayedCall(1500, () => {
      if (frog && frog.active)
        frog.destroy()
    }, [], this)
  }
}
