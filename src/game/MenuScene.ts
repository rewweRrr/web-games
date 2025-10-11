import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  goal = 10
  spawnInterval = 1400
  frogLifetime = 2500
  frogSize = 0.2

  constructor() {
    super('MenuScene')
  }

  create() {
    const { width, height } = this.scale

    // Заголовок — не создаём лишнюю переменную, просто рендерим
    this.add.text(width / 2, height * 0.18, '🐸 Frog Clicker', {
      fontFamily: 'Arial',
      fontSize: `${Math.round(Math.min(width, height) * 0.07)}px`,
      align: 'center',
      color: '#003300',
    }).setOrigin(0.5)

    this.add.text(width / 2, height * 0.32, 'Кликай по лягушкам, чтобы набрать очки', {
      fontSize: `${Math.round(Math.min(width, height) * 0.03)}px`,
      align: 'center',
    }).setOrigin(0.5)

    // Goal controls
    const goalText = this.add.text(width / 2, height * 0.46, `Цель: ${this.goal}`, {
      fontSize: `${Math.round(Math.min(width, height) * 0.04)}px`,
    }).setOrigin(0.5)

    const minus = this.add.text(width / 2 - 90, height * 0.46, '-', { fontSize: `${Math.round(Math.min(width, height) * 0.05)}px` }).setOrigin(0.5).setInteractive()
    const plus = this.add.text(width / 2 + 90, height * 0.46, '+', { fontSize: `${Math.round(Math.min(width, height) * 0.05)}px` }).setOrigin(0.5).setInteractive()

    minus.on('pointerdown', () => {
      this.goal = Math.max(1, this.goal - 1)
      goalText.setText(`Цель: ${this.goal}`)
    })

    plus.on('pointerdown', () => {
      this.goal = this.goal + 1
      goalText.setText(`Цель: ${this.goal}`)
    })
    // Spawn interval control
    const spawnText = this.add.text(width / 2, height * 0.54, `Интервал появления (ms):  ${this.spawnInterval}`, {
      fontSize: `${Math.round(Math.min(width, height) * 0.032)}px`,
    }).setOrigin(0.5)

    const spawnMinus = this.add.text(width / 2 + 135, height * 0.54, '-', { fontSize: `${Math.round(Math.min(width, height) * 0.045)}px` }).setOrigin(0.5).setInteractive()
    const spawnPlus = this.add.text(width / 2 + 210, height * 0.54, '+', { fontSize: `${Math.round(Math.min(width, height) * 0.045)}px` }).setOrigin(0.5).setInteractive()

    spawnMinus.on('pointerdown', () => {
      this.spawnInterval = Math.max(200, this.spawnInterval - 100)
      spawnText.setText(`Интервал появления (ms):  ${this.spawnInterval}`)
    })
    spawnPlus.on('pointerdown', () => {
      this.spawnInterval = this.spawnInterval + 100
      spawnText.setText(`Интервал появления (ms):  ${this.spawnInterval}`)
    })

    // Frog lifetime control
    const lifeText = this.add.text(width / 2, height * 0.62, `Время жизни лягушки (ms):  ${this.frogLifetime}`, {
      fontSize: `${Math.round(Math.min(width, height) * 0.032)}px`,
    }).setOrigin(0.5)

    const lifeMinus = this.add.text(width / 2 + 135, height * 0.62, '-', { fontSize: `${Math.round(Math.min(width, height) * 0.045)}px` }).setOrigin(0.5).setInteractive()
    const lifePlus = this.add.text(width / 2 + 210, height * 0.62, '+', { fontSize: `${Math.round(Math.min(width, height) * 0.045)}px` }).setOrigin(0.5).setInteractive()

    lifeMinus.on('pointerdown', () => {
      this.frogLifetime = Math.max(300, this.frogLifetime - 100)
      lifeText.setText(`Время жизни лягушки (ms):  ${this.frogLifetime}`)
    })
    lifePlus.on('pointerdown', () => {
      this.frogLifetime = this.frogLifetime + 100
      lifeText.setText(`Время жизни лягушки (ms):  ${this.frogLifetime}`)
    })

    // Frog size control
    const sizeText = this.add.text(width / 2, height * 0.68, `Размер лягушки:  ${this.frogSize}`, {
      fontSize: `${Math.round(Math.min(width, height) * 0.032)}px`,
    }).setOrigin(0.5)

    const sizeMinus = this.add.text(width / 2 + 70, height * 0.68, '-', { fontSize: `${Math.round(Math.min(width, height) * 0.045)}px` }).setOrigin(0.5).setInteractive()
    const sizePlus = this.add.text(width / 2 + 180, height * 0.68, '+', { fontSize: `${Math.round(Math.min(width, height) * 0.045)}px` }).setOrigin(0.5).setInteractive()

    sizeMinus.on('pointerdown', () => {
      this.frogSize = Math.round(100 * Math.max(0.12, this.frogSize - 0.01)) / 100
      sizeText.setText(`Размер лягушки:  ${this.frogSize}`)
    })
    sizePlus.on('pointerdown', () => {
      this.frogSize = Math.round(100 * (this.frogSize + 0.01)) / 100
      sizeText.setText(`Размер лягушки::  ${this.frogSize}`)
    })

    const startBtn = this.add.text(width / 2, height * 0.76, 'Старт', {
      fontSize: `${Math.round(Math.min(width, height) * 0.045)}px`,
      backgroundColor: '#065f46', // тёмно-зелёный фон
      color: '#ffffff', // белый текст поверх темного фона
      padding: { x: 14, y: 8 },
    }).setOrigin(0.5).setInteractive()

    startBtn.on('pointerdown', () => {
      this.scene.start('FrogScene', { goal: this.goal, spawnInterval: this.spawnInterval, frogLifetime: this.frogLifetime })
    })

    // Перерасчёт UI при изменении размеров
    this.scale.on('resize', this.reflow, this)
  }

  reflow() {
    // Простая стратегия — перезапустить сцену, чтобы элементы пересчитались.
    // Это дешёвый и простой способ избежать тонкой ручной перераскладки.
    this.scene.restart()
  }
}
