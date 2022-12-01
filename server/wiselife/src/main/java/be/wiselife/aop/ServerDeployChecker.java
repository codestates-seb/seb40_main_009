package be.wiselife.aop;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Configuration
public class ServerDeployChecker{


    @EventListener(ApplicationReadyEvent.class)
    public void initData() {
        DiscordWebhook webhook = new DiscordWebhook
                ("https://discord.com/api/webhooks/1045570083558273044/AErMVlgJw6eAMfjz3Q1sgiRNtp35WGtjpLKOWkQN7fZkesUxGAyPnVWB-zxMkoeYyKv1");

        try {
            String ip = InetAddress.getLocalHost().getHostAddress();

            LocalDate now = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH시mm분ss초");

            String formatedNow = now.format(formatter);
            webhook.setTts(true);
            webhook.setContent(formatedNow +"에 computer "+ ip + " 의 서버가 구동되었습니다.");
            webhook.execute();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
