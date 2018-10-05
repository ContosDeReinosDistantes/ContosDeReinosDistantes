$(document).ready(function() {
  carregaModais();
  $("#quartoTaverneiro").css("filter", "brightness(50%)");
  $("#paredeQuartoT").css("filter", "brightness(50%)");
  $("#balcao").css("pointer-events", "none");
  $(".sairBtn").hover(
    function() {
      $(this).attr("src", "../../resources/style/images/estatico/xHover.png");
    },
    function() {
      $(this).attr("src", "../../resources/style/images/estatico/x.png");
    }
  );

  //Detecta o navegador e renderiza as imagens de maneira adequada a cada navegador
  var ua = detect.parse(navigator.userAgent);

  if (ua.browser.family == "Chrome") {
    $("html").css("image-rendering", "pixelated");
  } else if (ua.browser.family == "Firefox") {
    $("html").css("image-rendering", "-moz-crisp-edges");
  } else {
    alert(
      "Infelizmente o navegador " +
        ua.browser.family +
        " não é suportado por nossa aplicação. Lamentamos o inconveninete ( ; _ ; ). Atualmente, somente o Chrome e Firefox são suportados."
    );
  }
});

$(document).keydown(function(event) {
  if (
    event.ctrlKey == true &&
    (event.which == "61" ||
      event.which == "107" ||
      event.which == "173" ||
      event.which == "109" ||
      event.which == "187" ||
      event.which == "189")
  ) {
    event.preventDefault();
  }
});

$(window).bind("mousewheel DOMMouseScroll", function(event) {
  /*Desabilita o zoom*/
  if (event.ctrlKey == true) {
    event.preventDefault();
  }
});

function abrirModal(i) {
  $("#taberna").css("filter", "brightness(50%)");
  $("#paredeQuartos").css("filter", "brightness(50%)");
  $("#taberna").css("pointer-events", "none");
  $("#portaQuarto").css("pointer-events", "none");

  if (i == 1) {
    $("#containerModaisTaverneiro").show();
    $("#intTaverneiro").show();
    $("#taverneiro").show();
  }
  if (i == 2) {
    $("#containerModaisBardo").show();
    $("#intBardo").show();
    $("#bardo").show();
  }
  if (i == 3) {
    $("ranking").show();
  }
  if (i == 4) {
    $("#avisos").show();
  }
  if (i == 5) {
    $("#alterarDados").show();
  }
  if (i == 6) {
    $("#rankingPessoal").show();
  }
  carregaModais(i);
}

function carregaModais(i) {
  $("#jogoT").hide();
  $("#projetoT").hide();
  $("#equipeT").hide();
  $("#reinosB").hide();
  $("#guerraB").hide();
  $("#criaturasB").hide();

  /*     Taverneiro      */
  if (i == 1) {
    /* Sair */
    $(".sairBtn").click(function() {
      $("#intTaverneiro").hide();
      $("#taverneiro").hide();
      $("#jogoT").hide();
      $("#projetoT").hide();
      $("#equipeT").hide();
      $("#containerModaisTaverneiro").hide();
      $("#taberna").css("pointer-events", "auto");
      $("#portaQuarto").css("pointer-events", "auto");
      $("#taberna").css("filter", "brightness(100%)");
    });

    /* Jogo */
    $("#jogoT").hide();
    $(".jogoTBtn").click(function() {
      $("#taverneiro").hide();
      $("#projetoT").hide();
      $("#equipeT").hide();
      $("#jogoT").show();
    });

    /* Projeto */
    $("#projetoT").hide();
    $(".projetoTBtn").click(function() {
      $("#taverneiro").hide();
      $("#jogoT").hide();
      $("#equipeT").hide();
      $("#projetoT").show();
    });

    /* Equipe */
    $("#equipeT").hide();
    $(".equipeTBtn").click(function() {
      $("#taverneiro").hide();
      $("#projetoT").hide();
      $("#jogoT").hide();
      $("#equipeT").show();
    });
  }
  /*     Bardo      */
  if (i == 2) {
    /* Sair */
    $(".sairBtn").click(function() {
      $("#intBardo").hide();
      $("#bardo").hide();
      $("#reinosB").hide();
      $("#guerraB").hide();
      $("#criaturasB").hide();
      $("#containerModaisBardo").hide();
      $("#taberna").css("pointer-events", "auto");
      $("#portaQuarto").css("pointer-events", "auto");
      $("#taberna").css("filter", "brightness(100%)");
    });

    /* Reinos */
    $("#reinosB").hide();
    $(".reinosBBtn").click(function() {
      $("#bardo").hide();
      $("#guerraB").hide();
      $("#criaturasB").hide();
      $("#reinosB").show();
    });

    /* Guerra */
    $("#guerraB").hide();
    $(".guerraBBtn").click(function() {
      $("#bardo").hide();
      $("#reinosB").hide();
      $("#criaturasB").hide();
      $("#guerraB").show();
    });

    /* Criaturas Sombrias */
    $("#criaturasB").hide();
    $(".criaturasBBtn").click(function() {
      $("#bardo").hide();
      $("#reinosB").hide();
      $("#guerraB").hide();
      $("#criaturasB").show();
    });
  }
  if (i == 3) {
    $("#ranking").show();
    $(".sairBtn").click(function() {
      $("#ranking").hide();
      $("#taberna").css("pointer-events", "auto");
      $("#portaQuarto").css("pointer-events", "auto");
      $("#taberna").css("filter", "brightness(100%)");
    });
  }
  if (i == 4) {
    $("#avisos").show();
    $(".sairBtn").click(function() {
      $("#avisos").hide();
      $("#taberna").css("pointer-events", "auto");
      $("#portaQuarto").css("pointer-events", "auto");
      $("#taberna").css("filter", "brightness(100%)");
    });
  }
  /*     Alterar Dados      */
  if (i == 5) {
    $("#alterarDados").show();
    $(".sairBtn").click(function() {
      $("#alterarDados").hide();
      $("#taberna").css("pointer-events", "auto");
      $("#portaQuarto").css("pointer-events", "auto");
      $("#taberna").css("filter", "brightness(100%)");
    });
  }
  if (i == 6) {
    $("#rankingPessoal").show();
    $(".sairBtn").click(function() {
      $("#rankingPessoal").hide();
      $("#taberna").css("pointer-events", "auto");
      $("#portaQuarto").css("pointer-events", "auto");
      $("#taberna").css("filter", "brightness(100%)");
    });
  }
}

