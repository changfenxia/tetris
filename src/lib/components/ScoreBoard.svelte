<script>
    export let score = 0;
    export let level = 1;
    export let lines = 0;
</script>

<div class="score-board">
    <div class="score-item">
        <h3>Score</h3>
        <p>{score}</p>
    </div>
    <div class="score-item">
        <h3>Level</h3>
        <p>{level}</p>
    </div>
    <div class="score-item">
        <h3>Lines</h3>
        <p>{lines}</p>
    </div>
</div>

<style>
    .score-board {
        border: 2px solid #333;
        padding: 10px;
        background-color: #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .score-item {
        text-align: center;
    }

    h3 {
        margin: 0;
        color: #333;
    }

    p {
        margin: 5px 0;
        font-size: 1.5em;
        font-weight: bold;
        color: #000;
    }
</style>
