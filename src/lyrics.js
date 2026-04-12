import axios from 'axios';

const LYRICS_BASE_URL = '/lyric';

export const searchSongLyrics = async (title, album, artist) => {
  try {
    const query = `${title} ${album} ${artist}`;
    const searchResponse = await axios.get(`${LYRICS_BASE_URL}/v2/music/tencent/search/song`, {
      params: { word: query, num: 1 }
    });

    if (searchResponse.data.code === 200 && searchResponse.data.data.length > 0) {
      const bestMatch = searchResponse.data.data[0];
      const lyricResponse = await axios.get(`${LYRICS_BASE_URL}/v2/music/tencent/lyric`, {
        params: { mid: bestMatch.mid }
      });

      if (lyricResponse.data.code === 200) {
        return lyricResponse.data.data;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const parseLRC = (lrcString) => {
  if (!lrcString) return [];
  const lines = lrcString.split('\n');
  const result = [];
  const timeExp = /\[(\d{2,3}):(\d{2}(?:\.\d{2,3})?)\]/g;

  lines.forEach(line => {
    const content = line.replace(timeExp, '').trim();
    let match;
    timeExp.lastIndex = 0; // Reset regex
    while ((match = timeExp.exec(line)) !== null) {
      const minutes = parseInt(match[1]);
      const seconds = parseFloat(match[2]);
      const time = minutes * 60 + seconds;
      result.push({ time, text: content });
    }
  });

  return result.sort((a, b) => a.time - b.time);
};