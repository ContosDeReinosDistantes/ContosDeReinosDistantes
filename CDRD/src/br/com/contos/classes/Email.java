package br.com.contos.classes;

/*==================Libs do java==================*/
import java.util.Properties;

/*==================Lib javax.mail==================*/
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Email {
	
	public boolean enviarEmail(String destinatario, String assunto, String corpo) {
		
		//Ctrl+c & Ctrl+v do exemplo do Marlow (^-^)
		
		Properties props = new Properties();
        /** Parâmetros de conexão com servidor Gmail */
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "587");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.starttls.enable", "true");
        
        Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
        	protected PasswordAuthentication getPasswordAuthentication() {
        		return new PasswordAuthentication("contosdereinosdistantes@gmail.com", "GLAM1337");
        	}
        });
        
        //ativação do debug da sessão
        session.setDebug(true);
        
        /*
         *	Bloco de código onde será enviado o email, utilizando os parâmetros recebidos,
         *	e retornando true se deu tudo certin ou false se deu merda em algum ponto
         */
        try {
        	Message message = new MimeMessage(session);
        	message.setFrom(new InternetAddress("contosdereinosdistantes@gmail.com")); //Remetente
        	Address[] toUser = InternetAddress //Destinatário(s)
        			.parse(destinatario);  
        	message.setRecipients(Message.RecipientType.TO, toUser);
        	message.setSubject(assunto);//Assunto
        	message.setText(corpo);
        	
        	//Método para enviar a mensagem criada
        	Transport.send(message);
        	System.out.println("Feito!!!");
        	
        } catch (MessagingException e) {
        	return false;
        }
        
        return true;
	}
}
