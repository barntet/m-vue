export const game = new PIXI.Application({
  width: 500,
  height: 500,
});
console.log('game',game)

document.body.append(game.view);

export function createRootRenderer() {
  return game.stage;
}
