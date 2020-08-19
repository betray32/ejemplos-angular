package com.nicolette.tortas.launcher;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Servicio TortasService
 * 
 * @author yharnam
 *
 */
@RestController
public class TortasService {

	@GetMapping("/ObtenerTortas")
	public List<TortaBean> obtenerTodas() {

		System.out.println("Solicitud ingresada!");

		List<TortaBean> lista = new ArrayList<>();

		TortaBean dummy = new TortaBean();
		dummy.setId(11);
		dummy.setDescripcion("Torta Tres Leches");
		dummy.setNombre("Tres Delicias");

		TortaBean dummy1 = new TortaBean();
		dummy1.setId(12);
		dummy1.setDescripcion("Mil Horas de Amor");
		dummy1.setNombre("Mil Hojas Veg");

		lista.add(dummy1);
		lista.add(dummy);

		return lista;

	}

}
