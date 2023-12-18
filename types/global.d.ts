declare module 'canvas-confetti';

declare namespace GameServer {
    
    type Shema = import('@colyseus/schema').Schema;
	type PlayerSchema = import('./../milkywaystd/app/cardgames/server/src/classes/common/Player').Player;
	export type Player = Omit<PlayerSchema, keyof Shema>
	export type AziGameState = import('./../milkywaystd/app/cardgames/server/src/classes/states/Azi/AziGameState').AziGameState;
}

declare namespace Colyseus {
	export type Client = import('colyseus.js').Client;
	export type Room<State> = import('colyseus.js').Room<State>;
}
