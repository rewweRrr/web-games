import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  goal = 10

  constructor() {
    super('MenuScene')
  }

  create() {
    const { width, height } = this.scale

    const title = this.add.text(width / 2, height * 0.18, '🐸 Frog Clicker', {
      fontFamily: 'Arial',
      fontSize: `${Math.round(Math.min(width, height) * 0.07)}px`,
      align: 'center',
    }).setOrigin(0.5)

    this.add.text(width / 2, height * 0.32, 'Кликай по лягушкам, чтобы набрать очки', {
      fontSize: `${Math.round(Math.min(width, height) * 0.03)}px`,
      align: 'center',
    }).setOrigin(0.5)

    // Goal controls
    const goalText = this.add.text(width / 2, height * 0.46, `Цель: ${this.goal}`, {
      fontSize: `${Math.round(Math.min(width, height) * 0.04)}px`,
    }).setOrigin(0.5)

    const minus = this.add.text(width / 2 - 80, height * 0.46, '-', { fontSize: '32px' }).setOrigin(0.5).setInteractive()
    const plus = this.add.text(width / 2 + 80, height * 0.46, '+', { fontSize: '32px' }).setOrigin(0.5).setInteractive()

    minus.on('pointerdown', () => {
      this.goal = Math.max(1, this.goal - 1)
      goalText.setText(`Цель: ${this.goal}`)
    })

    plus.on('pointerdown', () => {
      this.goal = this.goal + 1
      goalText.setText(`Цель: ${this.goal}`)
    })

    const startBtn = this.add.text(width / 2, height * 0.64, 'Старт', {
      fontSize: `${Math.round(Math.min(width, height) * 0.045)}px`,
      backgroundColor: '#ffffff',
      padding: { x: 14, y: 8 },
    }).setOrigin(0.5).setInteractive()

    startBtn.on('pointerdown', () => {
      this.scene.start('FrogScene', { goal: this.goal })
    })

    // Responsive: при изменении размера сцены — перенастроить положение текста
    this.scale.on('resize', this.resize, this)
  }

  resize(gameSize: Phaser.Structs.Size) {
    // Phaser автоматически рецентрирует в FIT, но если нужно — можно обновить UI
  }
}
