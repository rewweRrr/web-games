import { useEffect, useRef } from 'react'
import { initGame } from './game'
import PWABadge from './PWABadge.tsx'

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // id должен быть уникальным и существовать в DOM
    const id = containerRef.current?.id ?? 'game-container'
    initGame(id)

    return () => {
      // Если нужно, тут можно уничтожать игру при размонтировании
    }
  }, [])

  return (
    <>
      <div className="app-root">
        <header className="header">
          <h1>🐸 Frog Clicker</h1>
          <p className="subtitle">Кликай по лягушкам — достигни цели!</p>
        </header>

        <main className="game-area">
          <div id="game-container" ref={containerRef} className="game-container" />
        </main>

        <footer className="footer">Minimal React + Phaser + TS example</footer>
      </div>
      <PWABadge />
    </>
  )
}

export default App
