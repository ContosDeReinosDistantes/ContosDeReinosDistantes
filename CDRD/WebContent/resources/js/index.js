/*
 * Autor: Equipe CDRD
 * Descrição: Arquivo js relacionado à index.html (raiz do projeto). Contem funções de carregamento
 * 			  das janelas e validação dos forms da página
 */
$(document).ready(function(){

    //carregamento das janelas modais
    $("#containerModaisIndex").hide();
    
    var ua = detect.parse(navigator.userAgent);

    if(ua.browser.family == "Chrome"){
        $("html").css("image-rendering","pixelated");
    }else if(ua.browser.family == "Firefox"){
        $("html").css("image-rendering","-moz-crisp-edges");
    }else{
        alert("Infelizmente o navegador " + ua.browser.family + " não é suportado por nossa aplicação. Lamentamos o inconveninete ( ; _ ; ). Atualmente, somente o Chrome e Firefox são suportados.");
    }
    
    carregaModais()
});

/**
 * função que provê um display às janelas modais, abrindo-o ou 
 * fechando-o conforme interação do usuário com a página
 */
function abrirModal(){
    $("#containerModaisIndex").show();
    carregaModais();
    $("#intPerso").show();
    $("#guard_1").show();  
}

/**
 * Funcção que realiza o controle das janelas, ordenando a sequência 
 * de abertura e fechamento
 */
function carregaModais(){
    
    /* Sair */
    $(".sairBtn").click(function(){
        $("#intPerso").hide();
        $("#guard_1").hide();
        $("#login").hide();
        $("#registrar").hide();
        $("#login_redes").hide();
        $("#esqueci_senha").hide();
        $("#containerModaisIndex").hide();
    });

    /* Login */
    $("#login").hide();
    $(".loginBtn").click(function(){
        $("#guard_1").hide();
        $("#login_redes").hide();
        $("#registrar").hide();
        $("#esqueci_senha").hide();
        $("#login").show();
    });

    /*Redes Sociais*/
    $("#login_redes").hide();
    $(".redesBtn").click(function(){
        $("#guard_1").hide();
        $("#login").hide();
        $("#login_redes").show();
    });

    /* Registrar */
    $("#registrar").hide();
    $(".registrarBtn").click(function(){
        $("#guard_1").hide();
        $("#login").hide();
        $("#registrar").show();
    })

    /* Esqueci Senha */
    $("#esqueci_senha").hide();
    $(".esqueciBtn").click(function(){
        $("#login").hide();
        $("#esqueci_senha").show();
    });
}

/*=======================================Validação de formulários=======================================*/ 
function validaLogin(){
    
    if($("input[name=txtlogin]").val()!=""){
      if($("input[name=pwdsenhalogger]").val()!=""){
        
        login();
      
    }else{
        alert('Preencha o campo Senha');
        $("input[name=pwdsenhalogger]").focus();
      }
    }else{
      alert('Preencha o campo "Usuário"');
      $("input[name=txtlogin]").focus();
    }
}

function validaCadastro(){
    
    if($("input[name=txtnome]").val()!=""){
      if($("input[name=txtemail]").val()!=""){
        if($("input[name=dtenascimento]").val()!=""){
          if($("input[name=txtapelido]").val()!=""){
            if($("input[name=pwdsenha]").val()!=""){
              if($("input[name=pwdconfsenha]").val()!=""){
                if($("input[name=pwdsenha]").val()==$("input[name=pwdconfsenha]").val()){
                    cadastrar();
                }else{
                  alert('O campo "Confirmar Senha" deve ser igual ao campo "Senha"');
                  $("input[name=pwdconfsenha]").focus();
                }
              }else{
                alert('Preencha o campo "Confirmar Senha"');
                $("input[name=pwdconfsenha]").focus();
              }
            }else{
              alert('Preencha o campo "Senha"');
              $("input[name=pwdsenha]").focus();
            }
          }else{
            alert('Preencha o campo "Usuário"');
            $("input[name=txtname]").focus();
          }
        }else{
          alert('Preencha o campo "Data de Nascimento"');
          $("input[name=dtenascimento]").focus();
        }
      }else{
        alert('Preencha o campo "E-mail"');
        $("input[name=txtemail]").focus();
      }
    }else{
      alert('Preencha o campo "Nome');
      $("input[name=txtnome]").focus();
    }
}

function validaEsqueciSenha(){

    if($("input[name=txtmail]").val()!=""){
        //chamada da função ajax da recuperação de senha do feladapota
    }else{
        alert('Preencha o campo "Endereço de E-mail"');
        $("input[name=txtmail]").focus();
    }
    return confirm;
}

/*

Rever necessidade desse trecho do código, visto que o esquema de recuperação de senha mudou um pouco
(com um pouco quero dizer que mudou para um caralho)

function validaRecuperarSenha(){
var confirm = false;
if($("input[name=pwdnova]").val()!=""){
    if($("input[name=pwdnova]").val()==$("input[name=pwdnovaconf]").val()){
    confirm = true;
    }else{
    alert("As senhas não coincidem");
    $("input[name=pwdnovaconf]").focus();
    }
}else{
    alert("Preencha o campo com a nova senha");
    $("input[name=pwdnova]").focus();
} 

return confirm;
}

*/  