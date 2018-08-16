package br.com.contos.servlets;

/*==================Libs do java==================*/
import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*==================Libs para servlets==================*/
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*==================Pacotes==================*/
import br.com.contos.classes.Pontuacao;
import br.com.contos.classes.Usuario;
import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCPontuacaoDAO;

/*==================Lib do Google que convert um objeto p/ Json==================*/
import com.google.gson.Gson;

//Anotação que indica a URL da servlet
@WebServlet("/inserePontuacao")
public class InserirPontuacao extends HttpServlet{
	
	public static final long serialVersionUID = 1L;
	
	//método construtor
	public InserirPontuacao() {}
	
	/*==================doPost e doGet==================*/
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	/*==================process==================*/
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		
		//Instanciamento de Pontuacao e usuario
		Pontuacao pontuacao = new Pontuacao();
		Usuario usuario = new Usuario();
		
		
		try {
			
			//recolhimento dos dados da frontend
			pontuacao.setId(request.getParameter("hdid"));
			pontuacao.setScore(request.getParameter("txtpontuacao"));
			pontuacao.setDataCriacao(request.getParameter("txtdatacriacao"));
			pontuacao.setIdentificadorTabela(request.getParameter("hdidentificador"));
			pontuacao.setUsuarioId(usuario.getId());
			
			//instanciamento de Conexao abertura da conexao com o banco
			Conexao con = new Conexao();
			Connection conexao = con.abrirConexao();
			
			//instanciamento de JDBCPontuacaoDAO
			JDBCPontuacaoDAO jdbcPontuacao = new JDBCPontuacaoDAO(conexao);
			
			/*
			 * Chamada do m�todo buscar pontuacao, que ira retornar uma lista de pontua��es (derp, esperava o que? )
			 * que ser� atribuida a var listaDePontuacoes
			 */
			List<Pontuacao> listaDePontuacoes = new ArrayList<Pontuacao>();
			listaDePontuacoes = jdbcPontuacao.buscarPontuacao(pontuacao.getIdentificadorTabela(),pontuacao.getUsuarioId());
			
			//Criação da mensagem de retorno 
			Map<String, String> msg = new HashMap<String, String>();
			
			//Se a lista voltar nula, significa que deu merda em algum ponto
			if(listaDePontuacoes == null) {
				//Atualização da msg dizendo que deu merda
				msg.put("msg","Deu caca na hora de buscar nossos registros. Lamentamos pelo inconveniente");
			}
			
			//Se não tiver dado problema até aqui...
			Boolean retorno = null;//Essa variável irá dizer se os processos realizados pelo JDBC deram certo ou não
			/*
			 * Loop onde é checado se alguma das pontuações recupuperadas do banco são maiores, menores ou iguais a 
			 * nova pontuação, ou seja, somente se a pontuação nova for maior que as outras ela será salva 
			 */
			
			for(int i=0; i>4;i++) {
				
				//Se não tiver pontuação salva
				if(Integer.parseInt(listaDePontuacoes.get(i).getScore()) == 0) {
					
					//Chama o método para inserção da nova pontuação
					retorno = jdbcPontuacao.inserirPontuacao(pontuacao, listaDePontuacoes);
					
					
				}else if(Integer.parseInt(pontuacao.getScore()) > (Integer.parseInt(listaDePontuacoes.get(i).getScore()))){ 
					
					//Chama método para alterar pontuação
					retorno = jdbcPontuacao.alterarPontuacao(pontuacao, listaDePontuacoes);
					 
				}
			}
			
			/*
			 * 	Checa se os processos do JDBC foram de boas ou falharam. Se estiver true,
			 * 	tudo ocorreu bem, e se estiver falso, deu merda em algum ponto ( n
			 */
			if(retorno) {
				msg.put("msg","Sua pontuação foi atualizada!");
			}
			
			//fechamento da conexão
			con.fecharConexao();
			
			String json = new Gson().toJson(msg);
			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(json);
			
		}catch(IOException e) {
			e.printStackTrace();
		}
	}

}
