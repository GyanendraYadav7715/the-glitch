import { load } from 'cheerio';

const extractAnimeTooltip = (html) => {
  const $ = load(html);
  
  const response = [];
  
  $('.pre-qtip-content').each((i, element) => {
    const obj = {
      title: null,
      rating: null,
      quality: null,
      subCount: null,
      dubCount: null,
      type: null,
      description: null,
      japaneseTitle: null,
      aired: null,
      status: null,
      genres: [],
      id: null,
      watchUrl: null,
    };

    const el = $(element);
    
    // Title
    obj.title = el.find('.pre-qtip-title').text().trim() || null;
    
    // Rating
    const ratingText = el.find('.pqd-li .fas.fa-star').parent().text().trim();
    obj.rating = ratingText ? parseFloat(ratingText) : null;
    
    // Quality (SD/HD/FHD)
    obj.quality = el.find('.tick-quality').text().trim() || null;
    
    // Sub count
    const subText = el.find('.tick-sub').text().trim();
    obj.subCount = subText ? parseInt(subText) : null;
    
    // Dub count
    const dubText = el.find('.tick-dub').text().trim();
    obj.dubCount = dubText ? parseInt(dubText) : null;
    
    // Type (TV/Movie/OVA)
    obj.type = el.find('.badge-quality').text().trim() || null;
    
    // Description
    obj.description = el.find('.pre-qtip-description').text().trim() || null;
    
    // Japanese title
    el.find('.pre-qtip-line').each((j, line) => {
      const lineEl = $(line);
      const label = lineEl.find('.stick').text().trim();
      const value = lineEl.find('.stick-text').text().trim();
      
      if (label === 'Japanese:') {
        obj.japaneseTitle = value || null;
      } else if (label === 'Aired:') {
        obj.aired = value || null;
      } else if (label === 'Status:') {
        obj.status = value || null;
      }
    });
    
    // Genres
    el.find('.pre-qtip-line').last().find('a').each((j, genreLink) => {
      const genre = $(genreLink).text().trim();
      if (genre) {
        obj.genres.push(genre);
      }
    });
    
    // Watch URL and ID
    const watchUrl = el.find('.btn-play').attr('href');
    if (watchUrl) {
      obj.watchUrl = watchUrl;
      obj.id = watchUrl.replace('/watch/', '').replace('/', '') || null;
    }
    
    // Movie ID from watchlist button
    const movieId = el.find('.wl-item').first().attr('data-movieid');
    if (movieId && !obj.id) {
      obj.id = movieId;
    }
    
    response.push(obj);
  });
  
  return response;
};

export default extractAnimeTooltip;