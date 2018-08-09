package br.com.contos.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.Connection;
import java.util.Map;
import java.util.HashMap;
import com.google.gson.Gson;

import br.com.contos.classes.Notificacao;
import br.com.contos.jdbc.JDBCNotificacaoDAO;
import br.com.contos.conexao.Conexao;

/**
 * Servlet implementation class InsereNotificacao
 */
@WebServlet("/InsereNotificacao")
public class InsereNotificacao extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public InsereNotificacao() {
        // TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    	
    	Notificacao notificacao = new Notificacao();
    	
    	try	{
    		notificacao.setNotificacao(request.getParameter("txacompnotificacao"));
    		notificacao.setDataCriacao(request.getParameter("data"));//ISSO PRECISA PEGAR A DATA ENVIADA DO JS;
    		notificacao.setUsuarioId(request.getParameter(""));//Pegar usuario_id?
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCNotificacaoDAO jdbcNotificacao = new JDBCNotificacaoDAO(conexao);
    		Map<String, String> msg = new HashMap<String, String>();
    		boolean retorno = jdbcNotificacao.inserir(notificacao);
    		if(retorno){
    			msg.put("msg", "Notifica��o enviada com sucesso.");
    		}else{
    			msg.put("msg", "N�o foi poss�vel enviar a notifica��o.");
    		}
    		conec.fecharConexao();
	    	System.out.println(msg);
    		String json = new Gson().toJson(msg);
    		
    		response.setContentType("application/json");
    		response.setCharacterEncoding("UTF-8");
    		response.getWriter().write(json);
    	}catch (IOException e) {
    		e.printStackTrace();
    	}  		
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
