// src/game/FrogScene.ts
import Phaser from 'phaser'
import { playClick, playSpawn, playWin } from './audio'

export default class FrogScene extends Phaser.Scene {
  score = 0
  goal = 10
  scoreText!: Phaser.GameObjects.Text
  spawnInterval = 800
  frogLifetime = 1500
  frogSize = 0.12
  spawnEvent!: Phaser.Time.TimerEvent

  constructor() {
    super('FrogScene')
  }

  init(data: any) {
    if (data?.goal)
      this.goal = Number(data.goal) || 10
    if (data?.spawnInterval)
      this.spawnInterval = Number(data.spawnInterval) || 800
    if (data?.frogLifetime)
      this.frogLifetime = Number(data.frogLifetime) || 1500
  }

  create() {
    this.score = 0
    const { width, height } = this.scale

    this.scoreText = this.add.text(12, 12, `Очки: ${this.score}`, {
      fontSize: `${Math.round(Math.min(width, height) * 0.03)}px`,
      color: '#003300',
      backgroundColor: 'rgba(255,255,255,0.6)',
      padding: { x: 6, y: 4 },
    })

    // Кнопка возврата в меню
    const btn = this.add.text(this.scale.width - 12, 12, 'Меню', {
      fontSize: `${Math.round(Math.min(width, height) * 0.025)}px`,
      color: '#003300',
      backgroundColor: 'rgba(255,255,255,0.6)',
      padding: { x: 6, y: 4 },
    }).setOrigin(1, 0).setInteractive()

    btn.on('pointerdown', () => {
      this.scene.start('MenuScene')
    })

    // Планируем появление лягушек с заданным интервалом
    this.spawnEvent = this.time.addEvent({ delay: this.spawnInterval, callback: this.spawnFrog, callbackScope: this, loop: true })

    // Если изменится размер — обновим UI шрифты
    this.scale.on('resize', this.onResize, this)
  }

  onResize() {
    // обновим размер scoreText
    const { width, height } = this.scale
    this.scoreText.setStyle({ fontSize: `${Math.round(Math.min(width, height) * 0.03)}px` })
  }

  spawnFrog() {
    const w = this.scale.width
    const h = this.scale.height
    const size = Math.round(Math.min(w, h) * this.frogSize) // размер эмодзи

    const x = Phaser.Math.Between(size / 2 + 8, w - size / 2 - 8)
    const y = Phaser.Math.Between(Math.round(h * 0.2), h - Math.round(h * this.frogSize))

    const frog = this.add.text(x, y, '🐸', {
      fontSize: `${size}px`,
    }).setOrigin(0.5).setInteractive()

    playSpawn()

    // при клике — анимация успеха
    frog.on('pointerdown', () => {
      frog.disableInteractive()
      playClick()
      this.tweens.add({
        targets: frog,
        scale: 1.4,
        y: frog.y - Math.round(size * 0.25),
        alpha: 0,
        duration: 260,
        ease: 'Cubic.easeOut',
        onComplete: () => frog.destroy(),
      })

      this.score++
      this.scoreText.setText(`Очки: ${this.score}`)

      if (this.score >= this.goal) {
        playWin()
        const big = Math.round(Math.min(w, h) * this.frogSize)
        this.add.text(w / 2, h / 2, 'Победа! 🎉', {
          fontSize: `${big}px`,
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: { x: 12, y: 8 },
        }).setOrigin(0.5)

        // остановим появление новых лягушек и через 2 сек вернёмся в меню
        this.spawnEvent.remove(false)
        this.time.delayedCall(1800, () => this.scene.start('MenuScene'), [], this)
      }
    })

    // Авто-уничтожение через frogLifetime: анимация промаха
    this.time.delayedCall(this.frogLifetime, () => {
      if (!frog || !frog.scene)
        return
      if (!frog.active)
        return
      // анимация промаха — маленький бой и исчезновение
      this.tweens.add({
        targets: frog,
        alpha: 0,
        angle: 20,
        scale: 0.6,
        duration: 300,
        ease: 'Cubic.easeIn',
        onComplete: () => frog.destroy(),
      })
    }, [], this)
  }
}
