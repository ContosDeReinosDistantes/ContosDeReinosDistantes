/*-------------------------------------------------------------*/
/*           Contos de Reinos Distantes                        */
/*-------------------------------------------------------------*/

class sceneMenuPrincipal extends Phaser.Scene {
  constructor() {
    super({ key: "sceneMenuPrincipal" });
  }

  init() {}

  preload() {
    this.load.image("bg", "../../resources/style/images/jogo/bgmenu.png");
  }

  create() {
    this.bg = this.add.image(game.width, game.height, "bg").setOrigin(0, 0);

    this.input.manager.enabled = true;

    const ButtonB = this.add.text(280, 270, "Jogar", {
      fontSize: "50px",
      fill: "#3333ff",
      fontFamily: "pixel font"
    });
    ButtonB.setInteractive();

    ButtonB.on(
      "pointerdown",
      function() {
        console.log("From SceneC to SceneA");
        this.scene.start("sceneMain");
      },
      this
    );

    const ButtonC = this.add.text(620, 270, "Ranking", {
      fontSize: "50px",
      fill: "#3333ff",
      fontFamily: "pixel font"
    });
    ButtonC.setInteractive();

    ButtonC.on(
      "pointerdown",
      function() {
        this.scene.start("sceneMain");
      },
      this
    );
  }

  update() {}
}

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "sceneMain" });
  }

  init() {}

  preload() {
    var barraCarregamento = this.add.graphics();

    this.load.image("logo", "../../resources/style/images/jogo/test.jpg");
    for (var i = 0; i < 500; i++) {
      this.load.image("logo" + i, "../../resources/style/images/jogo/test.jpg");
    }

    this.load.on("progress", function(value) {
      console.log(value);
      barraCarregamento.clear();
      barraCarregamento.fillStyle(0x37ac26, 1);
      barraCarregamento.fillRect(320, 280, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + "%");
    });

    this.load.on("fileprogress", function(file) {
      console.log(file.src);
    });

    this.load.on("complete", function() {
      console.log("complete");
      barraCarregamento.destroy();

      textoCarregando.destroy();
      percentText.destroy();
    });

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var textoCarregando = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Carregando...",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    textoCarregando.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    percentText.setOrigin(0.5, 0.5);
  }

  create() {
    var logo = this.add.image(400, 300, "logo");
  }

  update() {}
}

var config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  scene: [sceneMenuPrincipal, SceneMain]
};

var game = new Phaser.Game(config);
