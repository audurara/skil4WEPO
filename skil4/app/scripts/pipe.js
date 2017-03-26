window.Pipe = (function() {
	'use strict';

    var WIDTH = 15;
	var posX = 100;
    var random2;
    var SPEED = 20;
	var scoredPoint = false;

	var Pipe = function(el, game, number) {

		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.number = number;
        this.player = game.player;
        this.random2 = (Math.floor(Math.random() * 20)) - 50;
	};

	Pipe.prototype.reset = function() {

        this.player.score = 0;
        var random2 = (Math.floor(Math.random() * 20)) - 50;

		if(this.number === 1){
            this.pos.x = posX;
		}
		else if(this.number === 2) {
            this.pos.x = posX + 50;
		}
		this.pos.y = random2;

		scoredPoint = false;
	};

	Pipe.prototype.onFrame = function(delta, gameStarted) {
        gameStarted = true;
		this.pos.x -= delta * SPEED;
	
		if(this.pos.x < -WIDTH){
            this.pos.x = posX;
            this.pos.y = random2;

			scoredPoint= false;
		}
		this.checkCollisionWithBounds();

        if(!scoredPoint) {
            if((this.pos.x + WIDTH / 2) < this.player.pos.x){
                scoredPoint = true;
                this.player.score += 1;
            }
		}
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe.prototype.checkCollisionWithBounds = function() {

        if(this.player.pos.x +5 > this.pos.x){
            if(this.player.pos.x < (this.pos.x + WIDTH)){
                if((this.player.pos.y +5 >(this.pos.y + 40 + 25))||this.player.pos.y < (this.pos.y + 40)){
                    console.log(this.player.score);
                    return this.game.gameover();
                }
            }
        }
	};
	return Pipe;

})();