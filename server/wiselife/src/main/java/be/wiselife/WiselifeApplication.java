package be.wiselife;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
@EnableJpaAuditing
public class WiselifeApplication {

	public static void main(String[] args) {
		System.setProperty("aws.accessKeyId", "{AWS_ACCESS_KEY_ID}");
		System.setProperty("aws.secretKey", "{AWS_SECRET_ACCESS_KEY}");
		System.setProperty("aws.region", "ap-northeast-2");
		SpringApplication.run(WiselifeApplication.class, args);
	}

}
