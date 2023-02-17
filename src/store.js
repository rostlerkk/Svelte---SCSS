import { writable } from 'svelte/store';

export const title = writable(0);

export const menu_items = writable([]);

export const active_menu_item = writable("home");

