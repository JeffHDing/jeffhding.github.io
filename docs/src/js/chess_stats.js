// src/chess-stats.js
document.addEventListener("DOMContentLoaded", function() {
  
  // --- CONFIGURATION ---
  const myUsername = "Jun-Ding"; 
  
  // --- CONSTANTS ---
  const statsUrl = `https://api.chess.com/pub/player/${myUsername}/stats`;
  const profileUrl = `https://api.chess.com/pub/player/${myUsername}`; // <--- This was missing before!
  
  // 1. UPDATE CHALLENGE BUTTON
  const challengeLink = document.getElementById("challenge-link");
  if (challengeLink) {
    challengeLink.href = `https://www.chess.com/play/online/new?opponent=${myUsername}`;
    challengeLink.innerText = `Challenge ${myUsername}`;
  }

  // 2. FETCH PROFILE (Get Real Name)
  fetch(profileUrl)
    .then(response => response.json())
    .then(data => {
      console.log("Profile Data:", data);
      
      // Use 'name' (Real Name) if available, otherwise 'username'
      const realName = data.name || data.username;
      
      const nameElement = document.getElementById("chess-username");
      if (nameElement) {
        nameElement.innerText = realName;
      } else {
        console.warn("Could not find element with id='chess-username'");
      }
    })
    .catch(err => console.error("Failed to fetch profile:", err));
  
  // 3. FETCH STATS (Get Ratings)
  fetch(statsUrl)
    .then(response => response.json())
    .then(data => {
      console.log("Stats Data:", data); 

      const getRating = (category) => {
        return data[category]?.last?.rating || data[category]?.best?.rating || "Unrated";
      };

      const updateText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
      };

      updateText("rapid-rating", getRating("chess_rapid"));
      updateText("blitz-rating", getRating("chess_blitz"));
      updateText("bullet-rating", getRating("chess_bullet"));
      updateText("puzzle-score", data.puzzle_rush?.best?.score || "N/A");
      
    })
    .catch(err => console.error("Failed to fetch chess stats:", err));
});