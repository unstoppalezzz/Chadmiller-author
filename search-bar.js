function handleSearch() {
    var input = document.getElementById('search-box').value.toLowerCase().trim();
    var pages = document.querySelectorAll('#pages li a');

    for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        var pageText = page.textContent.toLowerCase();

        if (pageText === input) {
            window.location.href = page.getAttribute('href');
            return;
        }
    }

    if (input === 'home') {
        window.location.href = 'index.html';
        return;
    }

    alert('Page not found!');
}

// Function to highlight matched text
// Function to highlight matched text
function highlightMatch(text, query) {
    var lowerText = text.toLowerCase();
    var lowerQuery = query.toLowerCase();
    var startIndex = lowerText.indexOf(lowerQuery);
    if (startIndex === -1) {
        return text;
    }
    var endIndex = startIndex + query.length;
    return text.substring(0, startIndex) +
        '<strong>' + text.substring(startIndex, endIndex) + '</strong>' +
        text.substring(endIndex);
}

// Function to show suggestions based on input
function showSuggestions() {
    var input = document.getElementById('search-box').value.toLowerCase().trim();
    var suggestionsBox = document.getElementById('suggestions');
    var pages = document.querySelectorAll('#pages li a');
    suggestionsBox.innerHTML = '';

    if (input === '') {
        suggestionsBox.style.display = 'none';
        return;
    }

    var suggestions = [];

    for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        var pageText = page.textContent.toLowerCase();

        if (pageText.includes(input)) {
            suggestions.push(page);
        }
    }

    if (suggestions.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }

    suggestions.forEach(function(page, index) {
        var suggestionDiv = document.createElement('div');
        suggestionDiv.className = 'suggestion-item';
        suggestionDiv.innerHTML = highlightMatch(page.textContent, input);
        suggestionDiv.tabIndex = 0;
        suggestionDiv.dataset.index = index;
        suggestionDiv.addEventListener('click', function() {
            document.getElementById('search-box').value = this.textContent;
            suggestionsBox.style.display = 'none';
        });
        suggestionDiv.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                document.getElementById('search-box').value = this.textContent;
                suggestionsBox.style.display = 'none';
            }
        });
        suggestionsBox.appendChild(suggestionDiv);
    });

    // Automatically select the first suggestion
    if (suggestions.length > 0) {
        suggestionsBox.children[0].classList.add('selected');
        suggestionsBox.style.display = 'block';
        suggestionsBox.children[0].scrollIntoView({
            block: 'nearest'
        });
    } else {
        suggestionsBox.style.display = 'none';
    }
}

// Function to handle arrow key navigation
function handleArrowKeys(event) {
    var suggestionsBox = document.getElementById('suggestions');
    var suggestionDivs = Array.from(suggestionsBox.children);
    var selectedDiv = suggestionsBox.querySelector('.selected');
    var currentIndex = selectedDiv ? suggestionDivs.indexOf(selectedDiv) : -1;

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (selectedDiv) {
            selectedDiv.classList.remove('selected');
            var nextIndex = (currentIndex + 1) % suggestionDivs.length;
            suggestionDivs[nextIndex].classList.add('selected');
            suggestionDivs[nextIndex].scrollIntoView({
                block: 'nearest'
            });
        } else if (suggestionDivs.length > 0) {
            suggestionDivs[0].classList.add('selected');
            suggestionDivs[0].scrollIntoView({
                block: 'nearest'
            });
        }
    }

    if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (selectedDiv) {
            selectedDiv.classList.remove('selected');
            var prevIndex = (currentIndex - 1 + suggestionDivs.length) % suggestionDivs.length;
            suggestionDivs[prevIndex].classList.add('selected');
            suggestionDivs[prevIndex].scrollIntoView({
                block: 'nearest'
            });
        } else if (suggestionDivs.length > 0) {
            suggestionDivs[suggestionDivs.length - 1].classList.add('selected');
            suggestionDivs[suggestionDivs.length - 1].scrollIntoView({
                block: 'nearest'
            });
        }
    }

    if (event.key === 'Tab') {
        var selectedSuggestion = suggestionsBox.querySelector('.selected');
        if (selectedSuggestion) {
            event.preventDefault();
            document.getElementById('search-box').value = selectedSuggestion.textContent;
            suggestionsBox.style.display = 'none';
        } else if (suggestionDivs.length > 0) {
            event.preventDefault();
            document.getElementById('search-box').value = suggestionDivs[0].textContent;
            suggestionsBox.style.display = 'none';
        }
    }
}

// Add event listeners
document.getElementById('search-box').addEventListener('input', showSuggestions);
document.getElementById('search-box').addEventListener('keydown', handleArrowKeys);
document.getElementById('search-icon').addEventListener('click', handleSearch);
document.getElementById('search-box').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch();
    }
});