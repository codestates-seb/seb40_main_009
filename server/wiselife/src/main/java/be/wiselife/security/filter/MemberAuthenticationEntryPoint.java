package be.wiselife.security.filter;


import be.wiselife.aop.DiscordWebhook;
import be.wiselife.dto.ErrorResponse;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");
        errorSender(response, HttpStatus.UNAUTHORIZED);
        sendErrorToDiscord(authException, exception);
    }

    private static void sendErrorToDiscord(AuthenticationException authException, Exception exception) throws IOException {
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        DiscordWebhook webhook = new DiscordWebhook();
        webhook.setContent(message);
        webhook.execute();
    }

    private void errorSender(HttpServletResponse response, HttpStatus unauthorized) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(unauthorized);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(unauthorized.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
