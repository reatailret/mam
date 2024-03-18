declare module 'canvas-confetti';

//

/*export declare var GameServer = {
	Schema,
	Player
}*/
//export * from '@colyseus/schema';
//import {Player as PlayerSchema } from './../milkywaystd/app/cardgames/server/src/classes/common/Player';
declare namespace GameServer {

	
	
    
    export type ArrayShema = import('@colyseus/schema').ArraySchema;
	export type Shema = import('@colyseus/schema').Schema;
	export type Card = import('./../milkywaystd/app/cardgames/server/src/classes/common/Card').Card
	export type PlayerSchema = import('./../milkywaystd/app/cardgames/server/src/classes/common/Player').Player;
	export type Player = Omit<PlayerSchema, keyof Shema>
	export type AziGameState = import('./../milkywaystd/app/cardgames/server/src/classes/states/Azi/AziGameState').AziGameState;
	export type AziRoomMetadata  = import('./../milkywaystd/app/cardgames/server/src/classes/rooms/azi/AziRoomMetadata').AziRoomMetadata;
}



/*declare namespace Colyseus {
	export type Client = import('colyseus.js').Client;
	export type Room<State> = import('colyseus.js').Room<State>;
}*/
