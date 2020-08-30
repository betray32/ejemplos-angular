package com.nicolette.tortas.launcher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan( "com.nicolette.tortas.launcher" )
public class TortasLauncher {

	public static void main(String[] args) {
		SpringApplication.run(TortasLauncher.class, args);
	}

	
}
