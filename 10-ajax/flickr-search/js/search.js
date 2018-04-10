const searchFlickr = function (term) {
  console.log('Searching Flickr for', term);

  // We haven't discussed jsconcallback yet.
  const flickrURL = 'https://api.flickr.com/services/rest?jsoncallback=?';

  // Not really AJAX
  $.getJSON(flickrURL, {
    method: 'flickr.photos.search',
    api_key: '2f5ac274ecfac5a455f38745704ad084', // public
    text: term,
    format: 'json'
  }).done(showImages);
};

const showImages = function (results) {
  const generateURL = function (p) {
    return [
      'http://farm',
      p.farm,
      '.static.flickr.com/',
      p.server,
      '/',
      p.id,
      '_',
      p.secret,
      '_q.jpg' // Change "q" to something else for different sizes
    ].join('');
  };

  console.log( results );

  results.photos.photo.forEach(function (photo) {
    const thumbnailURL = generateURL(photo);
    const $img = $('<img />', {src: thumbnailURL}); // .attr('src', thumbnailURL)
    $img.appendTo('#images'); // Alternatively $('#images').append($img);
  });
};

$(document).ready(function () {
  $('#search').on('submit', function (event) {
    event.preventDefault();
    const query = $('#query').val();
    searchFlickr( query );
  });

  $(window).on('scroll', function () {
    const documentHeight = $(document).height();
    const windowHeight = $(window).height();
    const scrollTop = $(document).scrollTop();

    const scrollBottom = documentHeight - (windowHeight + scrollTop);

    if (scrollBottom < 500) { // Tweak this value
      const query = $('#query').val();
      searchFlickr( query ); // Don't make too requests: throttle
    }
  });
});

/*

TODO:

throttle the requests -- don't make too many requests
pagination -- eventually we should all possible matching results
stop at end of the results -- no more requests
bonus: whatever you like
*/
