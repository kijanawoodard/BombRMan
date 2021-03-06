(function($, window) {
    window.Game.Renderer = function(assetManager) {
        this.assetManager = assetManager;
        this.ticks = 0;
    };

    window.Game.Renderer.prototype = {
        draw : function(game, context) {
            this.ticks++;

            // Draw the map 
            for(var i = 0; i < game.map.width; ++i) {
                for(var j = 0; j < game.map.height; ++j) {
                    switch(game.map.get(i, j)) {
                        case game.types.GRASS:
                            context.fillStyle = '#458B00';
                            break;
                        case game.types.WALL:
                            context.fillStyle = '#bebebe';
                            break;
                        case game.types.BRICK:
                            context.fillStyle = '#cecece';
                            break;
                    }

                    context.fillRect(i * game.map.tileSize, j * game.map.tileSize, game.map.tileSize, game.map.tileSize);
                }
            }
            
            for(var i = 0; i < game.sprites.length; ++i) {
                var sprite = game.sprites[i];
                switch(sprite.type) {
                    case window.Game.Sprites.EXPLOSION:
                        context.fillStyle = 'yellow';
                        context.fillRect(sprite.x * game.map.tileSize, sprite.y * game.map.tileSize, game.map.tileSize, game.map.tileSize);
                        break;
                    case window.Game.Sprites.BOMB:
                        context.fillStyle = '#000';
                        context.beginPath();
                        context.arc(sprite.x * game.map.tileSize + (game.map.tileSize * 0.5), 
                                    sprite.y * game.map.tileSize + (game.map.tileSize * 0.5), 
                                    0.45 * game.map.tileSize, 0, 2 * Math.PI, false);
                        context.fill();
                        break;
                    case window.Game.Sprites.BOMBER:
                        var metadata = this.assetManager.getMetadata(sprite);
                            frame = metadata.frames[sprite.direction][sprite.activeFrameIndex],
                            x = sprite.discreteX / 100,
                            y = sprite.discreteY / 100;
                        
                        // Bounding Box
                        context.fillStyle = 'orange';
                        context.fillRect(sprite.x * game.map.tileSize, sprite.y * game.map.tileSize, game.map.tileSize, game.map.tileSize);

                        // Effective Box
                        context.fillStyle = 'red';
                        context.fillRect(sprite.effectiveX * game.map.tileSize, sprite.effectiveY * game.map.tileSize, game.map.tileSize, game.map.tileSize);

                        context.drawImage(metadata.image, 
                                          frame.x, 
                                          frame.y, 
                                          metadata.width, 
                                          metadata.height, 
                                          x * game.map.tileSize, 
                                          (y * game.map.tileSize) - (0.9 * game.map.tileSize), 
                                          metadata.width * 1.5, 
                                          metadata.height * 1.5);
                        break;
                    case window.Game.Sprites.POWERUP:
                        context.fillStyle = 'orange';
                        context.fillRect(sprite.x * game.map.tileSize, sprite.y * game.map.tileSize, game.map.tileSize, game.map.tileSize);
                        break;
                }
            }
        }
    };

})(jQuery, window);