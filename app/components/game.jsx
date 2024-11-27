'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';

const CELL_SIZE = 20;
const MIN_SWIPE_DISTANCE = 30;

const SnakeGame = () => {
    const [gridSize, setGridSize] = useState(20);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const lastRenderTimeRef = useRef(0);
    const animationFrameRef = useRef();
    const touchStartRef = useRef(null);

    // Initialize grid size based on screen width
    useEffect(() => {
        const updateGridSize = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const maxGridWidth = Math.floor((screenWidth * 0.9) / CELL_SIZE);
            const maxGridHeight = Math.floor((screenHeight * 0.5) / CELL_SIZE);
            const newGridSize = Math.min(maxGridWidth, maxGridHeight, 20);
            setGridSize(newGridSize);

            // Reset game when screen size changes
            resetGame(newGridSize);
        };

        updateGridSize();
        window.addEventListener('resize', updateGridSize);
        return () => window.removeEventListener('resize', updateGridSize);
    }, []);

    const generateFood = useCallback(
        (customGridSize = gridSize) => {
            const newFood = {
                x: Math.floor(Math.random() * customGridSize),
                y: Math.floor(Math.random() * customGridSize),
            };
            setFood(newFood);
        },
        [gridSize]
    );

    const resetGame = (customGridSize = gridSize) => {
        const centerPosition = Math.floor(customGridSize / 2);
        setSnake([{ x: centerPosition, y: centerPosition }]);
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        generateFood(customGridSize);
        setIsPaused(true);
    };

    const checkCollision = head => {
        if (
            head.x < 0 ||
            head.x >= gridSize ||
            head.y < 0 ||
            head.y >= gridSize
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
            const GAME_SPEED = 150; // Slightly slower for mobile

            if (
                !lastRenderTimeRef.current ||
                timestamp - lastRenderTimeRef.current >= GAME_SPEED
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
                        setHighScore(prev => Math.max(score, prev));
                        return;
                    }

                    const newSnake = [head, ...snake];
                    if (head.x === food.x && head.y === food.y) {
                        setScore(score + 10);
                        generateFood();
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
            generateFood,
            gridSize,
        ]
    );

    const handleTouchStart = e => {
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = e => {
        e.preventDefault(); // Prevent scrolling while playing
    };

    const handleTouchEnd = e => {
        if (!touchStartRef.current) return;

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;

        if (
            Math.abs(deltaX) < MIN_SWIPE_DISTANCE &&
            Math.abs(deltaY) < MIN_SWIPE_DISTANCE
        ) {
            return;
        }

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0 && direction !== 'LEFT') {
                setDirection('RIGHT');
            } else if (deltaX < 0 && direction !== 'RIGHT') {
                setDirection('LEFT');
            }
        } else {
            // Vertical swipe
            if (deltaY > 0 && direction !== 'UP') {
                setDirection('DOWN');
            } else if (deltaY < 0 && direction !== 'DOWN') {
                setDirection('UP');
            }
        }

        if (isPaused && !gameOver) {
            setIsPaused(false);
        }
    };

    // Handle keyboard events for desktop play
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
        <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 py-8'>
            <div className='w-full max-w-xl bg-gray-900 text-purple-50 rounded-lg shadow-xl overflow-hidden border-2 border-purple-400'>
                {/* Header section */}
                <div className='p-4 border-b-2 border-purple-500 bg-[#2D1B4E]'>
                    <div className='flex justify-between items-center'>
                        <span className='text-xl md:text-2xl font-bold text-white tracking-wider'>
                            Snake Game
                        </span>
                        <div className='flex items-center gap-2'>
                            <span className='text-yellow-500'>🏆</span>
                            <span className='text-white text-sm md:text-base'>
                                High Score: {highScore}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Game container */}
                <div className='p-4 md:p-6 bg-gray-900'>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='text-lg md:text-xl font-bold text-white'>
                            Score: {score}
                        </div>

                        {/* Game board */}
                        <div
                            className='relative border-4 border-purple-400 rounded-lg bg-black shadow-[0_0_30px_rgba(167,139,250,0.5)]'
                            style={{
                                width: gridSize * CELL_SIZE,
                                height: gridSize * CELL_SIZE,
                            }}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {/* Food */}
                            <div
                                className='absolute bg-red-400 rounded-full transition-all duration-200 ease-in-out'
                                style={{
                                    width: CELL_SIZE - 2,
                                    height: CELL_SIZE - 2,
                                    left: food.x * CELL_SIZE,
                                    top: food.y * CELL_SIZE,
                                    boxShadow:
                                        '0 0 10px rgba(248, 113, 113, 0.8)',
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
                                            1 -
                                            (index / (snake.length + 5)) * 0.3,
                                        boxShadow:
                                            index === 0
                                                ? '0 0 8px rgba(248, 180, 255, 0.8)'
                                                : 'none',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Mobile controls */}
                        <div className='md:hidden w-[280px] mt-4'>
                            {/* Top row with up arrow */}
                            <div className='flex justify-center mb-4'>
                                <button
                                    onClick={() => {
                                        if (direction !== 'DOWN') {
                                            setDirection('UP');
                                            if (isPaused && !gameOver)
                                                setIsPaused(false);
                                        }
                                    }}
                                    className='p-6 bg-purple-700 text-white hover:bg-purple-600 rounded-lg border-2 border-purple-500 transition-colors shadow-lg hover:shadow-purple-500/20 active:transform active:scale-95 w-20 text-2xl'
                                >
                                    ⬆️
                                </button>
                            </div>

                            {/* Bottom row with left, down, right arrows */}
                            <div className='flex justify-center gap-4'>
                                <button
                                    onClick={() => {
                                        if (direction !== 'RIGHT') {
                                            setDirection('LEFT');
                                            if (isPaused && !gameOver)
                                                setIsPaused(false);
                                        }
                                    }}
                                    className='p-6 bg-purple-700 text-white hover:bg-purple-600 rounded-lg border-2 border-purple-500 transition-colors shadow-lg hover:shadow-purple-500/20 active:transform active:scale-95 w-20 text-2xl'
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
                                    className='p-6 bg-purple-700 text-white hover:bg-purple-600 rounded-lg border-2 border-purple-500 transition-colors shadow-lg hover:shadow-purple-500/20 active:transform active:scale-95 w-20 text-2xl'
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
                                    className='p-6 bg-purple-700 text-white hover:bg-purple-600 rounded-lg border-2 border-purple-500 transition-colors shadow-lg hover:shadow-purple-500/20 active:transform active:scale-95 w-20 text-2xl'
                                >
                                    ➡️
                                </button>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className='text-center text-sm text-purple-200 mt-2'>
                            <p className='md:hidden'>
                                Swipe or use buttons to control
                            </p>
                            <p className='hidden md:block'>
                                Use arrow keys to control
                            </p>
                        </div>

                        {/* Game state messages */}
                        {(gameOver || isPaused) && (
                            <div className='text-center mt-4'>
                                <div className='text-xl font-bold mb-2 text-white'>
                                    {gameOver
                                        ? 'Game Over!'
                                        : 'Swipe or press any arrow to start'}
                                </div>
                                {gameOver && (
                                    <button
                                        onClick={() => resetGame()}
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
        </div>
    );
};

export default SnakeGame;
