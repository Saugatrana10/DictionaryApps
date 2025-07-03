    async function getDefinition() {
      const word = document.getElementById("wordInput").value.trim();
      const resultDiv = document.getElementById("result");
      if (!word) {
        return resultDiv.textContent = "Please type a word.";
      }

      resultDiv.textContent = "Searching…";

      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!res.ok) throw new Error("Word not found.");
        const data = await res.json();

        const meaning = data[0].meanings[0];
        const defObj = meaning.definitions[0];

        resultDiv.innerHTML = `
          <h2>${data[0].word}</h2>
          <p><em>${meaning.partOfSpeech}</em></p>
          <p><strong>Definition:</strong>${defObj.definition}</p>
          ${defObj.example ? `<p><strong>Example:</strong> ${defObj.example}</p>` : ''}
          
          <p><a href="${data[0].sourceUrls[0]}" target="_blank">Read more</a></p>
        `;
      } catch (e) {
        resultDiv.textContent = e.message || "Error occurred.";
      }
        }