function abrirQuartos() {
  $("#bodyTaberna").animate({ bottom: "4px" });
  $("#portaQuarto").attr("onclick", "fecharQuartos()");
  $("#pisoTaberna").css("filter", "brightness(50%)");
  $("#pisoTaberna").css("pointer-events", "none");
  $("#paredeSuperior").css("pointer-events", "none");
  $("#paredeSuperior").css("filter", "brightness(50%)");
  $("#divisoria").css("filter", "brightness(50%)");
  $("#portaQuarto").css("filter", "brightness(150%)");
  $("#portaQuarto").css("pointer-events", "auto");
  $("#quarto").css("filter", "brightness(100%)");
  $("#paredeQuarto").css("filter", "brightness(100%)");
}
function fecharQuartos() {
  $("#bodyTaberna").animate({ bottom: "378px" });
  $("#portaQuarto").attr("onclick", "abrirQuartos()");
  $("#pisoTaberna").css("filter", "brightness(100%)");
  $("#paredeInferior").css("filter", "brightness(100%)");
  $("#pisoTaberna").css("pointer-events", "auto");
  $("#paredeSuperior").css("pointer-events", "auto");
  $("#paredeSuperior").css("filter", "brightness(100%)");
  $("#portaQuarto").css("filter", "brightness(100%)");
  $("#quarto").css("filter", "brightness(50%)");
  $("#paredeQuarto").css("filter", "brightness(50%)");
}

function validaMinhaConta() {
  var conf = false;
  if ($("input[name=txtaltnome]").val() != "") {
    if ($("input[name=txtalteemail]").val() != "") {
      if ($("input[name=dtealtnascimento]").val() != "") {
        if ($("input[name=txtaltlogger]").val() != "") {
          if ($("input[name=pwdaltsenhaantiga]").val() != "") {
            if ($("input[name=pwdaltsenhanova]").val() != "") {
              if ($("input[name=pwdaltconfsenha]").val() != "") {
                if (
                  $("input[name=pwdaltsenhanova]").val() ==
                  $("input[name=pwdaltconfsenha]").val()
                ) {
                  conf = confirm(
                    "Tem certeza que deseja alterar informações de sua conta?"
                  );
                } else {
                  alert("As senhas não coincidem.");
                }
              } else {
                alert("Preencha a confirmação de senha.");
                $("input[name=pwdaltconfsenha]").focus();
              }
            } else {
              alert("Preencha a senha nova.");
              $("input[name=pwdaltsenhanova]").focus();
            }
          } else {
            alert("Preencha a senha antiga.");
            $("input[name=pwdaltsenhaantiga]").focus();
          }
        } else {
          alert("Preencha o nome de usuário.");
          $("input[name=txtaltlogger]").focus();
        }
      } else {
        alert("Preencha a data de nascimento.");
        $("input[name=dtealtnascimento]").focus();
      }
    } else {
      alert("Preencha o e-mail.");
      $("input[name=txtaltemail]").focus();
    }
  } else {
    alert("Preencha o nome.");
    $("input[name=txtaltnome]").focus();
  }
  return conf;
}
