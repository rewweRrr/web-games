import Phaser from 'phaser'

export class MenuScene extends Phaser.Scene {
  goal = 10
  spawnInterval = 1400
  frogLifetime = 2500
  frogSize = 0.3

  constructor() {
    super('MenuScene')
  }

  create() {
    const { width, height } = this.scale

    const centerX = width / 2

    // Заголовок — не создаём лишнюю переменную, просто рендерим
    this.add.text(centerX, height * 0.18, '🐸 Frog Clicker', {
      fontFamily: 'Arial',
      fontSize: 32,
      align: 'center',
      color: '#003300',
    }).setOrigin(0.5)

    this.add.text(centerX, height * 0.32, 'Кликай по лягушкам, чтобы набрать очки', { fontSize: 20 }).setOrigin(0.5)

    // Goal controls
    const goalText = this.add.text(centerX, height * 0.46, `Цель: ${this.goal}`, { fontSize: 16 }).setOrigin(0.5)

    const minus = this.add.text(centerX - 90, height * 0.46, '-', { fontSize: 24 }).setOrigin(0.5).setInteractive()
    const plus = this.add.text(centerX + 90, height * 0.46, '+', { fontSize: 24 }).setOrigin(0.5).setInteractive()

    minus.on('pointerdown', () => {
      this.goal = Math.max(1, this.goal - 1)
      goalText.setText(`Цель: ${this.goal}`)
    })

    plus.on('pointerdown', () => {
      this.goal = this.goal + 1
      goalText.setText(`Цель: ${this.goal}`)
    })

    // Spawn interval control
    const spawnControlHeight = height * 0.54
    const spawnText = this.add.text(centerX, spawnControlHeight, 'Интервал появления (ms):', { fontSize: 16 }).setOrigin(0.5)

    const spawnMinus = this.add.text(spawnText.x + spawnText.displayOriginX, spawnControlHeight, '-', { fontSize: 24 }).setOrigin(0, 0.5).setInteractive()
    const spawnNumber = this.add.text(spawnMinus.x + spawnMinus.width + 8, spawnControlHeight, String(this.spawnInterval), { fontSize: 16 }).setOrigin(0, 0.5).setInteractive()
    const spawnPlus = this.add.text(spawnNumber.x + spawnNumber.width + 8, spawnControlHeight, '+', { fontSize: 24 }).setOrigin(0, 0.5).setInteractive()

    spawnMinus.on('pointerdown', () => {
      this.spawnInterval = Math.max(200, this.spawnInterval - 100)
      spawnNumber.setText(String(this.spawnInterval))
      spawnPlus.x = spawnNumber.x + spawnNumber.width + 8
    })
    spawnPlus.on('pointerdown', () => {
      this.spawnInterval = this.spawnInterval + 100
      spawnNumber.setText(String(this.spawnInterval))
      spawnPlus.x = spawnNumber.x + spawnNumber.width + 8
    })

    // Frog lifetime control
    const lifeControlHeight = height * 0.62
    const lifeText = this.add.text(centerX, lifeControlHeight, 'Время жизни лягушки (ms):', { fontSize: 16 }).setOrigin(0.5)

    const lifeMinus = this.add.text(lifeText.x + lifeText.displayOriginX, lifeControlHeight, '-', { fontSize: 24 }).setOrigin(0, 0.5).setInteractive()
    const lifeNumber = this.add.text(lifeMinus.x + lifeMinus.width + 8, lifeControlHeight, String(this.frogLifetime), { fontSize: 16 }).setOrigin(0, 0.5).setInteractive()
    const lifePlus = this.add.text(lifeNumber.x + lifeNumber.width + 8, lifeControlHeight, '+', { fontSize: 24 }).setOrigin(0, 0.5).setInteractive()

    lifeMinus.on('pointerdown', () => {
      this.frogLifetime = Math.max(300, this.frogLifetime - 100)
      lifeNumber.setText(String(this.frogLifetime))
      lifePlus.x = lifeNumber.x + lifeNumber.width + 8
    })
    lifePlus.on('pointerdown', () => {
      this.frogLifetime = this.frogLifetime + 100
      lifeNumber.setText(String(this.frogLifetime))
      lifePlus.x = lifeNumber.x + lifeNumber.width + 8
    })

    // Frog size control

    const sizeControlHeight = height * 0.68
    const sizeText = this.add.text(centerX, sizeControlHeight, 'Размер лягушки:', { fontSize: 16 }).setOrigin(0.5)
    const sizeMinus = this.add.text(sizeText.x + sizeText.displayOriginX, sizeControlHeight, '-', { fontSize: 24 }).setOrigin(0, 0.5).setInteractive()
    const sizeNumber = this.add.text(sizeMinus.x + sizeMinus.width + 8, sizeControlHeight, String(this.frogSize), { fontSize: 16 }).setOrigin(0, 0.5)
    const sizePlus = this.add.text(sizeNumber.x + sizeNumber.width + 8, sizeControlHeight, '+', { fontSize: 24 }).setOrigin(0, 0.5).setInteractive()

    sizeMinus.on('pointerdown', () => {
      this.frogSize = Math.round(100 * Math.max(0.12, this.frogSize - 0.1)) / 100
      sizeNumber.setText(String(this.frogSize))
      sizePlus.x = sizeNumber.x + sizeNumber.width + 8
    })
    sizePlus.on('pointerdown', () => {
      this.frogSize = Math.round(100 * (this.frogSize + 0.1)) / 100
      sizeNumber.setText(String(this.frogSize))
      sizePlus.x = sizeNumber.x + sizeNumber.width + 8
    })

    const startBtn = this.add.text(centerX, height * 0.76, 'Старт', {
      fontSize: 20,
      backgroundColor: '#065f46', // тёмно-зелёный фон
      color: '#ffffff', // белый текст поверх темного фона
      padding: { x: 14, y: 8 },
    }).setOrigin(0.5).setInteractive()

    startBtn.on('pointerdown', () => {
      this.scene.start('FrogScene', {
        goal: this.goal,
        spawnInterval: this.spawnInterval,
        frogLifetime: this.frogLifetime,
        frogSize: this.frogSize,
      })
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
