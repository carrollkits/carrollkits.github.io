// Language Selector Functionality
$(document).ready(function() {
    // Function to update URL with language parameter
    function updateURL(language) {
        var url = new URL(window.location.href);
        url.searchParams.set('lang', language);
        window.history.pushState({path: url.href}, '', url.href);
    }

// Function to get language from URL parameter or default to "en" if invalid
function getLanguageFromURL() {
    var params = new URLSearchParams(window.location.search);
    var lang = params.get('lang') || 'en';
    // Check if the language is not in the list of valid languages, otherwise default to 'en'
    if (!['en', 'es'].includes(lang)) {
        lang = 'en';
        updateURL(lang); // Update URL with valid language
    }
    return lang;
}

// Function to show only elements corresponding to selected language
function showSelectedLanguage(lang) {
    $('[lang]').hide(); // Hide all elements with lang attribute
    $('[lang="' + lang + '"]').show(); // Show only elements corresponding to selected language
}

// Handle click event on links with class "lang-link"
$('.lang-link').click(function(event) {
    event.preventDefault(); // Prevent the default link behavior
    var lang = $('#lang-switch').val(); // Get current language selection
    var nextPageURL = $(this).attr('href') + '?lang=' + lang; // Construct URL with language parameter
    // Redirect to the next page
    window.location.href = nextPageURL;
});

// Set selected language on page load
var langFromURL = getLanguageFromURL();
$('#lang-switch').val(langFromURL);

// Show only elements corresponding to selected language on page load
showSelectedLanguage(langFromURL);

// Handle change event on language selector
$('#lang-switch').change(function() {
    var lang = $(this).val();
    updateURL(lang); // Update URL with selected language
    showSelectedLanguage(lang); // Show only elements corresponding to selected language
});
});
