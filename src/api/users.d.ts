// src/api/users.d.ts

// Function to handle likes
export function handleLikes(userId: string, id: string): Promise<number[]>;
export function handleLikes(siteId: string, id: string): Promise<number[]>;

// Function to handle "beenTo"
export function handleBeenTo(userId: string, id: string): Promise<number[]>;
