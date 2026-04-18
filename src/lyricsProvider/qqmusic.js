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
    console.error("[LyricProvider] Error searching lyrics:", error);
    return null;
  }
};
