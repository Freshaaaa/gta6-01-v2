// Solmar Bay: Heatwave — save / load through localStorage. Saves the
// player's cash, reputation, turf, collectibles, weapons, health, ammo,
// wanted heat, position, mission progress and the clock, so a session can
// be continued from the title screen. Nothing leaves the browser.

import { SAVE_KEY } from './config.js';

export function saveGame(state) {
  try {
    const data = {
      version: 2,
      money: state.money,
      rep: state.rep,
      turf: state.turf,
      coins: state.coinsCollected,
      weapon: state.weapon,
      weaponsOwned: state.weaponsOwned,
      health: state.player.health,
      ammo: state.ammo,
      wantedHeat: state.wantedHeat,
      x: state.player.x,
      y: state.player.y,
      clockMinutes: state.clockMinutes,
      missionIndex: state.missionIndex,
      missionsDone: state.stats.missionsDone,
      kills: state.stats.kills,
      carsStolen: state.stats.carsStolen,
      taxiDone: state.stats.taxiDone,
      racesWon: state.stats.racesWon,
      savedAt: Date.now(),
    };
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function loadSave() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.version !== 2) return null;
    return data;
  } catch {
    return null;
  }
}

export function hasSave() {
  return loadSave() !== null;
}

export function clearSave() {
  try { window.localStorage.removeItem(SAVE_KEY); } catch { /* storage off */ }
}
