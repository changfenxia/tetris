<script>
    import { fade } from 'svelte/transition';
    import { STATHAM_QUOTES, STATHAM_IMAGES } from '../constants';
    
    export let show = false;
    
    let currentQuote = '';
    let currentImage = '';
    
    $: if (show) {
        currentQuote = STATHAM_QUOTES[Math.floor(Math.random() * STATHAM_QUOTES.length)];
        currentImage = STATHAM_IMAGES[Math.floor(Math.random() * STATHAM_IMAGES.length)];
    }
</script>

<div class="effect-container" class:visible={show}>
    {#if show}
        <div class="effect-content" transition:fade={{ duration: 300 }}>
            <img src={currentImage} alt="Jason Statham" class="statham-image" />
            <p class="quote">{currentQuote}</p>
        </div>
    {/if}
</div>

<style>
    .effect-container {
        width: 300px;
        padding: 20px;
        background-color: #2a2a2a;
        border-radius: 10px;
        margin-right: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .effect-container.visible {
        opacity: 1;
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
    }

    .quote {
        font-size: 1.2em;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        margin: 0;
        line-height: 1.4;
    }
</style>
