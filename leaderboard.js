function updateLeaderboard(score) {
  const leaderboardOl = document.querySelector('.leaderboard ol');
  const leaderboardItems = leaderboardOl.querySelectorAll('li');

  const newScore = {
    name: prompt('Please enter your name:'), // Prompt the player to enter their name
    score: parseInt(score)
  };

  const scores = [];
  leaderboardItems.forEach(item => {
    const name = item.querySelector('.player-name').textContent;
    const score = parseInt(item.querySelector('.score').textContent);
    scores.push({ name, score });
  });
  scores.push(newScore);

  scores.sort((a, b) => b.score - a.score);

  leaderboardOl.innerHTML = scores.slice(0, 10).map((score, index) => `<li>
    <mark class="player-name">${score.name}</mark>
    <span class="score">${score.score}</span>
  </li>`).join('');

  // Save the scores to session storage
  sessionStorage.setItem('leaderboardScores', JSON.stringify(scores));
}

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const score = urlParams.get('score');
  if (score) {
    updateLeaderboard(score);
  }

  // Load scores from session storage
  const storedScores = sessionStorage.getItem('leaderboardScores');
  if (storedScores) {
    const scores = JSON.parse(storedScores);
    leaderboardOl.innerHTML = scores.slice(0, 10).map((score, index) => `<li>
      <mark class="player-name">${score.name}</mark>
      <span class="score">${score.score}</span>
    </li>`).join('');
  }
});
