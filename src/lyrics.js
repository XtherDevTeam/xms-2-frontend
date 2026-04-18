import * as storage from './storage'
import { searchSongLyrics } from './lyricsProvider/qqmusic'

/**
 * Check if the lyrics for the given song are cached, if yes, return the lyrics, otherwise return null.
 * @param {*} title 
 * @param {*} album 
 * @param {*} artist 
 * @returns A promise, resolves to true if the lyrics are cached, false otherwise.
 */
function check_if_cached(title, album, artist) {
    return new Promise((resolve, reject) => {
        storage.inquireItem(`lyric_${title}_${album}_${artist}`, (r, v) => {
            if (r) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

function cache_lyric(title, album, artist, result) {
    storage.setItem(`lyric_${title}_${album}_${artist}`, result, () => { })
}

/**
 * Get the lyrics for the given song.
 * @param {*} title 
 * @param {*} album 
 * @param {*} artist 
 * @returns A promise, resolves to the lyrics if found, null otherwise.
 */
function get_lyric_for(title, album, artist) {
    console.log(`[LyricManager] Fetching lyrics for: ${title} / ${artist}`);
    return new Promise((resolve, reject) => {
        check_if_cached(title, album, artist).then(async (cached) => {
            if (cached) {
                storage.inquireItem(`lyric_${title}_${album}_${artist}`, (r, v) => {
                    // Check if the cached value is an empty object (polluted cache from previous bugs)
                    if (v?.lrc == null) {
                        console.log(`[LyricManager] Polluted cache detected for ${title}, re-fetching...`);
                        searchSongLyrics(title, album, artist).then(resolved => {
                            if (resolved) {
                                cache_lyric(title, album, artist, resolved);
                                resolve(resolved);
                            } else {
                                resolve(null);
                            }
                        });
                    } else {
                        console.log(`[LyricManager] Found cached lyrics for ${title}`);
                        console.log(v);
                        resolve(v);
                    }
                })
            } else {
                console.log(`[LyricManager] Searching lyrics for ${title} via API...`);
                let resolved = await searchSongLyrics(title, album, artist);
                if (resolved) {
                    console.log(`[LyricManager] Found and caching lyrics for ${title}`);
                    console.log(resolved);
                    cache_lyric(title, album, artist, resolved);
                    resolve(resolved);
                } else {
                    console.log(`[LyricManager] No lyrics found for ${title} via API`);
                    resolve(null);
                }
            }
        })
    })
}

const parse_lrc = (lrcString) => {
  if (typeof lrcString !== 'string') return [];
  const lines = lrcString.split('\n');
  const parsed = [];
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

  lines.forEach(line => {
    const match = timeRegex.exec(line);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = parseInt(match[3], 10);
      const time = minutes * 60 + seconds + milliseconds / (match[3].length === 3 ? 1000 : 100);
      const text = line.replace(timeRegex, '').trim();
      if (text) {
        parsed.push({ time, text });
      }
    }
  });

  return parsed.sort((a, b) => a.time - b.time);
};


function invalidate_lyric_cache(title, album, artist) {
    return new Promise((resolve) => {
        storage.removeItem(`lyric_${title}_${album}_${artist}`, (ok) => {
            get_lyric_for(title, album, artist).then(resolve);
        });
    });
}


export { get_lyric_for, parse_lrc, invalidate_lyric_cache, parse_lrc as parseLRC }