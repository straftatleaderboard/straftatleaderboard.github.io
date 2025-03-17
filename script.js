function renderLeaderboard(data) {
  const tbody = document.querySelector('#leaderboard tbody');

  data.sort((a, b) => a.rank - b.rank);
  data.forEach(entry => {
    const row = document.createElement('tr');

    const rankCell = document.createElement('td');
    rankCell.textContent = entry.rank;
    row.appendChild(rankCell);

    const steamCell = document.createElement('td');
    const link = document.createElement('a');
    link.href = entry.profileLink;
    link.target = "_blank";
    link.textContent = entry.steamID;
    steamCell.appendChild(link);
    row.appendChild(steamCell);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = entry.score;
    row.appendChild(scoreCell);

    tbody.appendChild(row);
  });
}

fetch('leaderboard.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    document.getElementById('loader').style.display = 'none';
    renderLeaderboard(data);
    document.getElementById('leaderboard').style.display = 'table';
  })
  .catch(error => {
    document.getElementById('loader').style.display = 'none';
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = 'Error fetching leaderboard data: ' + error.message;
    errorDiv.style.display = 'block';
    console.error('Error fetching data:', error);
  });
