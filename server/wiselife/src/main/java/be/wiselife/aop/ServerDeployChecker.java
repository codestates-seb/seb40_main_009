package be.wiselife.aop;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;


@Configuration
public class ServerDeployChecker{

    @Value("${discord.depoly}")
    private String depolyUrl;

    @EventListener(ApplicationReadyEvent.class)
    public void initData() {

        DiscordWebhook webhook = new DiscordWebhook(depolyUrl);

        try {
            String ip = InetAddress.getLocalHost().getHostAddress();
            String hostName = InetAddress.getLocalHost().getHostName();

            webhook.setTts(true);
            webhook.setContent(hostName+" computer "+ ip + " 의 서버가 구동되었습니다.");
            webhook.execute();

        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
