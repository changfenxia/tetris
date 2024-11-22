<script>
    import { fade } from 'svelte/transition';
    import { STATHAM_QUOTES, STATHAM_IMAGES } from '../constants';
    
    export let show = false;
    
    let currentQuote = '';
    let currentImage = '';
    let hideTimeout;
    let effectKey = 0;  // Key для принудительного пересоздания компонента
    
    function showEffect() {
        // Выбираем случайную цитату и изображение
        currentQuote = STATHAM_QUOTES[Math.floor(Math.random() * STATHAM_QUOTES.length)];
        currentImage = STATHAM_IMAGES[Math.floor(Math.random() * STATHAM_IMAGES.length)];
        effectKey += 1;  // Увеличиваем ключ для пересоздания эффекта
        
        // Устанавливаем таймер на скрытие
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            show = false;
        }, 2000);
    }
    
    $: if (show) {
        showEffect();
    }
    
    // Очищаем таймер при уничтожении компонента
    import { onDestroy } from 'svelte';
    onDestroy(() => {
        if (hideTimeout) clearTimeout(hideTimeout);
    });
</script>

{#if show}
    <div class="effect-container" transition:fade={{ duration: 300 }}>
        <div class="effect-content" key={effectKey}>
            <img 
                src={currentImage} 
                alt="Jason Statham" 
                class="statham-image"
                on:error={(e) => e.target.style.display = 'none'}
            />
            <p class="quote">{currentQuote}</p>
        </div>
    </div>
{/if}

<style>
    .effect-container {
        width: 300px;
        padding: 20px;
        background-color: rgba(42, 42, 42, 0.95);
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .effect-content {
        text-align: center;
        color: white;
    }

    .statham-image {
        width: 100%;
        border: 5px solid white;
        border-radius: 10px;
        margin-bottom: 20px;
        object-fit: cover;
        aspect-ratio: 1;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .quote {
        font-size: 1.2em;
        font-weight: bold;
        margin: 0;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        padding: 0 10px;
    }
</style>
