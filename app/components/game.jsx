'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 100;

const SnakeGame = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const lastRenderTimeRef = useRef(0);
    const animationFrameRef = useRef();

    // Audio setup
    const eatSound = useRef(
        new Audio(
            'data:audio/wav;base64,UklGRlwJAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTgJAACBgIF/gn6Df4B+gn2EfYZ7iHmKeYd8gYJ6knSOq3luqEpN0R8Avy4/ml73kPq4QaeLTVrffzNu0sfp093RyMLHyNDU1NnU1tPR0s/NzcrIxsXGxsfIycjLzc3QztPQ1dPY1t3Y4trl3+ri8OX16Pzr//P//v///fr8+Pv3+/r7+v37/f3//v////////////////////////////////////////////////////////////////////////////////////8AAA=='
        )
    );
    const gameOverSound = useRef(
        new Audio(
            'data:audio/wav;base64,UklGRmwJAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YUgJAACBf4N+f4N7g3mLeYSBeoN+gIR6iXqBh3yEgn5/hHyEfIJ/gIGAfoJ/gH6CfYV8h3qKeYd8goF7kHaNrHxvq0hK0BwAvC8+nGD4kvu4QqeLTlrdgDJs0sjp093RyMLHyNDU1NnU1tPR0s/NzcrIxsXGxsfIycjLzc3QztPQ1dPY1t3Y4trl3+ri8OX16Pzr//P//v///fr8+Pv3+/r7+v37/f3//v////////////////////////////////////////////////////////////////////////////////////8AAA=='
        )
    );

    const playSound = audio => {
        if (!isMuted) {
            audio.current.currentTime = 0;
            audio.current.play().catch(() => {});
        }
    };

    const generateFood = useCallback(() => {
        const newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
        setFood(newFood);
    }, []);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        generateFood();
        setIsPaused(true);
    };

    const checkCollision = head => {
        if (
            head.x < 0 ||
            head.x >= GRID_SIZE ||
            head.y < 0 ||
            head.y >= GRID_SIZE
        ) {
            return true;
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    };

    const gameLoop = useCallback(
        timestamp => {
            if (
                !lastRenderTimeRef.current ||
                timestamp - lastRenderTimeRef.current >= INITIAL_SPEED
            ) {
                if (!gameOver && !isPaused) {
                    const head = { ...snake[0] };

                    switch (direction) {
                        case 'UP':
                            head.y -= 1;
                            break;
                        case 'DOWN':
                            head.y += 1;
                            break;
                        case 'LEFT':
                            head.x -= 1;
                            break;
                        case 'RIGHT':
                            head.x += 1;
                            break;
                        default:
                            break;
                    }

                    if (checkCollision(head)) {
                        setGameOver(true);
                        setHighScore(Math.max(score, highScore));
                        playSound(gameOverSound);
                        return;
                    }

                    const newSnake = [head, ...snake];
                    if (head.x === food.x && head.y === food.y) {
                        setScore(score + 10);
                        generateFood();
                        playSound(eatSound);
                    } else {
                        newSnake.pop();
                    }
                    setSnake(newSnake);
                }
                lastRenderTimeRef.current = timestamp;
            }
            animationFrameRef.current = requestAnimationFrame(gameLoop);
        },
        [
            snake,
            direction,
            food,
            gameOver,
            isPaused,
            score,
            highScore,
            generateFood,
            isMuted,
        ]
    );

    useEffect(() => {
        const handleKeyPress = e => {
            if (isPaused && !gameOver && e.key.includes('Arrow')) {
                setIsPaused(false);
            }

            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (direction !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (direction !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (direction !== 'LEFT') setDirection('RIGHT');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction, isPaused, gameOver]);

    useEffect(() => {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [gameLoop]);

    return (
        <div className='w-full max-w-xl mx-auto bg-[#1A0B2E] text-purple-50 rounded-lg shadow-xl overflow-hidden border-2 border-purple-500'>
            {/* Header section */}
            <div className='p-4 border-b-2 border-purple-700 bg-[#2D1B4E]'>
                <div className='flex justify-between items-center'>
                    <span className='text-2xl font-bold text-white tracking-wider'>
                        Snake Game
                    </span>
                    <div className='flex items-center gap-4'>
                        <button
                            className='p-2 text-white hover:text-purple-300 transition-colors'
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            {isMuted ? '🔇' : '🔊'}
                        </button>
                        <div className='flex items-center gap-2'>
                            <span className='text-yellow-500'>🏆</span>
                            <span className='text-white'>
                                High Score: {highScore}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game container */}
            <div className='p-6 bg-gradient-to-b from-[#1A0B2E] to-[#261445]'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='text-xl font-bold text-white'>
                        Ayang Masam
                    </div>
                    <div className='text-xl font-bold text-white'>
                        Score: {score}
                    </div>

                    {/* Game board */}
                    <div
                        className='relative border-4 border-purple-500 rounded-lg bg-[#130821] shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                        style={{
                            width: GRID_SIZE * CELL_SIZE,
                            height: GRID_SIZE * CELL_SIZE,
                        }}
                    >
                        {/* Food */}
                        <div
                            className='absolute bg-red-400 rounded-full transition-all duration-200 ease-in-out'
                            style={{
                                width: CELL_SIZE - 2,
                                height: CELL_SIZE - 2,
                                left: food.x * CELL_SIZE,
                                top: food.y * CELL_SIZE,
                                boxShadow: '0 0 10px rgba(248, 113, 113, 0.8)',
                            }}
                        />

                        {/* Snake */}
                        {snake.map((segment, index) => (
                            <div
                                key={index}
                                className='absolute rounded transition-all duration-100 ease-linear'
                                style={{
                                    width: CELL_SIZE - 2,
                                    height: CELL_SIZE - 2,
                                    left: segment.x * CELL_SIZE,
                                    top: segment.y * CELL_SIZE,
                                    backgroundColor:
                                        index === 0 ? '#F8B4FF' : '#D946EF',
                                    opacity:
                                        1 - (index / (snake.length + 5)) * 0.3,
                                    boxShadow:
                                        index === 0
                                            ? '0 0 8px rgba(248, 180, 255, 0.8)'
                                            : 'none',
                                }}
                            />
                        ))}
                    </div>

                    {/* Game controls */}
                    <div className='grid grid-cols-3 gap-2 mt-4'>
                        <div></div>
                        <button
                            onClick={() => {
                                if (direction !== 'DOWN') {
                                    setDirection('UP');
                                    if (isPaused && !gameOver)
                                        setIsPaused(false);
                                }
                            }}
                            className='p-3 bg-purple-700 text-white hover:bg-purple-600 rounded-lg border-2 border-purple-500 transition-colors shadow-lg hover:shadow-purple-500/20 active:transform active:scale-95'
                        >
                            ⬆️
                        </button>
                        <div></div>
                        <button
                            onClick={() => {
                                if (direction !== 'RIGHT') {
                                    setDirection('LEFT');
                                    if (isPaused && !gameOver)
                                        setIsPaused(false);
                                }
                            }}
                            className='p-3 bg-purple-700 text-white hover:bg-purple-600 rounded-lg border-2 border-purple-500 transition-colors shadow-lg hover:shadow-purple-500/20 active:transform active:scale-95'
                        >
                            ⬅️
                        </button>
                        <button
                            onClick={() => {
                                if (direction !== 'UP') {
                                    setDirection('DOWN');
                                    if (isPaused && !gameOver)
                                        setIsPaused(false);
                                }
                            }}
                            className='p-3 bg-purple-700 text-white hover:bg-purple-600 rounded-lg border-2 border-purple-500 transition-colors shadow-lg hover:shadow-purple-500/20 active:transform active:scale-95'
                        >
                            ⬇️
                        </button>
                        <button
                            onClick={() => {
                                if (direction !== 'LEFT') {
                                    setDirection('RIGHT');
                                    if (isPaused && !gameOver)
                                        setIsPaused(false);
                                }
                            }}
                            className='p-3 bg-purple-700 text-white hover:bg-purple-600 rounded-lg border-2 border-purple-500 transition-colors shadow-lg hover:shadow-purple-500/20 active:transform active:scale-95'
                        >
                            ➡️
                        </button>
                    </div>

                    {/* Game state messages */}
                    {(gameOver || isPaused) && (
                        <div className='text-center mt-4'>
                            <div className='text-xl font-bold mb-2 text-white'>
                                {gameOver
                                    ? 'Game Over!'
                                    : 'Press any arrow key to start'}
                            </div>
                            {gameOver && (
                                <button
                                    onClick={resetGame}
                                    className='px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/20 active:transform active:scale-95 border-2 border-purple-400'
                                >
                                    Play Again
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SnakeGame;
